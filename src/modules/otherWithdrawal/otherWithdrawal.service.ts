import { Inject, Service } from 'typedi'
import {
  CreateOtherWithdrawalParams,
  IOtherWithdrawal,
  IOtherWithdrawalObject,
  IOtherWithdrawalService,
} from '@/modules/otherWithdrawal/otherWithdrawal.interface'
import { FilterQuery } from 'mongoose'
import { BadRequestError, NotFoundError } from '@/core/apiError'
import OtherWithdrawalModel from '@/modules/otherWithdrawal/otherWithdrawal.model'
import { WithdrawalStatus } from '../withdrawal/withdrawal.enum'
import ServiceToken from '@/core/serviceToken'
import { IOtherWithdrawalMethodService } from '../otherWithdrawalMethod/otherWithdrawalMethod.interface'
import { IUserService } from '../user/user.interface'
import { ITransactionService } from '../transaction/transaction.interface'
import { INotificationService } from '../notification/notification.interface'
import { UserAccount, UserEnvironment } from '../user/user.enum'
import Helpers from '@/utils/helpers'
import {
  NotificationForWho,
  NotificationTitle,
} from '../notification/notification.enum'
import { TransactionTitle } from '../transaction/transaction.enum'

@Service()
class OtherWithdrawalService implements IOtherWithdrawalService {
  private otherWithdrawalModel = OtherWithdrawalModel

  public constructor(
    @Inject(ServiceToken.OTHER_WITHDRAWAL_METHOD_SERVICE)
    private otherWithdrawalMethodService: IOtherWithdrawalMethodService,
    @Inject(ServiceToken.USER_SERVICE) private userService: IUserService,
    @Inject(ServiceToken.TRANSACTION_SERVICE)
    private transactionService: ITransactionService,
    @Inject(ServiceToken.NOTIFICATION_SERVICE)
    private notificationService: INotificationService
  ) {}

  public async create({
    amount,
    userId,
    type,
    account,
    accountName,
    accountNumber,
    bankName,
    cashAppTag,
    paypalEmail,
    routingNumber,
    swiftCode,
  }: CreateOtherWithdrawalParams): Promise<IOtherWithdrawal> {
    const otherWithdrawalMethod = await this.otherWithdrawalMethodService.fetch(
      {
        type,
      }
    )

    if (otherWithdrawalMethod.minWithdrawal > amount)
      throw new BadRequestError(
        'Amount is lower than the min withdrawal of the selected withdrawal method'
      )

    const user = await this.userService.fund(
      { _id: userId },
      account,
      -(amount + otherWithdrawalMethod.fee)
    )

    const otherWithdrawal = await this.otherWithdrawalModel.create({
      fee: otherWithdrawalMethod.fee,
      user,
      amount,
      type,
      account,
      accountName,
      accountNumber,
      bankName,
      cashAppTag,
      paypalEmail,
      routingNumber,
      swiftCode,
      status: WithdrawalStatus.PENDING,
    })

    await this.notificationService.create(
      `${user.username} just made a withdrawal request of ${Helpers.toCurrency(
        amount
      )} awaiting for your approval`,
      NotificationTitle.WITHDRAWAL_REQUEST,
      user,
      NotificationForWho.ADMIN,
      UserEnvironment.LIVE
    )

    return otherWithdrawal.populate('user')
  }

  public async fetch(
    query: FilterQuery<IOtherWithdrawal>
  ): Promise<IOtherWithdrawalObject> {
    const otherWithdrawal = await this.otherWithdrawalModel.findOne(query)

    if (!otherWithdrawal) throw new NotFoundError('Withdrawal not found')

    return otherWithdrawal
  }

  public async updateStatus(
    query: FilterQuery<IOtherWithdrawal>,
    status: WithdrawalStatus
  ): Promise<IOtherWithdrawal> {
    const otherWithdrawal = await this.otherWithdrawalModel
      .findOne(query)
      .populate('user')

    if (!otherWithdrawal) throw new NotFoundError('Withdrawal not found')

    const oldStatus = otherWithdrawal.status

    if (oldStatus !== WithdrawalStatus.PENDING)
      throw new BadRequestError('Withdrawal as already been settled')

    otherWithdrawal.status = status

    await otherWithdrawal.save()

    let user

    if (status === WithdrawalStatus.CANCELLED) {
      user = await this.userService.fund(
        otherWithdrawal.user._id,
        otherWithdrawal.account,
        otherWithdrawal.amount + otherWithdrawal.fee
      )

      await this.transactionService.create(
        user,
        TransactionTitle.WITHDRAWAL_FAILED,
        otherWithdrawal,
        otherWithdrawal.amount,
        UserEnvironment.LIVE
      )

      await this.notificationService.create(
        `Your withdrawal of ${Helpers.toCurrency(
          otherWithdrawal.amount
        )} was not successful`,
        NotificationTitle.WITHDRAWAL_FAILED,
        otherWithdrawal,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
    } else {
      user = await this.userService.fetch({ _id: otherWithdrawal.user._id })

      await this.transactionService.create(
        user,
        TransactionTitle.WITHDRAWAL_SUCCESSFUL,
        otherWithdrawal,
        otherWithdrawal.amount,
        UserEnvironment.LIVE
      )

      await this.notificationService.create(
        `Your withdrawal of ${Helpers.toCurrency(
          otherWithdrawal.amount
        )} was successful`,
        NotificationTitle.WITHDRAWAL_SUCCESSFUL,
        otherWithdrawal,
        NotificationForWho.USER,
        UserEnvironment.LIVE,
        user
      )
    }

    otherWithdrawal.status = status
    await otherWithdrawal.save()

    return otherWithdrawal
  }

  public async delete(
    filter: FilterQuery<IOtherWithdrawal>
  ): Promise<IOtherWithdrawalObject> {
    const otherWithdrawal = await this.otherWithdrawalModel.findOne(filter)

    if (!otherWithdrawal) throw new NotFoundError('Withdrawal not found')

    await otherWithdrawal.deleteOne()

    return otherWithdrawal
  }

  public async fetchAll(
    query: FilterQuery<IOtherWithdrawal>
  ): Promise<IOtherWithdrawal[]> {
    return await this.otherWithdrawalModel
      .find(query)
      .sort({ createdAt: -1 })
      .populate('user')
  }

  public async count(query: FilterQuery<IOtherWithdrawal>): Promise<number> {
    return await this.otherWithdrawalModel.count(query)
  }
}

export default OtherWithdrawalService
