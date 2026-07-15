import { FundingStatus } from '@/modules/funding/funding.enum'
import {
  IDepositMethod,
  IDepositMethodObject,
} from '@/modules/depositMethod/depositMethod.interface'
import { IUser, IUserObject } from '@/modules/user/user.interface'
import { FilterQuery, ObjectId } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import { ICurrency, ICurrencyObject } from '../currency/currency.interface'

export interface IFundingObject extends baseObjectInterface {
  depositMethod: IDepositMethod['_id']
  currency: ICurrency['_id']
  user: IUser['_id']
  status: FundingStatus
  amount: number
  fee: number
}

// @ts-ignore
export interface IFunding extends baseModelInterface, IFundingObject {}

export interface IFundingService {
  create(
    depositMethodId: ObjectId,
    userId: ObjectId,
    amount: number
  ): Promise<IFundingObject>

  fetchAll(filter: FilterQuery<IFunding>): Promise<IFundingObject[]>

  delete(filter: FilterQuery<IFunding>): Promise<IFundingObject>

  count(filter: FilterQuery<IFunding>): Promise<number>

  updateStatus(
    filter: FilterQuery<IFunding>,
    status: FundingStatus
  ): Promise<IFundingObject>
}
