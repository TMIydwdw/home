import { IUser } from '@/modules/user/user.interface'
import { FilterQuery, ObjectId } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import { DepositStatus } from '../deposit/deposit.enum'
import { OtherDepositMethodType } from '../otherDepositMethod/otherDepositMethod.enum'

export interface IOtherDepositObject extends baseObjectInterface {
  user: IUser['_id']
  type: OtherDepositMethodType
  status: DepositStatus
  amount: number
  fee: number
}

// @ts-ignore
export interface IOtherDeposit
  extends baseModelInterface,
    IOtherDepositObject {}

export interface IOtherDepositService {
  create(
    userId: ObjectId,
    amount: number,
    type: OtherDepositMethodType
  ): Promise<IOtherDepositObject>

  fetchAll(filter: FilterQuery<IOtherDeposit>): Promise<IOtherDepositObject[]>

  delete(filter: FilterQuery<IOtherDeposit>): Promise<IOtherDepositObject>

  count(filter: FilterQuery<IOtherDeposit>): Promise<number>

  updateStatus(
    filter: FilterQuery<IOtherDeposit>,
    status: DepositStatus
  ): Promise<IOtherDepositObject>
}
