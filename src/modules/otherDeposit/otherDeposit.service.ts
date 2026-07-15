import { Inject, Service } from 'typedi'
import {
  IOtherDeposit,
  IOtherDepositObject,
  IOtherDepositService,
} from '@/modules/otherDeposit/otherDeposit.interface'
import { IOtherDepositMethodService } from '@/modules/otherDepositMethod/otherDepositMethod.interface'
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
import {
  OtherDepositMethodStatus,
  OtherDepositMethodType,
} from '../otherDepositMethod/otherDepositMethod.enum'
import OtherDepositModel from '@/modules/otherDeposit/otherDeposit.model'
import { DepositStatus } from '../deposit/deposit.enum'

@Service()
class OtherDepositService implements IOtherDepositService {
  private otherDepositModel = OtherDepositModel

  public constructor(
    @Inject(ServiceToken.OTHER_DEPOSIT_METHOD_SERVICE)
    private otherDepositMethodService: IOtherDepositMethodService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.REFERRAL_SERVICE)
    private referralService: IReferralService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService
  ) {}

  public async create(
    userId: ObjectId,
    amount: number,
    type: OtherDepositMethodType
  ): Promise<IOtherDepositObject> {
    const otherDepositMethod = await this.otherDepositMethodService.fetch({
      type,
      status: OtherDepositMethodStatus.ENABLED,
    })

    if (otherDepositMethod.minDeposit > amount)
      throw new BadRequestError(
        'Amount is lower than the min deposit of the selected deposit method'
      )

    const user = await this.userService.fetch({ _id: userId })

    const otherDeposit = await this.otherDepositModel.create({
      user,
      amount,
      type,
      fee: otherDepositMethod.fee,
      status: DepositStatus.PENDING,
    })

    await this.notificationService.create(
      `${user.username} just made a deposit request of ${Helpers.toCurrency(
        amount
      )} awaiting for your approval`,
      NotificationTitle.DEPOSIT_MADE,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    return await otherDeposit.populate('user')
  }

  public async delete(
    filter: FilterQuery<IOtherDeposit>
  ): Promise<IOtherDepositObject> {
    const otherDeposit = await this.otherDepositModel.findOne(filter)

    if (!otherDeposit) throw new NotFoundError('Deposit not found')

    await otherDeposit.deleteOne()
    return otherDeposit
  }

  public async updateStatus(
    filter: FilterQuery<IOtherDeposit>,
    status: DepositStatus
  ): Promise<IOtherDepositObject> {
    const otherDeposit = await this.otherDepositModel
      .findOne(filter)
      .populate('user')

    if (!otherDeposit) throw new NotFoundError('Deposit not found')

    const oldStatus = otherDeposit.status

    if (oldStatus !== DepositStatus.PENDING)
      throw new BadRequestError('Deposit as already been settled')

    otherDeposit.status = status

    await otherDeposit.save()

    let user: IUserObject
    if (status === DepositStatus.APPROVED) {
      user = await this.userService.fund(
        { _id: otherDeposit.user._id },
        UserAccount.MAIN_BALANCE,
        otherDeposit.amount - otherDeposit.fee
      )

      await this.referralService.create(
        ReferralTypes.DEPOSIT,
        user,
        otherDeposit.amount
      )
    } else {
      user = await this.userService.fetch({ _id: otherDeposit.user._id })
    }

    if (status === DepositStatus.CANCELLED) {
      await this.notificationService.create(
        `Your deposit of ${Helpers.toCurrency(
          otherDeposit.amount
        )} was not successful`,
        NotificationTitle.DEPOSIT_FAILED,
        otherDeposit,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )

      await this.transactionService.create(
        user,
        TransactionTitle.DEPOSIT_FAILED,
        otherDeposit,
        otherDeposit.amount,
        UserEnvironment.LIVE
      )
    } else if (status === DepositStatus.APPROVED) {
      await this.notificationService.create(
        `Your deposit of ${Helpers.toCurrency(
          otherDeposit.amount
        )} was successful`,
        NotificationTitle.DEPOSIT_SUCCESSFUL,
        otherDeposit,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )

      await this.transactionService.create(
        user,
        TransactionTitle.DEPOSIT_SUCCESSFUL,
        otherDeposit,
        otherDeposit.amount,
        UserEnvironment.LIVE
      )
    }

    return otherDeposit
  }

  public async fetchAll(
    filter: FilterQuery<IOtherDeposit>
  ): Promise<IOtherDepositObject[]> {
    return await this.otherDepositModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('user')
  }

  public async count(filter: FilterQuery<IOtherDeposit>): Promise<number> {
    return await this.otherDepositModel.count(filter)
  }
}

export default OtherDepositService
