export enum UserRole {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export enum UserAccount {
  PROFIT = 'profit',
  MAIN_BALANCE = 'mainBalance',
  REFERRAL_BALANCE = 'referralBalance',
  DEMO_BALANCE = 'demoBalance',
  BONUS_BALANCE = 'bonusBalance',
}

export enum UserLevel {
  LEVEL_1 = 'Starter',
  LEVEL_2 = 'Premium',
  LEVEL_3 = 'Platinum',
  LEVEL_4 = 'Silver',
  LEVEL_5 = 'Gold',
}

export enum UserKycVerificationStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum UserMiningStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  SUSPENDED = 'Suspended',
  COMPLETE = 'Complete',
}

export enum UserEnvironment {
  DEMO = 'demo',
  LIVE = 'live',
}
