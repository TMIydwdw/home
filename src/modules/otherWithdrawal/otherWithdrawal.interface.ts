import { FilterQuery, ObjectId } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import { WithdrawalStatus } from '../withdrawal/withdrawal.enum'
import { IUser } from '../user/user.interface'
import { OtherWithdrawalMethodType } from '../otherWithdrawalMethod/otherWithdrawalMethod.enum'
import { UserAccount } from '../user/user.enum'

export interface IOtherWithdrawalObject extends baseObjectInterface {
  user: IUser['_id']
  status: WithdrawalStatus
  type: OtherWithdrawalMethodType
  fee: number
  amount: number
  account: UserAccount
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
  swiftCode?: string
  paypalEmail?: string
  cashAppTag?: string
}

// @ts-ignore
export interface IOtherWithdrawal
  extends baseModelInterface,
    IOtherWithdrawalObject {}

export interface CreateOtherWithdrawalParams {
  userId: ObjectId
  type: OtherWithdrawalMethodType
  amount: number
  account: UserAccount
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
  swiftCode?: string
  paypalEmail?: string
  cashAppTag?: string
}

export interface IOtherWithdrawalService {
  create(params: CreateOtherWithdrawalParams): Promise<IOtherWithdrawal>

  fetch(filter: FilterQuery<IOtherWithdrawal>): Promise<IOtherWithdrawalObject>

  fetchAll(filter: FilterQuery<IOtherWithdrawal>): Promise<IOtherWithdrawal[]>

  updateStatus(
    filter: FilterQuery<IOtherWithdrawal>,
    status: WithdrawalStatus
  ): Promise<IOtherWithdrawal>

  delete(filter: FilterQuery<IOtherWithdrawal>): Promise<IOtherWithdrawalObject>

  count(filter: FilterQuery<IOtherWithdrawal>): Promise<number>
}
