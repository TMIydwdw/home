import { Schema, Types, model } from 'mongoose'
import { IOtherWithdrawal } from './otherWithdrawal.interface'
import { WithdrawalStatus } from '../withdrawal/withdrawal.enum'
import { OtherWithdrawalMethodType } from '../otherWithdrawalMethod/otherWithdrawalMethod.enum'

const OtherWithdrawalSchema = new Schema<IOtherWithdrawal>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(WithdrawalStatus),
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(OtherWithdrawalMethodType),
      trim: true,
    },
    account: {
      type: String,
      required: true,
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    amount: {
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

const OtherWithdrawalModel = model<IOtherWithdrawal>(
  'OtherWithdrawal',
  OtherWithdrawalSchema
)

export default OtherWithdrawalModel
