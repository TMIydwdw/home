import { Service } from 'typedi'
import {
  CreateOtherDepositMethodParams,
  IOtherDepositMethod,
  IOtherDepositMethodObject,
  IOtherDepositMethodService,
  UpdateOtherDepositMethodParams,
} from '@/modules/otherDepositMethod/otherDepositMethod.interface'
import { OtherDepositMethodStatus } from '@/modules/otherDepositMethod/otherDepositMethod.enum'
import { FilterQuery } from 'mongoose'
import { BadRequestError, NotFoundError } from '@/core/apiError'
import OtherDepositMethodModel from '@/modules/otherDepositMethod/otherDepositMethod.model'

@Service()
class OtherDepositMethodService implements IOtherDepositMethodService {
  private otherDepositMethodModel = OtherDepositMethodModel

  public async create({
    fee,
    minDeposit,
    type,
    accountName,
    accountNumber,
    bankName,
    cashAppTag,
    paypalEmail,
    routingNumber,
    swiftCode,
  }: CreateOtherDepositMethodParams): Promise<IOtherDepositMethod> {
    const otherDepositMethod = await this.otherDepositMethodModel.create({
      fee,
      minDeposit,
      type,
      accountName,
      accountNumber,
      bankName,
      cashAppTag,
      paypalEmail,
      routingNumber,
      swiftCode,
      status: OtherDepositMethodStatus.ENABLED,
    })

    return otherDepositMethod
  }

  public async update(
    query: FilterQuery<IOtherDepositMethod>,
    {
      fee,
      minDeposit,
      accountName,
      accountNumber,
      bankName,
      cashAppTag,
      paypalEmail,
      routingNumber,
      swiftCode,
    }: UpdateOtherDepositMethodParams
  ): Promise<IOtherDepositMethod> {
    if (fee >= minDeposit)
      throw new BadRequestError('Min deposit must be greater than the fee')

    const otherDepositMethod = await this.otherDepositMethodModel.findOne(query)

    if (!otherDepositMethod) throw new NotFoundError('Deposit method not found')

    otherDepositMethod.fee = fee
    otherDepositMethod.minDeposit = minDeposit
    otherDepositMethod.accountName = accountName
    otherDepositMethod.accountNumber = accountNumber
    otherDepositMethod.bankName = bankName
    otherDepositMethod.cashAppTag = cashAppTag
    otherDepositMethod.paypalEmail = paypalEmail
    otherDepositMethod.routingNumber = routingNumber
    otherDepositMethod.swiftCode = swiftCode

    await otherDepositMethod.save()

    return otherDepositMethod
  }

  public async fetch(
    query: FilterQuery<IOtherDepositMethod>
  ): Promise<IOtherDepositMethodObject> {
    const otherDepositMethod = await this.otherDepositMethodModel.findOne(query)

    if (!otherDepositMethod) throw new NotFoundError('Deposit method not found')

    return otherDepositMethod
  }

  public async updateStatus(
    query: FilterQuery<IOtherDepositMethod>,
    status: OtherDepositMethodStatus
  ): Promise<IOtherDepositMethod> {
    const otherDepositMethod = await this.otherDepositMethodModel.findOne(query)

    if (!otherDepositMethod) throw new NotFoundError('Deposit method not found')

    otherDepositMethod.status = status
    await otherDepositMethod.save()

    return otherDepositMethod
  }

  public async fetchAll(
    query: FilterQuery<IOtherDepositMethod>
  ): Promise<IOtherDepositMethod[]> {
    return await this.otherDepositMethodModel
      .find(query)
      .sort({ createdAt: -1 })
  }

  public async count(query: FilterQuery<IOtherDepositMethod>): Promise<number> {
    return await this.otherDepositMethodModel.count(query)
  }
}

export default OtherDepositMethodService
