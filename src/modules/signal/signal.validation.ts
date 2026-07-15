import Joi from 'joi'
import { CopyTradeStatus } from '@/modules/copyTrade/copyTrade.enum'
import { AssetType } from '@/modules/asset/asset.enum'

const create = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  signalStrength: Joi.number().positive().required(),
  dailyPercentageProfit: Joi.number().positive().required(),
})

const update = Joi.object({
  name: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  signalStrength: Joi.number().positive().required(),
  dailyPercentageProfit: Joi.number().positive().required(),
})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(CopyTradeStatus))
    .required(),
})

export default { create, update, updateStatus }
