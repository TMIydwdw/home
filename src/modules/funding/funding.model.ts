import { Schema, Types, model } from 'mongoose'
import { IFunding } from '@/modules/funding/funding.interface'
import { FundingStatus } from './funding.enum'

const FundingSchema = new Schema<IFunding>(
  {
    depositMethod: {
      type: Types.ObjectId,
      ref: 'DepositMethod',
      required: true,
    },
    currency: {
      type: Types.ObjectId,
      ref: 'Currency',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(FundingStatus),
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    fee: {
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

const FundingModel = model<IFunding>('Funding', FundingSchema)

export default FundingModel
