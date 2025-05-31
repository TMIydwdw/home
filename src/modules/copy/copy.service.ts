import { Inject, Service } from 'typedi'
import { ICopy, ICopyObject, ICopyService } from '@/modules/copy/copy.interface'
import { CopyStatus } from '@/modules/copy/copy.enum'
import { ICopyTradeService } from '@/modules/copyTrade/copyTrade.interface'
import { IUserService } from '@/modules/user/user.interface'
import { ITransactionService } from '@/modules/transaction/transaction.interface'
import { TransactionTitle } from '@/modules/transaction/transaction.enum'
import { IReferralService } from '@/modules/referral/referral.interface'
import { INotificationService } from '@/modules/notification/notification.interface'
import {
  NotificationTitle,
  NotificationForWho,
} from '@/modules/notification/notification.enum'
import { ReferralTypes } from '@/modules/referral/referral.enum'

import { UserAccount, UserEnvironment } from '@/modules/user/user.enum'
import { FilterQuery, ObjectId } from 'mongoose'
import { BadRequestError, NotFoundError } from '@/core/apiError'
import ServiceToken from '@/core/serviceToken'
import Helpers from '@/utils/helpers'
import CopyModel from '@/modules/copy/copy.model'

@Service()
class CopyService implements ICopyService {
  private copyModel = CopyModel
  private autoRunTimes = 0

  public constructor(
    @Inject(ServiceToken.COPY_TRADE_SERVICE)
    private copyTradeService: ICopyTradeService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @Inject(ServiceToken.REFERRAL_SERVICE)
    private referralService: IReferralService
  ) {}

  public async fetch(filter: FilterQuery<ICopy>): Promise<ICopyObject> {
    const copy = await this.copyModel.findOne(filter)
    if (!copy) throw new NotFoundError('Copy not found')
    return copy
  }

  public async create(
    copyTradeId: ObjectId,
    userId: ObjectId,
    amount: number,
    account: UserAccount,
    environment: UserEnvironment
  ): Promise<ICopyObject> {
    const copyTrade = await this.copyTradeService.fetch({ _id: copyTradeId })

    if (!copyTrade)
      throw new NotFoundError('The selected trader no longer exist')

    if (copyTrade.minAmount > amount || copyTrade.maxAmount < amount)
      throw new BadRequestError(
        `The amount allowed in this trader is between ${Helpers.toCurrency(
          copyTrade.minAmount
        )} and ${Helpers.toCurrency(copyTrade.maxAmount)}.`
      )

    // User Transaction Instance
    const user = await this.userService.fund({ _id: userId }, account, -amount)

    // Copy Transaction Instance
    const copy = await this.copyModel.create({
      copyTrade,
      user,
      amount,
      balance: amount,
      account,
      environment,
      status: CopyStatus.RUNNING,
      resumeTime: new Date(),
    })

    // Referral Transaction Instance
    if (environment === UserEnvironment.LIVE) {
      await this.referralService.create(
        ReferralTypes.INVESTMENT,
        user,
        copy.amount
      )
    }

    // Transaction Transaction Instance
    await this.transactionService.create(
      user,
      TransactionTitle.COPY_PURCHASED,
      copy,
      amount,
      environment
    )

    // Notification Transaction Instance
    await this.notificationService.create(
      `Your copy of ${Helpers.toCurrency(amount)} on the ${
        copyTrade.name
      } copyTrade is up and running`,
      NotificationTitle.COPY_PURCHASED,
      copy,
      NotificationForWho.USER,
      environment,
      user
    )

    // Admin Notification Transaction Instance
    await this.notificationService.create(
      `${user.username} just invested in the ${
        copyTrade.name
      } copyTrade with the sum of ${Helpers.toCurrency(
        amount
      )}, on his ${environment} account`,
      NotificationTitle.COPY_PURCHASED,
      copy,
      NotificationForWho.ADMIN,
      environment
    )

    return await (await copy.populate('user')).populate('copyTrade')
  }

  public async updateStatus(
    filter: FilterQuery<ICopy>,
    status: CopyStatus,
    sendNotice: boolean = true
  ): Promise<ICopyObject> {
    // Copy Transaction Instance
    const copy = await this.copyModel
      .findOne(filter)
      .populate('user')
      .populate('copyTrade')

    if (!copy) throw new NotFoundError('Copy not found')

    copy.status = status

    let user
    if (status === CopyStatus.COMPLETED) {
      // User Transaction Instance

      const daysRan =
        ((copy.runTime + new Date().getTime() - copy.resumeTime.getTime()) /
          1000) *
        60 *
        60 *
        24

      const balance =
        ((copy.copyTrade?.dailyPercentageProfit || 100) *
          daysRan *
          copy.amount) /
          100 +
        (copy.amount + copy.extraProfit)

      copy.balance = balance

      const account =
        copy.account === UserAccount.DEMO_BALANCE
          ? UserAccount.DEMO_BALANCE
          : UserAccount.PROFIT

      user = await this.userService.fund(
        { _id: copy.user._id },
        account,
        balance
      )

      // Transaction Transaction Instance
      await this.transactionService.create(
        user,
        TransactionTitle.COPY_COMPLETED,
        copy,
        balance,
        copy.environment
      )

      // Referral Transaction Instance
      if (copy.environment === UserEnvironment.LIVE) {
        await this.referralService.create(
          ReferralTypes.COMPLETED_PACKAGE_EARNINGS,
          user,
          balance - copy.amount
        )
      }
    } else if (status === CopyStatus.SUSPENDED) {
      const runTime = new Date().getTime() - copy.resumeTime.getTime()
      copy.runTime += runTime
      copy.resumeTime = new Date()
    } else if (status === CopyStatus.RUNNING) {
      copy.resumeTime = new Date()
    }

    await copy.save()

    // if (sendNotice) {
    //   let notificationMessage
    //   let notificationTitle
    //   switch (status) {
    //     case CopyStatus.RUNNING:
    //       notificationMessage = 'is now running'
    //       notificationTitle = NotificationTitle.COPY_RUNNING
    //       break
    //     case CopyStatus.SUSPENDED:
    //       notificationMessage = 'has been suspended'
    //       notificationTitle = NotificationTitle.COPY_SUSPENDED
    //       break
    //     case CopyStatus.COMPLETED:
    //       notificationMessage = 'has been completed'
    //       notificationTitle = NotificationTitle.COPY_COMPLETED
    //       break
    //   }

    //   // Notification Transaction Instance
    //   if (notificationMessage && notificationTitle) {
    //     user = user
    //       ? user
    //       : await this.userService.fetch({ _id: copy.user._id })

    //     await this.notificationService.create(
    //       `Your copy package ${notificationMessage}`,
    //       notificationTitle,
    //       copy,
    //       NotificationForWho.USER,
    //       copy.environment,
    //       user
    //     )
    //   }
    // }

    return copy
  }

  public async fund(
    filter: FilterQuery<ICopy>,
    amount: number
  ): Promise<ICopyObject> {
    const copy = await this.copyModel
      .findOne(filter)
      .populate('user')
      .populate('copyTrade')

    if (!copy) throw new NotFoundError('Copy not found')

    copy.extraProfit += amount

    await copy.save()

    return copy
  }

  public async delete(filter: FilterQuery<ICopy>): Promise<ICopyObject> {
    const copy = await this.copyModel.findOne(filter)

    if (!copy) throw new NotFoundError('Copy not found')

    await this.copyModel.deleteOne({ _id: copy._id })

    return copy
  }

  public async fetchAll(filter: FilterQuery<ICopy>): Promise<ICopyObject[]> {
    return await this.copyModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('copyTrade')
  }

  public async count(filter: FilterQuery<ICopy>): Promise<number> {
    return await this.copyModel.count(filter)
  }
}

export default CopyService
