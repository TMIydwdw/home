export class SiteConstants {
  static siteName: string = 'Trade Mint Index'
  static frontendLink: string = 'https://trademintindex.com/'
  static siteLink: string = 'trademintindex.com'
  static siteUrl: string = 'https://' + this.siteLink + '/'
  static siteApi: string = this.siteUrl + 'api/'
  static siteEmail: string = 'support@' + this.siteLink
  static siteAddress: string = ''
  static sitePhone: string = ''
  static siteLogo: string = this.siteUrl + 'images/logo.png'
  static mainBalance: number = 0
  static referralBalance: number = 0
  static demoBalance: number = 1000
  static bonusBalance: number = 50
  static verifyEmailExpiresTime: number = 1000 * 60 * 60
  static resetPasswordExpiresTime: number = 1000 * 60 * 60
  static safeMiningSignal: number = 20
  static defaultMiningSignal: number = 35
}
