import { Schema, model } from 'mongoose'
import { IOtherDepositMethod } from './otherDepositMethod.interface'
import {
  OtherDepositMethodStatus,
  OtherDepositMethodType,
} from './otherDepositMethod.enum'

const OtherDepositMethodSchema = new Schema<IOtherDepositMethod>(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OtherDepositMethodStatus),
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(OtherDepositMethodType),
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    minDeposit: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    accountName: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
    swiftCode: {
      type: String,
    },
    paypalEmail: {
      type: String,
    },
    cashAppTag: {
      type: String,
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

const OtherDepositMethodModel = model<IOtherDepositMethod>(
  'OtherDepositMethod',
  OtherDepositMethodSchema
)

export default OtherDepositMethodModel
