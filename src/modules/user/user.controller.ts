import { Response } from 'express'
import { Service, Inject } from 'typedi'
import { IUserService } from '@/modules/user/user.interface'
import { UserEnvironment, UserRole } from '@/modules/user/user.enum'
import userValidation from '@/modules/user/user.validation'
import { ObjectId } from 'mongoose'
import asyncHandler from '@/helpers/asyncHandler'
import { InfoResponse, SuccessResponse } from '@/core/apiResponse'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'
import ImageFileService from '../imageFile/imageFile.service'
import { BadRequestError, InternalError, NotFoundError } from '@/core/apiError'
import UserService from './user.service'
import ImageUploader from '../imageUploader/imageUploader'
import { INotificationService } from '../notification/notification.interface'
import { NotificationForWho } from '../notification/notification.enum'

@Service()
class UserController extends BaseController implements IController {
  public path = '/users'
  private imageUploader = new ImageUploader()
  public routes: IControllerRoute[] = [
    [
      'put',
      `${this.path}/update-profile`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.updateProfile),
      (...params) => this.updateProfile(false)(...params),
    ],
    [
      'post',
      `${this.path}/generate-code`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.generateCode),
      (...params) => this.generateCode(...params),
    ],
    [
      'post',
      `${this.path}/request-card`,
      routePermission(UserRole.USER),
      (...params) => this.requestCard(...params),
    ],
    [
      'post',
      `${this.path}/link-card`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.linkCard),
      (...params) => this.linkCard(...params),
    ],
    [
      'post',
      `${this.path}/request-upgrade`,
      routePermission(UserRole.USER),
      (...params) => this.requestUpgrade(...params),
    ],
    [
      'post',
      `${this.path}/update-card-limit/:userId`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.updateCard),
      (...params) => this.updateCardLimit(...params),
    ],
    [
      'post',
      `${this.path}/update-card-pin/:userId`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.updateCard),
      (...params) => this.updateCardPin(...params),
    ],
    [
      'post',
      `${this.path}/update-card-status/:userId`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.updateCard),
      (...params) => this.updateCardStatus(...params),
    ],
    [
      'post',
      `${this.path}/physical-card/:userId`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.physicalCard),
      (...params) => this.physicalCard(...params),
    ],
    [
      'patch',
      `${this.path}/boost-signal`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.boostSignal),
      (...params) => this.boostSignal(UserEnvironment.LIVE)(...params),
    ],
    [
      'put',
      `${this.path}/start-mining`,
      routePermission(UserRole.USER),
      schemaValidator(userValidation.startMining),
      (...params) => this.startMining(...params),
    ],
    [
      'put',
      `${this.path}/upload-kyc`,
      routePermission(UserRole.USER),
      this.imageUploader.setNames([{ name: 'kyc', maxCount: 1 }]),
      schemaValidator(userValidation.uploadKyc),
      this.imageUploader.resize(['kyc'], UserService.kycImageSizes),
      (...params) => this.uploadKyc(...params),
    ],
    // [
    //   'put',
    //   `${this.path}/update-profile-images`,
    //   routePermission(UserRole.USER),
    //   ImageFileService.validate([{ name: 'profile' }, { name: 'cover' }]),
    //   ImageFileService.upload([
    //     {
    //       name: 'profile',
    //       resize: UserService.profileImageSizes,
    //     },
    //     { name: 'cover', resize: UserService.coverImageSizes },
    //   ]),
    //   (req, res, next) => {
    //     res.send({})
    //   },
    //   // (...params) => this.updateProfileImages(false)(...params),
    // ],
    [
      'get',
      `${this.path}/referred-users`,
      routePermission(UserRole.USER),
      (...params) => this.getReferredUsers(false)(...params),
    ],
    [
      'get',
      `/master${this.path}`,
      routePermission(UserRole.ADMIN),
      (...params) => this.fetchAll(...params),
    ],
    [
      'put',
      `/master${this.path}/update-mining/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateMining),
      (...params) => this.updateMining(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-mining-status/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateMiningStatus),
      (...params) => this.updateMiningStatus(...params),
    ],
    [
      'patch',
      `/master${this.path}/fund-mining/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.fundMining),
      (...params) => this.fundMining(...params),
    ],
    [
      'put',
      `/master${this.path}/withdrawal/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.withdrawal),
      (...params) => this.withdrawal(...params),
    ],
    [
      'put',
      `/master${this.path}/alert/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.alert),
      (...params) => this.alert(...params),
    ],
    [
      'patch',
      `/master${this.path}/fund/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.fundUser),
      (...params) => this.fundUser(...params),
    ],
    [
      'put',
      `/master${this.path}/update-profile/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateProfile),
      (...params) => this.updateProfile(true)(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-email/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateEmail),
      (...params) => this.updateEmail(true)(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-kyc-status/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateKycStatus),
      (...params) => this.updateKycStatus(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-card/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.updateCard),
      (...params) => this.updateCard(...params),
    ],
    [
      'patch',
      `/master${this.path}/verify-email/:userId`,
      routePermission(UserRole.ADMIN),
      (...params) => this.verifyEmail(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:userId`,
      routePermission(UserRole.ADMIN),
      (...params) => this.deleteUser(...params),
    ],
    [
      'get',
      `/master${this.path}/referred-users`,
      routePermission(UserRole.ADMIN),
      (...params) => this.getReferredUsers(true)(...params),
    ],
    [
      'post',
      `/master${this.path}/send-email/:userId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(userValidation.sendEmail),
      (...params) => this.sendEmail(...params),
    ],
  ]

  constructor(
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService
  ) {
    super()
    this.initializeRoutes()

    this.userService.autoRun(1000 * 60 * 10)
  }

  private fetchAll = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const users = await this.userService.fetchAll({})
      return new SuccessResponse('Users fetched successfully', { users }).send(
        res
      )
    }
  )

  private updateProfile = (byAdmin: boolean = false) =>
    asyncHandler(async (req, res): Promise<void | Response> => {
      const userId = byAdmin ? req.params.userId : req.user._id
      const { name, username, phone, currency } = req.body

      const user = await this.userService.updateProfile(
        { _id: userId },
        name,
        username,
        phone,
        currency,
        byAdmin
      )
      return new SuccessResponse('Profile updated successfully', { user }).send(
        res
      )
    })

  private updateProfileImages = (isAdmin: boolean = false) =>
    asyncHandler(async (req, res, next) => {
      let profileImage, coverImage
      try {
        let userId
        const { profile, cover } = req.body

        profileImage = profile && profile[0].name
        coverImage = cover && cover[0].name

        if (isAdmin) {
          userId = req.params.userId
          if (!userId) throw new NotFoundError('User not found')
        } else {
          if (!req.user) throw new NotFoundError('User not found')
          userId = req.user._id
        }
        const responce = await this.userService.updateProfileImages(
          userId,
          profileImage,
          coverImage
        )
        res.status(200).json(responce)
      } catch (err: any) {
        if (profileImage) ImageFileService.delete('profile', profileImage)
        if (coverImage) ImageFileService.delete('cover', coverImage)
        next(new InternalError(err.message, undefined, err.status))
      }
    })

  private uploadKyc = asyncHandler(async (req, res, next) => {
    let kycImage
    try {
      const { type, kyc } = req.body

      if (!kyc) throw new BadRequestError('Image document is required')

      kycImage = kyc && kyc[0].name

      if (!req.user) throw new NotFoundError('User not found')
      const userId = req.user._id
      const user = await this.userService.uploadKyc(
        { _id: userId },
        type,
        kycImage
      )

      return new SuccessResponse('Kyc uploaded successfully', { user }).send(
        res
      )
    } catch (err: any) {
      if (kycImage)
        this.imageUploader.delete('kyc', kycImage, UserService.kycImageSizes)
      next(new InternalError(err.message, undefined, err.status))
    }
  })

  private updateKycStatus = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const { status, level } = req.body
      const userId = req.params.userId as unknown as ObjectId
      const user = await this.userService.updateKycStatus(
        { _id: userId },
        status,
        level
      )
      return new SuccessResponse('Status updated successfully', { user }).send(
        res
      )
    }
  )

  private getUpdateCard = async (body: any, params: any) => {
    const {
      cardName,
      cardNumber,
      cardExpiry,
      cardCvv,
      cardPin,
      cardStatus,
      // cardBalance,
      cardLimit,
      cardLinkingMessage,
      cardWalletCoin,
      cardWalletNetwork,
      cardWalletAddress,
      cardVisibility,
    } = body
    const userId = params.userId as unknown as ObjectId
    const user = await this.userService.updateCard(
      { _id: userId },
      cardName,
      cardNumber,
      cardExpiry,
      cardCvv,
      cardPin,
      cardStatus,
      // cardBalance,
      cardLimit,
      cardLinkingMessage,
      cardWalletCoin,
      cardWalletNetwork,
      cardWalletAddress,
      cardVisibility
    )

    return user
  }

  private updateCard = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const user = await this.getUpdateCard(req.body, req.params)
      return new SuccessResponse('Card updated successfully', { user }).send(
        res
      )
    }
  )

  private updateCardLimit = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const user = await this.getUpdateCard(req.body, req.params)

      await this.notificationService.create(
        `${user.username} has updated the card limit`,
        'Card Limit Update',
        user,
        NotificationForWho.ADMIN,
        UserEnvironment.LIVE
      )

      return new SuccessResponse('Card Limit updated successfully', {
        user,
      }).send(res)
    }
  )

  private updateCardPin = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const user = await this.getUpdateCard(req.body, req.params)

      await this.notificationService.create(
        `${user.username} has changed the card pin`,
        'Card Pin Changed',
        user,
        NotificationForWho.ADMIN,
        UserEnvironment.LIVE
      )

      return new SuccessResponse('Card Pin updated successfully', {
        user,
      }).send(res)
    }
  )

  private updateCardStatus = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const user = await this.getUpdateCard(req.body, req.params)

      await this.notificationService.create(
        `${user.username} has changed the card status`,
        'Card Status Changed',
        user,
        NotificationForWho.ADMIN,
        UserEnvironment.LIVE
      )
      return new SuccessResponse('Card Status updated successfully', {
        user,
      }).send(res)
    }
  )

  private physicalCard = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const { cardAddress, cardCity, cardState, cardCountry, cardZip } =
        req.body
      const userId = req.params.userId as unknown as ObjectId
      const user = await this.userService.physicalCard(
        { _id: userId },
        cardAddress,
        cardCity,
        cardState,
        cardCountry,
        cardZip
      )
      return new SuccessResponse('Card requested successfully', { user }).send(
        res
      )
    }
  )

  private linkCard = asyncHandler(
    async (req, res): Promise<void | Response> => {
      if (!req.user) throw new NotFoundError('User not found')
      const userId = req.user._id
      const message = await this.userService.linkCard(
        { _id: userId },
        req.body.pin
      )
      return new InfoResponse(message, {}).send(res)
    }
  )

  private boostSignal = (environment: UserEnvironment) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      const { account, signalId } = req.body
      const userId = req.user._id
      const user = await this.userService.boostSignal(
        signalId as unknown as ObjectId,
        userId,
        account,
        environment
      )

      return new SuccessResponse('Signal boosted successfully', {
        user,
      }).send(res)
    })

  private updateEmail = (byAdmin: boolean) =>
    asyncHandler(async (req, res): Promise<void | Response> => {
      const userId = byAdmin ? req.params.userId : req.user._id
      const email = req.body.email

      const user = await this.userService.updateEmail({ _id: userId }, email)
      return new SuccessResponse('Email updated successfully', { user }).send(
        res
      )
    })

  private updateStatus = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const { status } = req.body
      const userId = req.params.userId as unknown as ObjectId
      const user = await this.userService.updateStatus({ _id: userId }, status)
      return new SuccessResponse('Status updated successfully', { user }).send(
        res
      )
    }
  )

  private generateCode = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const { coin } = req.body
      if (!req.user) throw new NotFoundError('User not found')
      const userId = req.user._id
      const user = await this.userService.generateCode({ _id: userId }, coin)
      return new SuccessResponse('Your request is processing', { user }).send(
        res
      )
    }
  )

  private requestCard = asyncHandler(
    async (req, res): Promise<void | Response> => {
      if (!req.user) throw new NotFoundError('User not found')
      const userId = req.user._id
      const user = await this.userService.requestCard({ _id: userId })
      return new SuccessResponse('Your request is processing', { user }).send(
        res
      )
    }
  )

  private requestUpgrade = asyncHandler(
    async (req, res): Promise<void | Response> => {
      if (!req.user) throw new NotFoundError('User not found')
      const userId = req.user._id
      const user = await this.userService.requestUpgrade({ _id: userId })
      return new SuccessResponse('Your request is processing', { user }).send(
        res
      )
    }
  )

  private deleteUser = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const user = await this.userService.delete({ _id: userId })
      return new SuccessResponse('User deleted successfully', { user }).send(
        res
      )
    }
  )

  private verifyEmail = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const user = await this.userService.verifyEmail({ _id: userId })
      return new SuccessResponse('User email verified successfully', {
        user,
      }).send(res)
    }
  )

  private fundUser = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const { account, amount } = req.body
      const user = await this.userService.fund({ _id: userId }, account, amount)
      return new SuccessResponse(
        `User ${amount > 0 ? 'credited' : 'debited'} successfully`,
        { user }
      ).send(res)
    }
  )

  private getReferredUsers = (byAdmin: boolean = false) =>
    asyncHandler(async (req, res): Promise<void | Response> => {
      let users
      if (byAdmin) {
        users = await this.userService.fetchAll({})
      } else {
        users = await this.userService.fetchAllReferrals({
          referred: req.user._id,
        })
      }

      return new SuccessResponse('Users fetched successfully', { users }).send(
        res
      )
    })

  private sendEmail = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const { subject, heading, content } = req.body

      const user = await this.userService.sendEmail(
        { _id: userId },
        subject,
        heading,
        content
      )

      return new SuccessResponse('Email successfully sent', { user }).send(res)
    }
  )

  private startMining = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.user._id
      const { planId, account, amount } = req.body

      const user = await this.userService.startMining(
        { _id: userId },
        planId,
        account,
        amount
      )
      return new SuccessResponse('Mining activated successfully', {
        user,
      }).send(res)
    }
  )

  private updateMining = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const {
        miningInvested,
        miningDailyReturn,
        miningSignal,
        miningTotalRound,
        miningRound,
        miningAddedBalance,
      } = req.body

      const user = await this.userService.updateMining(
        { _id: userId },
        miningInvested,
        miningDailyReturn,
        miningSignal,
        miningTotalRound,
        miningRound,
        miningAddedBalance
      )
      return new SuccessResponse('Mining updated successfully', {
        user,
      }).send(res)
    }
  )

  private updateMiningStatus = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const { status } = req.body

      const user = await this.userService.updateMiningStatus(
        { _id: userId },
        status
      )
      return new SuccessResponse('Mining status updated successfully', {
        user,
      }).send(res)
    }
  )

  private fundMining = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const { amount } = req.body

      const user = await this.userService.fundMining({ _id: userId }, amount)
      return new SuccessResponse('Mining funded successfully', {
        user,
      }).send(res)
    }
  )

  private withdrawal = asyncHandler(
    async (req, res): Promise<void | Response> => {
      const userId = req.params.userId as unknown as ObjectId
      const {
        withdrawalTokenEnabled,
        withdrawalToken,
        withdrawalLock,
        withdrawalLockMessage,
        withdrawalMinReferral,
        withdrawalMinReferralBalance,
        withdrawalNoticeShow,
        withdrawalNoticeStatus,
        withdrawalNoticeTitle,
        withdrawalNoticeMessage,
      } = req.body

      const user = await this.userService.withdrawal(
        { _id: userId },
        withdrawalTokenEnabled,
        withdrawalToken,
        withdrawalLock,
        withdrawalLockMessage,
        withdrawalMinReferral,
        withdrawalMinReferralBalance,
        withdrawalNoticeShow,
        withdrawalNoticeStatus,
        withdrawalNoticeTitle,
        withdrawalNoticeMessage
      )
      return new SuccessResponse('Withdrawal settings updated successfully', {
        user,
      }).send(res)
    }
  )

  private alert = asyncHandler(async (req, res): Promise<void | Response> => {
    const userId = req.params.userId as unknown as ObjectId
    const { alertShow, alertColor, alertTitle, alertMessage } = req.body

    const user = await this.userService.alert(
      { _id: userId },
      alertShow,
      alertColor,
      alertTitle,
      alertMessage
    )
    return new SuccessResponse('User notice updated successfully', {
      user,
    }).send(res)
  })
}

export default UserController
