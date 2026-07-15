import { ObjectId } from 'mongoose'
import { Inject, Service } from 'typedi'
import { Response } from 'express'
import { ICopyTradeService } from '@/modules/copyTrade/copyTrade.interface'
import validate from '@/modules/copyTrade/copyTrade.validation'
import { UserRole } from '@/modules/user/user.enum'
import { CopyTradeStatus } from '@/modules/copyTrade/copyTrade.enum'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'
import ImageUploader from '../imageUploader/imageUploader'
import CopyTradeService from './copyTrade.service'
import { BadRequestError, InternalError } from '@/core/apiError'

@Service()
class CopyTradeController extends BaseController implements IController {
  public path = '/copy-trade'
  private imageUploader = new ImageUploader()
  public routes: IControllerRoute[] = [
    [
      'get',
      `${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false)(...params),
    ],
    [
      'post',
      `/master${this.path}/create`,
      routePermission(UserRole.ADMIN),
      this.imageUploader.setNames([{ name: 'icon', maxCount: 1 }]),
      schemaValidator(validate.create),
      this.imageUploader.resize(['icon'], CopyTradeService.iconImageSizes),
      (...params) => this.create(...params),
    ],

    [
      'put',
      `/master${this.path}/update/:copyTradeId`,
      routePermission(UserRole.ADMIN),
      this.imageUploader.setNames([{ name: 'icon', maxCount: 1 }]),
      schemaValidator(validate.update),
      this.imageUploader.resize(['icon'], CopyTradeService.iconImageSizes),
      (...params) => this.update(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:copyTradeId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:copyTradeId`,
      routePermission(UserRole.ADMIN),
      (...params) => this.delete(...params),
    ],
    [
      'get',
      `/master${this.path}`,
      routePermission(UserRole.ADMIN),
      (...params) => this.fetchAll(true)(...params),
    ],
  ]

  constructor(
    @Inject(ServiceToken.COPY_TRADE_SERVICE)
    private copyTradeService: ICopyTradeService
  ) {
    super()
    this.initializeRoutes()
  }

  private create = asyncHandler(
    async (req, res, next): Promise<Response | void> => {
      let iconImage
      try {
        const { name, minAmount, maxAmount, dailyPercentageProfit, icon } =
          req.body

        if (!icon) throw new BadRequestError('Image is required')

        iconImage = icon && icon[0].name

        const copyTrade = await this.copyTradeService.create(
          iconImage,
          name,
          minAmount,
          maxAmount,
          dailyPercentageProfit
        )
        return new SuccessCreatedResponse('CopyTrade created successfully', {
          copyTrade,
        }).send(res)
      } catch (err: any) {
        if (iconImage)
          this.imageUploader.delete(
            'icon',
            iconImage,
            CopyTradeService.iconImageSizes
          )
        next(new InternalError(err.message, undefined, err.status))
      }
    }
  )

  private update = asyncHandler(
    async (req, res, next): Promise<Response | void> => {
      let iconImage
      try {
        const { name, minAmount, maxAmount, dailyPercentageProfit, icon } =
          req.body

        const { copyTradeId } = req.params

        iconImage = icon ? icon[0].name : undefined

        const copyTrade = await this.copyTradeService.update(
          { _id: copyTradeId },
          iconImage,
          name,
          minAmount,
          maxAmount,
          dailyPercentageProfit
        )
        return new SuccessResponse('CopyTrade updated successfully', {
          copyTrade,
        }).send(res)
      } catch (err: any) {
        if (iconImage)
          this.imageUploader.delete(
            'icon',
            iconImage,
            CopyTradeService.iconImageSizes
          )
        next(new InternalError(err.message, undefined, err.status))
      }
    }
  )

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { copyTradeId } = req.params

      const status = req.body.status as CopyTradeStatus

      const copyTrade = await this.copyTradeService.updateStatus(
        { _id: copyTradeId },
        status
      )

      return new SuccessResponse('Status updated successfully', {
        copyTrade,
      }).send(res)
    }
  )

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const copyTradeId = req.params.copyTradeId as unknown as ObjectId

    const copyTrade = await this.copyTradeService.delete({ _id: copyTradeId })

    return new SuccessResponse('CopyTrade deleted successfully', {
      copyTrade,
    }).send(res)
  })

  private fetchAll = (byAdmin: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let copyTrades

      if (byAdmin) {
        copyTrades = await this.copyTradeService.fetchAll({})
      } else {
        copyTrades = await this.copyTradeService.fetchAll({
          status: {
            $ne: CopyTradeStatus.SUSPENDED,
          },
        })
      }

      return new SuccessResponse('CopyTrades fetched successfully', {
        copyTrades,
      }).send(res)
    })
}

export default CopyTradeController
