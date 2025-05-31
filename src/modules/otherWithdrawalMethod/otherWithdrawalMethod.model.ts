import { Schema, model } from 'mongoose'
import { IOtherWithdrawalMethod } from './otherWithdrawalMethod.interface'
import { OtherWithdrawalMethodType } from './otherWithdrawalMethod.enum'
import { WithdrawalMethodStatus } from '../withdrawalMethod/withdrawalMethod.enum'

const OtherWithdrawalMethodSchema = new Schema<IOtherWithdrawalMethod>(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(WithdrawalMethodStatus),
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(OtherWithdrawalMethodType),
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    minWithdrawal: {
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

const OtherWithdrawalMethodModel = model<IOtherWithdrawalMethod>(
  'OtherWithdrawalMethod',
  OtherWithdrawalMethodSchema
)

export default OtherWithdrawalMethodModel
