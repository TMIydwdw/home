import { Schema, Types, model } from 'mongoose'
import { IOtherDeposit } from '@/modules/otherDeposit/otherDeposit.interface'
import { DepositStatus } from '../deposit/deposit.enum'
import { OtherDepositMethodType } from '../otherDepositMethod/otherDepositMethod.enum'

const OtherDepositSchema = new Schema<IOtherDeposit>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(DepositStatus),
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(OtherDepositMethodType),
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

const OtherDepositModel = model<IOtherDeposit>(
  'OtherDeposit',
  OtherDepositSchema
)

export default OtherDepositModel
