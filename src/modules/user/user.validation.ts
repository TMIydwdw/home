import Joi from 'joi'
import {
  UserAccount,
  UserKycVerificationStatus,
  UserLevel,
  UserMiningStatus,
  UserStatus,
} from '@/modules/user/user.enum'
const updateProfile = Joi.object({
  name: Joi.string().trim().lowercase().min(3).max(30).required(),
  username: Joi.string()
    .trim()
    .alphanum()
    .lowercase()
    .min(3)
    .max(30)
    .required(),
  phone: Joi.string().trim().required(),
  currency: Joi.string().trim().required(),
})

const generateCode = Joi.object({
  coin: Joi.string().trim().required(),
})

const uploadKyc = Joi.object({
  type: Joi.string().trim().required(),
})

const updateEmail = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
})

const updateKycStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(UserKycVerificationStatus))
    .required(),
  level: Joi.string()
    .trim()
    .valid(...Object.values(UserLevel))
    .required(),
})

const updateCard = Joi.object({
  cardName: Joi.string().required(),
  cardNumber: Joi.string().required(),
  cardExpiry: Joi.string().required(),
  cardCvv: Joi.string().required(),
  cardPin: Joi.string().required(),
  cardStatus: Joi.string().required(),
  // cardBalance: Joi.number().min(0).required(),
  cardLimit: Joi.number().min(0).required(),
  cardLinkingMessage: Joi.string().required(),
  // cardWalletCoin: Joi.string().required(),
  // cardWalletNetwork: Joi.string().required(),
  // cardWalletAddress: Joi.string().required(),
  cardVisibility: Joi.string().allow('', null),
})

const linkCard = Joi.object({
  pin: Joi.string().required(),
})

const physicalCard = Joi.object({
  cardAddress: Joi.string().required(),
  cardCity: Joi.string().required(),
  cardState: Joi.string().required(),
  cardCountry: Joi.string().required(),
  cardZip: Joi.string().required(),
})

const boostSignal = Joi.object({
  signalId: Joi.string().trim().required(),
  account: Joi.string()
    .trim()
    .valid(
      UserAccount.MAIN_BALANCE,
      UserAccount.REFERRAL_BALANCE,
      UserAccount.BONUS_BALANCE
    )
    .required(),
})

const updateStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(UserStatus))
    .required(),
})

const sendEmail = Joi.object({
  subject: Joi.string().trim().required(),
  heading: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
})

const fundUser = Joi.object({
  amount: Joi.number().required(),
  account: Joi.string()
    .trim()
    .valid(...Object.values(UserAccount))
    .required(),
})

const startMining = Joi.object({
  planId: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  account: Joi.string()
    .trim()
    .valid(
      UserAccount.MAIN_BALANCE,
      UserAccount.REFERRAL_BALANCE,
      UserAccount.BONUS_BALANCE
    )
    .required(),
})

const updateMining = Joi.object({
  miningInvested: Joi.number().positive().required(),
  miningDailyReturn: Joi.number().positive().required(),
  miningSignal: Joi.number().min(0).max(100).required(),
  miningTotalRound: Joi.number().positive().required(),
  miningRound: Joi.number().positive().required(),
  miningAddedBalance: Joi.number().required(),
})

const updateMiningStatus = Joi.object({
  status: Joi.string()
    .trim()
    .valid(...Object.values(UserMiningStatus))
    .required(),
})

const fundMining = Joi.object({
  amount: Joi.number().required(),
})

const withdrawal = Joi.object({
  withdrawalTokenEnabled: Joi.string().required(),
  withdrawalToken: Joi.string().required(),
  withdrawalLock: Joi.string().required(),
  withdrawalLockMessage: Joi.string().required(),
  withdrawalMinReferral: Joi.number().min(0).required(),
  withdrawalMinReferralBalance: Joi.number().min(0).required(),
  withdrawalNoticeShow: Joi.string().required(),
  withdrawalNoticeStatus: Joi.string().required(),
  withdrawalNoticeTitle: Joi.string().required(),
  withdrawalNoticeMessage: Joi.string().required(),
})

const alert = Joi.object({
  alertShow: Joi.string().required(),
  alertColor: Joi.string().required(),
  alertTitle: Joi.string().required(),
  alertMessage: Joi.string().required(),
})

export default {
  updateProfile,
  updateEmail,
  updateStatus,
  sendEmail,
  fundUser,
  uploadKyc,
  updateKycStatus,
  updateCard,
  physicalCard,
  generateCode,
  startMining,
  updateMining,
  updateMiningStatus,
  fundMining,
  linkCard,
  boostSignal,
  withdrawal,
  alert,
}
