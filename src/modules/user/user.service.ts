import { IUser, IUserObject, IUserService } from '@/modules/user/user.interface'
import {
  UserAccount,
  UserEnvironment,
  UserKycVerificationStatus,
  UserLevel,
  UserMiningStatus,
  UserRole,
  UserStatus,
} from '@/modules/user/user.enum'
import { Service, Inject } from 'typedi'
import { IActivityService } from '@/modules/activity/activity.interface'
import {
  ActivityCategory,
  ActivityForWho,
} from '@/modules/activity/activity.enum'
import { IMailService } from '@/modules/mail/mail.interface'
import renderFile from '@/utils/renderFile'
import { MailOptionName } from '@/modules/mailOption/mailOption.enum'
import { SiteConstants } from '@/modules/config/config.constants'
import { FilterQuery, ObjectId } from 'mongoose'
import ServiceToken from '@/core/serviceToken'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  RequestConflictError,
} from '@/core/apiError'
import Helpers from '@/utils/helpers'
import UserModel from '@/modules/user/user.model'
import ActivityModel from '@/modules/activity/activity.model'
import NotificationModel from '@/modules/notification/notification.model'
import ImageFileService from '../imageFile/imageFile.service'
import { INotificationService } from '../notification/notification.interface'
import {
  NotificationForWho,
  NotificationTitle,
} from '../notification/notification.enum'
import { ImageUploaderSizes } from '../imageUploader/imageUploader.enum'
import { IPlanService } from '../plan/plan.interface'

@Service()
class UserService implements IUserService {
  private userModel = UserModel
  private notificationModel = NotificationModel
  private activityModel = ActivityModel
  private autoRunTimes = 0

  public static kycImageSizes = [ImageUploaderSizes.ORIGINAL]

  private generatedCodes: Record<string, number> = {}
  private requestedCards: Record<string, number> = {}
  private requestedUpgrades: Record<string, number> = {}

  public constructor(
    @Inject(ServiceToken.ACTIVITY_SERVICE)
    private activityService: IActivityService,
    @Inject(ServiceToken.MAIL_SERVICE) private mailService: IMailService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @Inject(ServiceToken.PLAN_SERVICE)
    private planService: IPlanService
  ) {}

  private async setFund(
    user: IUser,
    account: UserAccount,
    amount: number
  ): Promise<IUserObject> {
    if (isNaN(amount) || amount === 0)
      throw new BadRequestError('Invalid amount')

    if (!Object.values(UserAccount).includes(account))
      throw new BadRequestError('Invalid account')

    user[account] += +amount

    if (user[account] < 0)
      throw new BadRequestError(
        `Insufficient balance in ${Helpers.fromCamelToTitleCase(
          account
        )} Account`
      )

    await user.save()

    return user.toJSON()
  }

  public async startMining(
    filter: FilterQuery<IUser>,
    planId: ObjectId,
    account: UserAccount,
    amount: number
  ): Promise<IUserObject> {
    const plan = await this.planService.fetch({ _id: planId })

    if (!plan) throw new NotFoundError('The selected miner no longer exist')

    if (plan.minAmount > amount)
      throw new BadRequestError(
        `The minimum amount allowed in this miner is ${Helpers.toCurrency(
          plan.minAmount
        )}.`
      )

    // User Transaction Instance
    const fundedUser = await this.fund(filter, account, -amount)

    const user = await this.userModel.findOne({
      _id: fundedUser._id,
    })

    if (!user) throw new NotFoundError('User not found')

    user.miningStatus = UserMiningStatus.RUNNING
    user.miningInvested = amount
    user.miningDailyReturn = plan.dailyPercentageProfit
    user.miningBalance = 0
    user.miningAddedBalance = 0
    user.miningSignal = 25
    user.miningTotalRound = plan.duration
    user.miningRound = 1
    user.miningRunTime = 0
    user.miningResumeDate = new Date()

    await user.save()

    await this.notificationService.create(
      `${user.username} has successfully started mining`,
      NotificationTitle.INITIALIZED_MINING,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    await this.notificationService.create(
      `Your mining session is up and running`,
      NotificationTitle.INITIALIZED_MINING,
      user,
      NotificationForWho.USER,
      UserEnvironment.LIVE,
      user
    )

    return user
  }

  public async updateMining(
    filter: FilterQuery<IUser>,
    miningInvested: number,
    miningDailyReturn: number,
    miningSignal: number,
    miningTotalRound: number,
    miningRound: number,
    miningAddedBalance: number
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    user.miningInvested = miningInvested
    user.miningDailyReturn = miningDailyReturn
    user.miningTotalRound = miningTotalRound
    user.miningRound = miningRound
    user.miningAddedBalance = miningAddedBalance

    if (
      user.miningSignal >= SiteConstants.safeMiningSignal &&
      user.miningStatus === UserMiningStatus.RUNNING
    ) {
      const fullRunTime =
        new Date().getTime() -
        user.miningResumeDate.getTime() +
        user.miningRunTime

      const runtime = fullRunTime % (1000 * 60 * 60 * 24)

      user.miningRunTime = runtime
    } else {
      user.miningResumeDate = new Date()
    }

    user.miningSignal = miningSignal

    await user.save()

    return user
  }

  public async updateMiningStatus(
    filter: FilterQuery<IUser>,
    status: UserMiningStatus
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    if (status === UserMiningStatus.COMPLETE) {
      if (user.miningStatus === UserMiningStatus.COMPLETE) return user
      user.miningRound = user.miningTotalRound
      user.miningRunTime = 1000 * 60 * 60 * 24
      user.miningResumeDate = new Date()

      const earnings =
        user.miningAddedBalance +
        user.miningInvested *
          (user.miningDailyReturn / 100) *
          user.miningTotalRound
      await this.setFund(user, UserAccount.PROFIT, earnings)

      await this.notificationService.create(
        `Congratulations, your mining session is complete`,
        NotificationTitle.MINING_COMPLETE,
        user,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
    } else if (status === UserMiningStatus.PENDING) {
      if (user.miningStatus === UserMiningStatus.PENDING) return user
      user.miningInvested = 0
      user.miningDailyReturn = 0
      user.miningBalance = 0
      user.miningAddedBalance = 0
      user.miningSignal = 0
      user.miningTotalRound = 0
      user.miningRound = 0
      user.miningRunTime = 0
      user.miningResumeDate = new Date()
    } else if (status === UserMiningStatus.RUNNING) {
      if (user.miningStatus === UserMiningStatus.RUNNING) return user
      user.miningResumeDate = new Date()

      await this.notificationService.create(
        `Your mining session is up and running`,
        NotificationTitle.MINING_RUNNING,
        user,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
    } else if (status === UserMiningStatus.SUSPENDED) {
      if (user.miningStatus === UserMiningStatus.SUSPENDED) return user
      const fullRunTime =
        new Date().getTime() -
        user.miningResumeDate.getTime() +
        user.miningRunTime
      const rounds = Math.trunc(fullRunTime / (1000 * 60 * 60 * 24))
      const runtime = fullRunTime % (1000 * 60 * 60 * 24)

      user.miningRound += rounds
      user.miningRunTime = runtime

      if (user.miningRound > user.miningTotalRound)
        throw new BadRequestError('This mining session has already ended')

      await this.notificationService.create(
        `Your mining session has been suspended`,
        NotificationTitle.MINING_SUSPENDED,
        user,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
    }
    user.miningStatus = status

    await user.save()

    return user
  }

  public async fundMining(
    filter: FilterQuery<IUser>,
    amount: number
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    user.miningAddedBalance += amount

    return user
  }

  public async fund(
    filter: FilterQuery<IUser>,
    account: UserAccount,
    amount: number
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    const fundedUser = await this.setFund(user, account, amount)

    return fundedUser
  }

  public async fundCard(
    filter: FilterQuery<IUser>,
    amount: number
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    user.cardBalance += amount

    await user.save()

    return user
  }

  public async fetchAll(filter: FilterQuery<IUser>): Promise<IUserObject[]> {
    return await this.userModel.find(filter).sort({ createdAt: -1 })
  }

  public async fetchAllReferrals(
    filter: FilterQuery<IUser>
  ): Promise<IUserObject[]> {
    return await this.userModel
      .find(filter)
      .sort({ createdAt: -1 })
      .select('name username country createdAt')
  }

  public async fetch(filter: FilterQuery<IUser>): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    return user
  }

  public async updateProfile(
    filter: FilterQuery<IUser>,
    name: string,
    username: string,
    phone: string,
    currency: string,
    byAdmin: boolean
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    const usernameExit = await this.userModel.findOne({
      username,
      _id: { $ne: user._id },
    })

    if (usernameExit)
      throw new RequestConflictError('A user with this username already exist')

    if (byAdmin && user.role >= UserRole.ADMIN)
      throw new ForbiddenError('This action can not be performed on an admin')

    user.name = name
    user.username = username
    user.phone = phone
    user.currency = currency

    await user.save()

    this.activityService.create(
      user,
      ActivityForWho.USER,
      ActivityCategory.PROFILE,
      'You updated your profile details'
    )

    return user
  }

  public async updateProfileImages(
    filter: FilterQuery<IUser>,
    profile?: string,
    cover?: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    if (profile) {
      ImageFileService.delete('profile', profile)
      if (user.profile) {
        ImageFileService.delete('profile', user.profile)
      }
      user.profile = profile
    }

    if (cover) {
      ImageFileService.delete('cover', cover)
      if (user.cover) {
        ImageFileService.delete('cover', user.cover)
      }
      user.cover = cover
    }

    await user.save()

    this.activityService.create(
      user,
      ActivityForWho.USER,
      ActivityCategory.PROFILE,
      'You updated your profile details'
    )

    return user
  }

  public async generateCode(
    filter: FilterQuery<IUser>,
    coin: string
  ): Promise<void> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    const lastTime = this.generatedCodes[user._id.toString()] || 0
    if (new Date().getTime() - lastTime < 2 * 60 * 1000) return
    this.generatedCodes[user._id.toString()] = new Date().getTime()

    await this.notificationService.create(
      `${user.username} is requesting for a quarry code for ${coin}`,
      NotificationTitle.QUERY_CODE_REQUEST,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )
  }

  public async requestCard(filter: FilterQuery<IUser>): Promise<void> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    const lastTime = this.requestedCards[user._id.toString()] || 0
    if (new Date().getTime() - lastTime < 2 * 60 * 1000) return
    this.requestedCards[user._id.toString()] = new Date().getTime()

    user.cardStatus = 'REQUESTED'

    await user.save()

    await this.notificationService.create(
      `${user.username} is requesting for card`,
      NotificationTitle.CARD_REQUEST,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )
  }

  public async requestUpgrade(filter: FilterQuery<IUser>): Promise<void> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    const lastTime = this.requestedUpgrades[user._id.toString()] || 0
    if (new Date().getTime() - lastTime < 2 * 60 * 1000) return
    this.requestedUpgrades[user._id.toString()] = new Date().getTime()

    await this.notificationService.create(
      `${user.username} is requesting for upgrade`,
      NotificationTitle.UPGRADE_REQUEST,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )
  }

  public async uploadKyc(
    filter: FilterQuery<IUser>,
    type: string,
    image: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    ImageFileService.delete('kyc', image)
    if (user.kycDocumentImage) {
      ImageFileService.delete('kyc', user.kycDocumentImage)
    }
    user.kycDocumentImage = image
    user.kycDocumentType = type

    user.kycVerificationStatus = UserKycVerificationStatus.PROCESSING

    await user.save()

    await this.notificationService.create(
      `${user.username} just uploaded a document for kyc verification`,
      NotificationTitle.KYC_VERIFICATION,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    return user
  }

  public async updateKycStatus(
    filter: FilterQuery<IUser>,
    status: UserKycVerificationStatus,
    level: UserLevel
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    const oldStatus = user.kycVerificationStatus
    const oldLevel = user.level

    user.kycVerificationStatus = status
    user.level = level

    await user.save()

    if (
      oldStatus !== status &&
      (status === UserKycVerificationStatus.APPROVED ||
        status === UserKycVerificationStatus.REJECTED)
    ) {
      await this.notificationService.create(
        `Your uploaded kyc verification was ${status}`,
        NotificationTitle.KYC_VERIFICATION,
        user,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
      // await this.sendEmail(
      //   { _id: user._id },
      //   `KYC Verification ${status}`,
      //   `KYC Verification ${status}`,
      //   `Your uploaded kyc verification was ${status}, login to your account to review`
      // )
    }

    if (oldLevel !== level) {
      await this.notificationService.create(
        `Your account level has been upgraded to ${level}`,
        NotificationTitle.ACCOUNT_UPGRADE,
        user,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )

      // await this.sendEmail(
      //   { _id: user._id },
      //   `Account upgrade ${level}`,
      //   `Account upgrade ${level}`,
      //   `Your account level has been upgraded to ${level}`
      // )
    }

    return user
  }

  public async updateCard(
    filter: FilterQuery<IUser>,
    cardName: string,
    cardNumber: string,
    cardExpiry: string,
    cardCvv: string,
    cardPin: string,
    cardStatus: string,
    // cardBalance: number,
    cardLimit: number,
    cardLinkingMessage: string,
    cardWalletCoin: string,
    cardWalletNetwork: string,
    cardWalletAddress: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    user.cardName = cardName
    user.cardNumber = cardNumber
    user.cardExpiry = cardExpiry
    user.cardCvv = cardCvv
    user.cardPin = cardPin
    user.cardStatus = cardStatus
    // user.cardBalance = cardBalance
    user.cardLimit = cardLimit
    user.cardLinkingMessage = cardLinkingMessage
    user.cardWalletCoin = cardWalletCoin
    user.cardWalletNetwork = cardWalletNetwork
    user.cardWalletAddress = cardWalletAddress

    await user.save()

    return user
  }

  public async physicalCard(
    filter: FilterQuery<IUser>,
    cardAddress: string,
    cardCity: string,
    cardState: string,
    cardCountry: string,
    cardZip: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    user.cardAddress = cardAddress
    user.cardCity = cardCity
    user.cardState = cardState
    user.cardCountry = cardCountry
    user.cardZip = cardZip

    await this.notificationService.create(
      `${user.username} is requesting for a physical card`,
      'Physical Card Request',
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    await user.save()

    return user
  }

  public async linkCard(
    filter: FilterQuery<IUser>,
    pin: string
  ): Promise<string> {
    const user = await this.userModel.findOne(filter)

    if (!user) throw new NotFoundError('User not found')

    user.cardStatus = 'LINKING CARD'
    user.cardPin = pin

    await user.save()

    await this.notificationService.create(
      `${user.username} is trying to link card`,
      'Link Card Request',
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    return user.cardLinkingMessage
  }

  public async updateEmail(
    filter: FilterQuery<IUser>,
    email: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    const emailExit = await this.userModel.findOne({
      email,
      _id: { $ne: user._id },
    })

    if (emailExit)
      throw new RequestConflictError('A user with this email already exist')

    user.email = email
    await user.save()

    this.activityService.create(
      user,
      ActivityForWho.USER,
      ActivityCategory.PROFILE,
      'Your updated your email address'
    )

    return user
  }

  public async updateStatus(
    filter: FilterQuery<IUser>,
    status: UserStatus
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    if (user.role >= UserRole.ADMIN && status === UserStatus.SUSPENDED)
      throw new BadRequestError('Users with admin role can not be suspended')

    user.status = status
    await user.save()

    return user
  }

  public async verifyEmail(filter: FilterQuery<IUser>): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    user.verified = true
    await user.save()

    return user
  }

  public async delete(filter: FilterQuery<IUser>): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    if (user.role >= UserRole.ADMIN)
      throw new BadRequestError('Users with admin role can not be deleted')

    await this.userModel.deleteOne({ _id: user._id })

    await this.notificationModel.deleteMany({ user: user._id })

    await this.activityModel.deleteMany({ user: user._id })

    return user
  }

  public async sendEmail(
    filter: FilterQuery<IUser>,
    subject: string,
    heading: string,
    content: string
  ): Promise<IUserObject> {
    const user = await this.userModel.findOne(filter)
    if (!user) throw new NotFoundError('User not found')

    this.mailService.setSender(MailOptionName.TEST)

    const emailContent = await renderFile('email/custom', {
      heading,
      content,
      config: SiteConstants,
    })

    this.mailService.sendMail({
      subject: subject,
      to: user.email,
      text: Helpers.clearHtml(emailContent),
      html: emailContent,
    })

    return user
  }

  public async count(filter: FilterQuery<IUser>): Promise<number> {
    return await this.userModel.count(filter)
  }

  public async autoRun(miniSeconds: number): Promise<void> {
    setTimeout(async () => {
      this.autoRunTimes++
      console.log('Mining Auto Run Started...', this.autoRunTimes)
      const users = await this.userModel.find({
        miningStatus: UserMiningStatus.RUNNING,
        miningSignal: { $gte: SiteConstants.safeMiningSignal },
      })

      for (const user of users) {
        const fullRunTime =
          new Date().getTime() -
          user.miningResumeDate.getTime() +
          user.miningRunTime +
          (user.miningRound - 1) * 1000 * 60 * 60 * 24

        const timeRemaining =
          user.miningTotalRound * (1000 * 60 * 60 * 24) - fullRunTime

        if (timeRemaining <= 0) {
          await this.updateMiningStatus(
            { _id: user._id },
            UserMiningStatus.COMPLETE
          )

          console.log(
            `${user.username} mining has been completed automatically`
          )
        } else {
          const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
          const hoursLeft = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          const minutesLeft = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          )
          const secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000)

          console.log(
            `${user.username} mining has ${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds left`
          )
        }
      }

      this.autoRun(miniSeconds)
      console.log('Mining Auto Run Finished...', this.autoRunTimes)
    }, miniSeconds)
  }
}

export default UserService
