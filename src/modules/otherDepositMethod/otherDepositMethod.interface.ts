import { FilterQuery } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'
import {
  OtherDepositMethodStatus,
  OtherDepositMethodType,
} from './otherDepositMethod.enum'

export interface IOtherDepositMethodObject extends baseObjectInterface {
  status: OtherDepositMethodStatus
  type: OtherDepositMethodType
  fee: number
  minDeposit: number
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
  swiftCode?: string
  paypalEmail?: string
  cashAppTag?: string
}

// @ts-ignore
export interface IOtherDepositMethod
  extends baseModelInterface,
    IOtherDepositMethodObject {}

export interface CreateOtherDepositMethodParams {
  type: OtherDepositMethodType
  fee: number
  minDeposit: number
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
  swiftCode?: string
  paypalEmail?: string
  cashAppTag?: string
}

export interface UpdateOtherDepositMethodParams {
  fee: number
  minDeposit: number
  bankName?: string
  accountNumber?: string
  accountName?: string
  routingNumber?: string
  swiftCode?: string
  paypalEmail?: string
  cashAppTag?: string
}

export interface IOtherDepositMethodService {
  create(params: CreateOtherDepositMethodParams): Promise<IOtherDepositMethod>

  update(
    filter: FilterQuery<IOtherDepositMethod>,
    params: UpdateOtherDepositMethodParams
  ): Promise<IOtherDepositMethod>

  fetch(
    filter: FilterQuery<IOtherDepositMethod>
  ): Promise<IOtherDepositMethodObject>

  fetchAll(
    filter: FilterQuery<IOtherDepositMethod>
  ): Promise<IOtherDepositMethod[]>

  updateStatus(
    filter: FilterQuery<IOtherDepositMethod>,
    status: OtherDepositMethodStatus
  ): Promise<IOtherDepositMethod>

  count(filter: FilterQuery<IOtherDepositMethod>): Promise<number>
}
