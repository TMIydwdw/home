import { SignalStatus } from '@/modules/signal/signal.enum'
import { FilterQuery } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'

export interface ISignalObject extends baseObjectInterface {
  icon: string
  name: string
  amount: number
  signalStrength: number
  dailyPercentageProfit: number
  status: SignalStatus
}

// @ts-ignore
export interface ISignal extends baseModelInterface, ISignalObject {}

export interface ISignalService {
  create(
    icon: string,
    name: string,
    amount: number,
    signalStrength: number,
    dailyPercentageProfit: number
  ): Promise<ISignalObject>

  update(
    filter: FilterQuery<ISignal>,
    icon: string | undefined,
    name: string,
    amount: number,
    signalStrength: number,
    dailyPercentageProfit: number
  ): Promise<ISignalObject>

  updateStatus(
    filter: FilterQuery<ISignal>,
    status: SignalStatus
  ): Promise<ISignalObject>

  fetch(filter: FilterQuery<ISignal>): Promise<ISignalObject>

  count(filter: FilterQuery<ISignal>): Promise<number>

  delete(filter: FilterQuery<ISignal>): Promise<ISignalObject>

  fetchAll(filter: FilterQuery<ISignal>): Promise<ISignalObject[]>
}
