import { AssetType } from '@/modules/asset/asset.enum'
import { Inject, Service } from 'typedi'
import {
  ICopyTrade,
  ICopyTradeObject,
  ICopyTradeService,
} from '@/modules/copyTrade/copyTrade.interface'
import { IAssetService } from '@/modules/asset/asset.interface'
import { CopyTradeStatus } from '@/modules/copyTrade/copyTrade.enum'
import { FilterQuery, ObjectId } from 'mongoose'
import ServiceToken from '@/core/serviceToken'
import { NotFoundError } from '@/core/apiError'
import CopyTradeModel from '@/modules/copyTrade/copyTrade.model'
import { ImageUploaderSizes } from '../imageUploader/imageUploader.enum'

@Service()
class CopyTradeService implements ICopyTradeService {
  private copyTradeModel = CopyTradeModel

  public static iconImageSizes = [ImageUploaderSizes.ORIGINAL]

  public constructor() {}

  public async create(
    icon: string,
    name: string,
    minAmount: number,
    maxAmount: number,
    dailyPercentageProfit: number
  ): Promise<ICopyTradeObject> {
    const copyTrade = await this.copyTradeModel.create({
      icon,
      name,
      minAmount,
      maxAmount,
      dailyPercentageProfit,
    })

    return copyTrade
  }

  public async update(
    filter: FilterQuery<ICopyTrade>,
    icon: string | undefined,
    name: string,
    minAmount: number,
    maxAmount: number,
    dailyPercentageProfit: number
  ): Promise<ICopyTradeObject> {
    const copyTrade = await this.copyTradeModel.findOne(filter)

    if (!copyTrade) throw new NotFoundError('CopyTrade not found')

    if (icon) copyTrade.icon = icon
    copyTrade.name = name
    copyTrade.minAmount = minAmount
    copyTrade.maxAmount = maxAmount
    copyTrade.dailyPercentageProfit = dailyPercentageProfit

    await copyTrade.save()

    return copyTrade
  }

  public async updateStatus(
    filter: FilterQuery<ICopyTrade>,
    status: CopyTradeStatus
  ): Promise<ICopyTradeObject> {
    const copyTrade = await this.copyTradeModel.findOne(filter)

    if (!copyTrade) throw new NotFoundError('CopyTrade not found')

    copyTrade.status = status

    await copyTrade.save()

    return copyTrade
  }

  public async fetch(
    filter: FilterQuery<ICopyTrade>
  ): Promise<ICopyTradeObject> {
    const copyTrade = await this.copyTradeModel.findOne(filter)

    if (!copyTrade) throw new NotFoundError('CopyTrade not found')

    return copyTrade
  }

  public async count(filter: FilterQuery<ICopyTrade>): Promise<number> {
    return await this.copyTradeModel.count(filter)
  }

  public async delete(
    filter: FilterQuery<ICopyTrade>
  ): Promise<ICopyTradeObject> {
    const copyTrade = await this.copyTradeModel.findOneAndDelete(filter)
    if (!copyTrade) throw new NotFoundError('CopyTrade not found')

    return copyTrade
  }

  public async fetchAll(
    filter: FilterQuery<ICopyTrade>
  ): Promise<ICopyTradeObject[]> {
    return await this.copyTradeModel.find(filter)
  }
}

export default CopyTradeService
