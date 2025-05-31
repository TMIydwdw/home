import { Schema, model } from 'mongoose'
import { ICopyTrade } from '@/modules/copyTrade/copyTrade.interface'
import { CopyTradeStatus } from '@/modules/copyTrade/copyTrade.enum'
import { Types } from 'mongoose'

const CopyTradeSchema = new Schema<ICopyTrade>(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(CopyTradeStatus),
      default: CopyTradeStatus.ACTIVE,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    maxAmount: {
      type: Number,
      required: true,
    },
    dailyPercentageProfit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v
      },
    },
  }
)

const CopyTradeModel = model<ICopyTrade>('CopyTrade', CopyTradeSchema)

export default CopyTradeModel
