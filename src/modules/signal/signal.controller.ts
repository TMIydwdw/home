import { ObjectId } from 'mongoose'
import { Inject, Service } from 'typedi'
import { Response } from 'express'
import { ISignalService } from '@/modules/signal/signal.interface'
import validate from '@/modules/signal/signal.validation'
import { UserRole } from '@/modules/user/user.enum'
import { SignalStatus } from '@/modules/signal/signal.enum'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'
import ImageUploader from '../imageUploader/imageUploader'
import SignalService from './signal.service'
import { BadRequestError, InternalError } from '@/core/apiError'

@Service()
class SignalController extends BaseController implements IController {
  public path = '/signal'
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
      this.imageUploader.resize(['icon'], SignalService.iconImageSizes),
      (...params) => this.create(...params),
    ],

    [
      'put',
      `/master${this.path}/update/:signalId`,
      routePermission(UserRole.ADMIN),
      this.imageUploader.setNames([{ name: 'icon', maxCount: 1 }]),
      schemaValidator(validate.update),
      this.imageUploader.resize(['icon'], SignalService.iconImageSizes),
      (...params) => this.update(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:signalId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:signalId`,
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
    @Inject(ServiceToken.SIGNAL_SERVICE)
    private signalService: ISignalService
  ) {
    super()
    this.initializeRoutes()
  }

  private create = asyncHandler(
    async (req, res, next): Promise<Response | void> => {
      let iconImage
      try {
        const { name, amount, signalStrength, dailyPercentageProfit, icon } =
          req.body

        if (!icon) throw new BadRequestError('Image is required')

        iconImage = icon && icon[0].name

        const signal = await this.signalService.create(
          iconImage,
          name,
          amount,
          signalStrength,
          dailyPercentageProfit
        )
        return new SuccessCreatedResponse('Signal created successfully', {
          signal,
        }).send(res)
      } catch (err: any) {
        if (iconImage)
          this.imageUploader.delete(
            'icon',
            iconImage,
            SignalService.iconImageSizes
          )
        next(new InternalError(err.message, undefined, err.status))
      }
    }
  )

  private update = asyncHandler(
    async (req, res, next): Promise<Response | void> => {
      let iconImage
      try {
        const { name, amount, signalStrength, dailyPercentageProfit, icon } =
          req.body

        const { signalId } = req.params

        iconImage = icon ? icon[0].name : undefined

        const signal = await this.signalService.update(
          { _id: signalId },
          iconImage,
          name,
          amount,
          signalStrength,
          dailyPercentageProfit
        )
        return new SuccessResponse('Signal updated successfully', {
          signal,
        }).send(res)
      } catch (err: any) {
        if (iconImage)
          this.imageUploader.delete(
            'icon',
            iconImage,
            SignalService.iconImageSizes
          )
        next(new InternalError(err.message, undefined, err.status))
      }
    }
  )

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { signalId } = req.params

      const status = req.body.status as SignalStatus

      const signal = await this.signalService.updateStatus(
        { _id: signalId },
        status
      )

      return new SuccessResponse('Status updated successfully', {
        signal,
      }).send(res)
    }
  )

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const signalId = req.params.signalId as unknown as ObjectId

    const signal = await this.signalService.delete({ _id: signalId })

    return new SuccessResponse('Signal deleted successfully', {
      signal,
    }).send(res)
  })

  private fetchAll = (byAdmin: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let signals

      if (byAdmin) {
        signals = await this.signalService.fetchAll({})
      } else {
        signals = await this.signalService.fetchAll({
          status: {
            $ne: SignalStatus.SUSPENDED,
          },
        })
      }

      return new SuccessResponse('Signals fetched successfully', {
        signals,
      }).send(res)
    })
}

export default SignalController
