import { Service } from 'typedi'
import { Response, Router } from 'express'
import { SiteConstants } from '@/modules/config/config.constants'
import { IController, IControllerRoute } from '@/core/utils'
import { SuccessResponse } from '@/core/apiResponse'
import asyncHandler from '@/helpers/asyncHandler'
import BaseController from '@/core/baseController'
import axios from 'axios'

@Service()
export default class ConfigController
  extends BaseController
  implements IController
{
  public path = '/configurations'
  public routes: IControllerRoute[] = [
    ['get', `${this.path}`, (...params) => this.getConstants(...params)],
  ]
  public bitcoinRate = 83780

  constructor() {
    super()
    this.initializeRoutes()
    this.getCoinsRate()
    setInterval(this.getCoinsRate, 10 * 60 * 1000)
  }

  private getCoinsRate = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      )

      if (res?.data?.bitcoin?.usd) {
        this.bitcoinRate = +res?.data?.bitcoin?.usd || this.bitcoinRate
        console.log('current btc rate', this.bitcoinRate)
      }
    } catch (error) {
      console.log(error)
    }
  }

  private getConstants = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const constants = {
        siteName: SiteConstants.siteName,
        siteLink: SiteConstants.siteLink,
        siteApi: SiteConstants.siteApi,
        siteUrl: SiteConstants.siteUrl,
        siteEmail: SiteConstants.siteEmail,
        siteAddress: SiteConstants.siteAddress,
        sitePhone: SiteConstants.sitePhone,
        bitcoinRate: this.bitcoinRate,
      }
      return new SuccessResponse('Constants fetched successfully', {
        constants,
      }).send(res)
    }
  )
}
