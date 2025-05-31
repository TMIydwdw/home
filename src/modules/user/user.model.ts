import { Schema, model, Types } from 'mongoose'
import { IUser } from '@/modules/user/user.interface'
import Cryptograph from '@/core/cryptograph'
import {
  UserKycVerificationStatus,
  UserLevel,
  UserMiningStatus,
} from './user.enum'

const UserSchema = new Schema<IUser>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    profile: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: UserLevel,
      default: UserLevel.LEVEL_1,
      trim: true,
    },
    kycVerificationStatus: {
      type: String,
      enum: UserKycVerificationStatus,
      default: UserKycVerificationStatus.PENDING,
      trim: true,
    },
    kycDocumentType: {
      type: String,
      trim: true,
    },
    kycDocumentImage: {
      type: String,
      trim: true,
    },
    kycRejectedReason: {
      type: String,
      trim: true,
    },
    miningStatus: {
      type: String,
      enum: UserMiningStatus,
      default: UserMiningStatus.PENDING,
      trim: true,
    },
    miningInvested: {
      type: Number,
      default: 0,
    },
    miningDailyReturn: {
      type: Number,
      default: 0,
    },
    miningBalance: {
      type: Number,
      default: 0,
    },
    miningAddedBalance: {
      type: Number,
      default: 0,
    },
    miningSignal: {
      type: Number,
      default: 0,
    },
    miningTotalRound: {
      type: Number,
      default: 0,
    },
    miningRound: {
      type: Number,
      default: 0,
    },
    miningRunTime: {
      type: Number,
      default: 0,
    },
    miningResumeDate: {
      type: Date,
    },
    cardName: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    cardExpiry: {
      type: String,
    },
    cardCvv: {
      type: String,
    },
    cardPin: {
      type: String,
    },
    cardStatus: {
      type: String,
    },
    cardBalance: {
      type: Number,
      default: 0,
    },
    cardLimit: {
      type: Number,
      default: 0,
    },
    cardLinkingMessage: {
      type: String,
    },
    cardWalletAddress: {
      type: String,
    },
    cardWalletCoin: {
      type: String,
    },
    cardWalletNetwork: {
      type: String,
    },
    cardAddress: {
      type: String,
    },
    cardCity: {
      type: String,
    },
    cardState: {
      type: String,
    },
    cardCountry: {
      type: String,
    },
    cardZip: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    rawPassword: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      required: true,
    },
    referred: {
      type: Types.ObjectId,
    },
    refer: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
    mainBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    bonusBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    referralBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    demoBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.password
        delete ret.key
        delete ret.__v
      },
    },
  }
)

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await Cryptograph.setHash(this.password)
  return next()
})

UserSchema.methods.isValidPassword = async function (password: string) {
  return await Cryptograph.isValidHash(password, this.password)
}

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
