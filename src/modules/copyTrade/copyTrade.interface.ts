import { CopyTradeStatus } from '@/modules/copyTrade/copyTrade.enum'
import { FilterQuery } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'

export interface ICopyTradeObject extends baseObjectInterface {
  icon: string
  name: string
  minAmount: number
  maxAmount: number
  dailyPercentageProfit: number
  status: CopyTradeStatus
}

// @ts-ignore
export interface ICopyTrade extends baseModelInterface, ICopyTradeObject {}

export interface ICopyTradeService {
  create(
    icon: string,
    name: string,
    minAmount: number,
    maxAmount: number,
    dailyPercentageProfit: number
  ): Promise<ICopyTradeObject>

  update(
    filter: FilterQuery<ICopyTrade>,
    icon: string | undefined,
    name: string,
    minAmount: number,
    maxAmount: number,
    dailyPercentageProfit: number
  ): Promise<ICopyTradeObject>

  updateStatus(
    filter: FilterQuery<ICopyTrade>,
    status: CopyTradeStatus
  ): Promise<ICopyTradeObject>

  fetch(filter: FilterQuery<ICopyTrade>): Promise<ICopyTradeObject>

  count(filter: FilterQuery<ICopyTrade>): Promise<number>

  delete(filter: FilterQuery<ICopyTrade>): Promise<ICopyTradeObject>

  fetchAll(filter: FilterQuery<ICopyTrade>): Promise<ICopyTradeObject[]>
}
