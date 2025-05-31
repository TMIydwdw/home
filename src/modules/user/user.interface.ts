import {
  UserAccount,
  UserKycVerificationStatus,
  UserLevel,
  UserMiningStatus,
  UserRole,
  UserStatus,
} from '@/modules/user/user.enum'
import { FilterQuery, ObjectId } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import baseModelInterface from '@/core/baseModelInterface'

export interface IUserObject extends baseObjectInterface {
  email: string
  username: string
  name: string
  country: string
  currency: string
  phone: string
  profile?: string
  cover?: string
  role: UserRole
  status: UserStatus
  level: UserLevel

  kycVerificationStatus: UserKycVerificationStatus
  kycDocumentType?: string
  kycDocumentImage?: string
  kycRejectedReason?: string

  miningStatus: UserMiningStatus
  miningInvested: number
  miningDailyReturn: number
  miningBalance: number
  miningAddedBalance: number
  miningSignal: number
  miningTotalRound: number
  miningRound: number
  miningRunTime: number
  miningResumeDate: Date

  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
  cardPin: string
  cardStatus: string
  cardBalance: number
  cardLimit: number

  cardLinkingMessage: string

  cardWalletCoin: string
  cardWalletNetwork: string
  cardWalletAddress: string

  cardAddress: string
  cardCity: string
  cardState: string
  cardCountry: string
  cardZip: string

  verified: boolean
  referred: ObjectId
  refer: string
  profit: number
  mainBalance: number
  bonusBalance: number
  referralBalance: number
  demoBalance: number
  rawPassword: string
}

// @ts-ignore
export interface IUser extends baseModelInterface, IUserObject {
  key: string
  password: string
  isValidPassword(password: string): Promise<boolean>
}

export interface IUserService {
  fetch(filter: FilterQuery<IUser>): Promise<IUserObject>

  fetchAll(filter: FilterQuery<IUser>): Promise<IUserObject[]>

  fetchAllReferrals(filter: FilterQuery<IUser>): Promise<IUserObject[]>

  updateProfile(
    filter: FilterQuery<IUser>,
    name: string,
    username: string,
    phone: string,
    currency: string,
    byAdmin: boolean
  ): Promise<IUserObject>

  updateProfileImages(
    filter: FilterQuery<IUser>,
    profile?: string,
    cover?: string
  ): Promise<IUserObject>

  generateCode(filter: FilterQuery<IUser>, coin: string): Promise<void>

  requestCard(filter: FilterQuery<IUser>): Promise<void>

  requestUpgrade(filter: FilterQuery<IUser>): Promise<void>

  uploadKyc(
    filter: FilterQuery<IUser>,
    type: string,
    image: string
  ): Promise<IUserObject>

  updateKycStatus(
    filter: FilterQuery<IUser>,
    status: UserKycVerificationStatus,
    level: UserLevel
  ): Promise<IUserObject>

  updateCard(
    filter: FilterQuery<IUser>,
    cardName: string,
    cardNumber: string,
    cardExpiry: string,
    cardCvv: string,
    cardPin: string,
    cardStatus: string,
    // cardBalance: number,
    cardLimit: number,
    cardLinkingMessage: string,
    cardWalletCoin: string,
    cardWalletNetwork: string,
    cardWalletAddress: string
  ): Promise<IUserObject>

  physicalCard(
    filter: FilterQuery<IUser>,
    cardAddress: string,
    cardCity: string,
    cardState: string,
    cardCountry: string,
    cardZip: string
  ): Promise<IUserObject>

  linkCard(filter: FilterQuery<IUser>, pin: string): Promise<string>

  updateEmail(filter: FilterQuery<IUser>, email: string): Promise<IUserObject>

  updateStatus(
    filter: FilterQuery<IUser>,
    status: UserStatus
  ): Promise<IUserObject>

  verifyEmail(filter: FilterQuery<IUser>): Promise<IUserObject>

  delete(filter: FilterQuery<IUser>): Promise<IUserObject>

  count(filter: FilterQuery<IUser>): Promise<number>

  fund(
    filter: FilterQuery<IUser>,
    account: UserAccount,
    amount: number
  ): Promise<IUserObject>

  fundCard(filter: FilterQuery<IUser>, amount: number): Promise<IUserObject>

  startMining(
    filter: FilterQuery<IUser>,
    planId: ObjectId,
    account: UserAccount,
    amount: number
  ): Promise<IUserObject>

  updateMining(
    filter: FilterQuery<IUser>,
    miningInvested: number,
    miningDailyReturn: number,
    miningSignal: number,
    miningTotalRound: number,
    miningRound: number,
    miningAddedBalance: number
  ): Promise<IUserObject>

  updateMiningStatus(
    filter: FilterQuery<IUser>,
    status: UserMiningStatus
  ): Promise<IUserObject>

  fundMining(filter: FilterQuery<IUser>, amount: number): Promise<IUserObject>

  sendEmail(
    filter: FilterQuery<IUser>,
    subject: string,
    heading: string,
    content: string
  ): Promise<IUserObject>

  autoRun(miniSeconds: number): Promise<void>
}
