import { UserRole } from '@/modules/user/user.enum'

export enum NotificationTitle {
  DEPOSIT_MADE = 'Deposit Made',
  DEPOSIT_SUCCESSFUL = 'Deposit Successful',
  DEPOSIT_FAILED = 'Deposit Failed',
  FUNDING_MADE = 'Card Funding Made',
  FUNDING_SUCCESSFUL = 'Card Funding Successful',
  FUNDING_FAILED = 'Card Funding Failed',
  WITHDRAWAL_REQUEST = 'Withdrawal Request',
  WITHDRAWAL_SUCCESSFUL = 'Withdrawal Successful',
  WITHDRAWAL_FAILED = 'Withdrawal Failed',
  TRANSFER_SENT = 'Transfer Sent',
  TRANSFER_RECEIVED = 'Transfer Received',
  TRANSFER_REVERSED = 'Transfer Reversed',
  REFERRAL_EARNINGS = 'Referral Earnings',
  INVESTMENT_PURCHASED = 'Miner Purchased',
  INVESTMENT_COMPLETED = 'Mining Completed',
  INVESTMENT_RUNNING = 'Miner Running',
  INVESTMENT_SUSPENDED = 'Miner Suspended',
  KYC_VERIFICATION = 'KYC Verification',
  ACCOUNT_UPGRADE = 'Account Upgrade',
  QUERY_CODE_REQUEST = 'Quarry Code Request',
  CARD_REQUEST = 'Card Request',
  UPGRADE_REQUEST = 'Upgrade Request',
  NEW_USER = 'New User',
  INITIALIZED_MINING = 'Initialized Mining',
  MINING_COMPLETE = 'Mining Complete',
  MINING_SUSPENDED = 'Mining Suspended',
  MINING_RUNNING = 'Mining Re-activated',
  COPY_PURCHASED = 'copy purchased',
  COPY_COMPLETED = 'copy completed',
}

export enum NotificationForWho {
  ADMIN = UserRole.ADMIN,
  USER = UserRole.USER,
}
