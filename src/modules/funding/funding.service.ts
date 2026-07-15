import { Inject, Service } from 'typedi'
import {
  IFunding,
  IFundingObject,
  IFundingService,
} from '@/modules/funding/funding.interface'
import { FundingStatus } from '@/modules/funding/funding.enum'
import { IDepositMethodService } from '@/modules/depositMethod/depositMethod.interface'
import { IUserObject, IUserService } from '@/modules/user/user.interface'
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
import Helpers from '@/utils/helpers'
import ServiceToken from '@/core/serviceToken'
import { DepositMethodStatus } from '../depositMethod/depositMethod.enum'
import FundingModel from '@/modules/funding/funding.model'

@Service()
class FundingService implements IFundingService {
  private fundingModel = FundingModel

  public constructor(
    @Inject(ServiceToken.DEPOSIT_METHOD_SERVICE)
    private depositMethodService: IDepositMethodService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.REFERRAL_SERVICE)
    private referralService: IReferralService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService
  ) {}

  public async create(
    depositMethodId: ObjectId,
    userId: ObjectId,
    amount: number
  ): Promise<IFundingObject> {
    const depositMethod = await this.depositMethodService.fetch({
      _id: depositMethodId,
      status: DepositMethodStatus.ENABLED,
    })

    if (depositMethod.minDeposit > amount)
      throw new BadRequestError(
        'Amount is lower than the min funding of the selected funding method'
      )

    const user = await this.userService.fetch({ _id: userId })

    const funding = await this.fundingModel.create({
      depositMethod,
      currency: depositMethod.currency,
      user,
      amount,
      fee: depositMethod.fee,
      status: FundingStatus.PENDING,
    })

    await this.notificationService.create(
      `${user.username} just made a funding request of ${Helpers.toCurrency(
        amount
      )} awaiting for your approval`,
      NotificationTitle.FUNDING_MADE,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    return (
      await (await funding.populate('user')).populate('depositMethod')
    ).populate('currency')
  }

  public async delete(filter: FilterQuery<IFunding>): Promise<IFundingObject> {
    const funding = await this.fundingModel.findOne(filter)

    if (!funding) throw new NotFoundError('Funding not found')

    await funding.deleteOne()
    return funding
  }

  public async updateStatus(
    filter: FilterQuery<IFunding>,
    status: FundingStatus
  ): Promise<IFundingObject> {
    const funding = await this.fundingModel
      .findOne(filter)
      .populate('user')
      .populate('depositMethod')
      .populate('currency')

    if (!funding) throw new NotFoundError('Funding not found')

    const oldStatus = funding.status

    if (oldStatus !== FundingStatus.PENDING)
      throw new BadRequestError('Funding as already been settled')

    funding.status = status

    await funding.save()

    let user: IUserObject
    if (status === FundingStatus.APPROVED) {
      user = await this.userService.fund(
        { _id: funding.user._id },
        UserAccount.MAIN_BALANCE,
        funding.amount - funding.fee
      )

      await this.referralService.create(
        ReferralTypes.DEPOSIT,
        user,
        funding.amount
      )
    } else {
      user = await this.userService.fetch({ _id: funding.user._id })
    }

    if (status === FundingStatus.CANCELLED) {
      await this.notificationService.create(
        `Your funding of ${Helpers.toCurrency(
          funding.amount
        )} was not successful`,
        NotificationTitle.FUNDING_FAILED,
        funding,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )

      await this.transactionService.create(
        user,
        TransactionTitle.FUNDING_FAILED,
        funding,
        funding.amount,
        UserEnvironment.LIVE
      )
    } else if (status === FundingStatus.APPROVED) {
      await this.notificationService.create(
        `Your funding of ${Helpers.toCurrency(funding.amount)} was successful`,
        NotificationTitle.FUNDING_SUCCESSFUL,
        funding,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )

      await this.transactionService.create(
        user,
        TransactionTitle.FUNDING_SUCCESSFUL,
        funding,
        funding.amount,
        UserEnvironment.LIVE
      )
    }

    return funding
  }

  public async fetchAll(
    filter: FilterQuery<IFunding>
  ): Promise<IFundingObject[]> {
    return await this.fundingModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('depositMethod')
      .populate('currency')
  }

  public async count(filter: FilterQuery<IFunding>): Promise<number> {
    return await this.fundingModel.count(filter)
  }
}

export default FundingService
