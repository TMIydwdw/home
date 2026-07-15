import { CopyStatus } from '@/modules/copy/copy.enum'
import { IUser } from '@/modules/user/user.interface'
import { UserAccount, UserEnvironment } from '@/modules/user/user.enum'
import { FilterQuery, ObjectId } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import { ICopyTrade } from '../copyTrade/copyTrade.interface'

export interface ICopyObject extends baseObjectInterface {
  user: IUser['_id']
  copyTrade: ICopyTrade['_id']
  status: CopyStatus
  amount: number
  balance: number
  extraProfit: number
  account: UserAccount
  environment: UserEnvironment
  runTime: number
  resumeTime: Date
}

// @ts-ignore
export interface ICopy extends baseModelInterface, ICopyObject {}

export interface ICopyService {
  create(
    copyTradeId: ObjectId,
    userId: ObjectId,
    amount: number,
    account: UserAccount,
    environment: UserEnvironment
  ): Promise<ICopyObject>

  fetchAll(filter: FilterQuery<ICopy>): Promise<ICopyObject[]>

  fetch(filter: FilterQuery<ICopy>): Promise<ICopyObject>

  count(filter: FilterQuery<ICopy>): Promise<number>

  delete(filter: FilterQuery<ICopy>): Promise<ICopyObject>

  updateStatus(
    filter: FilterQuery<ICopy>,
    status: CopyStatus,
    sendNotice?: boolean
  ): Promise<ICopyObject>

  fund(filter: FilterQuery<ICopy>, amount: number): Promise<ICopyObject>
}
