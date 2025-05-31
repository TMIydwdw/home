import { Service } from 'typedi'
import {
  CreateOtherWithdrawalMethodParams,
  IOtherWithdrawalMethod,
  IOtherWithdrawalMethodObject,
  IOtherWithdrawalMethodService,
  UpdateOtherWithdrawalMethodParams,
} from '@/modules/otherWithdrawalMethod/otherWithdrawalMethod.interface'
import { FilterQuery } from 'mongoose'
import { BadRequestError, NotFoundError } from '@/core/apiError'
import OtherWithdrawalMethodModel from '@/modules/otherWithdrawalMethod/otherWithdrawalMethod.model'
import { WithdrawalMethodStatus } from '../withdrawalMethod/withdrawalMethod.enum'

@Service()
class OtherWithdrawalMethodService implements IOtherWithdrawalMethodService {
  private otherWithdrawalMethodModel = OtherWithdrawalMethodModel

  public async create({
    fee,
    minWithdrawal,
    type,
  }: CreateOtherWithdrawalMethodParams): Promise<IOtherWithdrawalMethod> {
    const otherWithdrawalMethod = await this.otherWithdrawalMethodModel.create({
      fee,
      minWithdrawal,
      type,
      status: WithdrawalMethodStatus.ENABLED,
    })

    return otherWithdrawalMethod
  }

  public async update(
    query: FilterQuery<IOtherWithdrawalMethod>,
    { fee, minWithdrawal }: UpdateOtherWithdrawalMethodParams
  ): Promise<IOtherWithdrawalMethod> {
    if (fee >= minWithdrawal)
      throw new BadRequestError('Min withdrawal must be greater than the fee')

    const otherWithdrawalMethod = await this.otherWithdrawalMethodModel.findOne(
      query
    )

    if (!otherWithdrawalMethod)
      throw new NotFoundError('Withdrawal method not found')

    otherWithdrawalMethod.fee = fee
    otherWithdrawalMethod.minWithdrawal = minWithdrawal

    await otherWithdrawalMethod.save()

    return otherWithdrawalMethod
  }

  public async fetch(
    query: FilterQuery<IOtherWithdrawalMethod>
  ): Promise<IOtherWithdrawalMethodObject> {
    const otherWithdrawalMethod = await this.otherWithdrawalMethodModel.findOne(
      query
    )

    if (!otherWithdrawalMethod)
      throw new NotFoundError('Withdrawal method not found')

    return otherWithdrawalMethod
  }

  public async updateStatus(
    query: FilterQuery<IOtherWithdrawalMethod>,
    status: WithdrawalMethodStatus
  ): Promise<IOtherWithdrawalMethod> {
    const otherWithdrawalMethod = await this.otherWithdrawalMethodModel.findOne(
      query
    )

    if (!otherWithdrawalMethod)
      throw new NotFoundError('Withdrawal method not found')

    otherWithdrawalMethod.status = status
    await otherWithdrawalMethod.save()

    return otherWithdrawalMethod
  }

  public async fetchAll(
    query: FilterQuery<IOtherWithdrawalMethod>
  ): Promise<IOtherWithdrawalMethod[]> {
    return await this.otherWithdrawalMethodModel
      .find(query)
      .sort({ createdAt: -1 })
  }

  public async count(
    query: FilterQuery<IOtherWithdrawalMethod>
  ): Promise<number> {
    return await this.otherWithdrawalMethodModel.count(query)
  }
}

export default OtherWithdrawalMethodService
