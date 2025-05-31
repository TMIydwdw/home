import { FilterQuery } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import { OtherWithdrawalMethodType } from './otherWithdrawalMethod.enum'
import { WithdrawalMethodStatus } from '../withdrawalMethod/withdrawalMethod.enum'

export interface IOtherWithdrawalMethodObject extends baseObjectInterface {
  status: WithdrawalMethodStatus
  type: OtherWithdrawalMethodType
  fee: number
  minWithdrawal: number
}

// @ts-ignore
export interface IOtherWithdrawalMethod
  extends baseModelInterface,
    IOtherWithdrawalMethodObject {}

export interface CreateOtherWithdrawalMethodParams {
  type: OtherWithdrawalMethodType
  fee: number
  minWithdrawal: number
}

export interface UpdateOtherWithdrawalMethodParams {
  fee: number
  minWithdrawal: number
}

export interface IOtherWithdrawalMethodService {
  create(
    params: CreateOtherWithdrawalMethodParams
  ): Promise<IOtherWithdrawalMethod>

  update(
    filter: FilterQuery<IOtherWithdrawalMethod>,
    params: UpdateOtherWithdrawalMethodParams
  ): Promise<IOtherWithdrawalMethod>

  fetch(
    filter: FilterQuery<IOtherWithdrawalMethod>
  ): Promise<IOtherWithdrawalMethodObject>

  fetchAll(
    filter: FilterQuery<IOtherWithdrawalMethod>
  ): Promise<IOtherWithdrawalMethod[]>

  updateStatus(
    filter: FilterQuery<IOtherWithdrawalMethod>,
    status: WithdrawalMethodStatus
  ): Promise<IOtherWithdrawalMethod>

  count(filter: FilterQuery<IOtherWithdrawalMethod>): Promise<number>
}
