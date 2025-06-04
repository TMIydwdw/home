import { Schema, model } from 'mongoose'
import { ISignal } from '@/modules/signal/signal.interface'
import { SignalStatus } from '@/modules/signal/signal.enum'
import { Types } from 'mongoose'

const SignalSchema = new Schema<ISignal>(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(SignalStatus),
      default: SignalStatus.ACTIVE,
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
    amount: {
      type: Number,
      required: true,
    },
    signalStrength: {
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

const SignalModel = model<ISignal>('Signal', SignalSchema)

export default SignalModel
