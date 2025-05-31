import { ICopy } from '@/modules/copy/copy.interface'
import { Schema, Types, model } from 'mongoose'
import { UserAccount, UserEnvironment } from '../user/user.enum'
import { CopyStatus } from './copy.enum'

const CopySchema = new Schema<ICopy>(
  {
    copyTrade: {
      type: Types.ObjectId,
      ref: 'CopyTrade',
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    account: {
      type: String,
      required: true,
      enum: Object.values(UserAccount),
      trim: true,
    },
    environment: {
      type: String,
      required: true,
      enum: Object.values(UserEnvironment),
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(CopyStatus),
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    extraProfit: {
      type: Number,
      required: true,
      default: 0,
    },
    runTime: {
      type: Number,
      required: true,
      default: 0,
    },
    resumeTime: {
      required: true,
      type: Date,
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

const CopyModel = model<ICopy>('Copy', CopySchema)

export default CopyModel
