import { AssetType } from '@/modules/asset/asset.enum'
import { Inject, Service } from 'typedi'
import {
  ISignal,
  ISignalObject,
  ISignalService,
} from '@/modules/signal/signal.interface'
import { IAssetService } from '@/modules/asset/asset.interface'
import { SignalStatus } from '@/modules/signal/signal.enum'
import { FilterQuery, ObjectId } from 'mongoose'
import ServiceToken from '@/core/serviceToken'
import { NotFoundError } from '@/core/apiError'
import SignalModel from '@/modules/signal/signal.model'
import { ImageUploaderSizes } from '../imageUploader/imageUploader.enum'

@Service()
class SignalService implements ISignalService {
  private signalModel = SignalModel

  public static iconImageSizes = [ImageUploaderSizes.ORIGINAL]

  public constructor() {}

  public async create(
    icon: string,
    name: string,
    amount: number,
    signalStrength: number,
    dailyPercentageProfit: number
  ): Promise<ISignalObject> {
    const signal = await this.signalModel.create({
      icon,
      name,
      amount,
      signalStrength,
      dailyPercentageProfit,
    })

    return signal
  }

  public async update(
    filter: FilterQuery<ISignal>,
    icon: string | undefined,
    name: string,
    amount: number,
    signalStrength: number,
    dailyPercentageProfit: number
  ): Promise<ISignalObject> {
    const signal = await this.signalModel.findOne(filter)

    if (!signal) throw new NotFoundError('Signal not found')

    if (icon) signal.icon = icon
    signal.name = name
    signal.amount = amount
    signal.signalStrength = signalStrength
    signal.dailyPercentageProfit = dailyPercentageProfit

    await signal.save()

    return signal
  }

  public async updateStatus(
    filter: FilterQuery<ISignal>,
    status: SignalStatus
  ): Promise<ISignalObject> {
    const signal = await this.signalModel.findOne(filter)

    if (!signal) throw new NotFoundError('Signal not found')

    signal.status = status

    await signal.save()

    return signal
  }

  public async fetch(filter: FilterQuery<ISignal>): Promise<ISignalObject> {
    const signal = await this.signalModel.findOne(filter)

    if (!signal) throw new NotFoundError('Signal not found')

    return signal
  }

  public async count(filter: FilterQuery<ISignal>): Promise<number> {
    return await this.signalModel.count(filter)
  }

  public async delete(filter: FilterQuery<ISignal>): Promise<ISignalObject> {
    const signal = await this.signalModel.findOneAndDelete(filter)
    if (!signal) throw new NotFoundError('Signal not found')

    return signal
  }

  public async fetchAll(
    filter: FilterQuery<ISignal>
  ): Promise<ISignalObject[]> {
    return await this.signalModel.find(filter)
  }
}

export default SignalService
