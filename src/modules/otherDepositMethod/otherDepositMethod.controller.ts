import { IDepositMethodService } from '@/modules/depositMethod/depositMethod.interface'
import { Inject, Service } from 'typedi'
import { Router, Response } from 'express'
import validate from '@/modules/depositMethod/depositMethod.validation'
import { UserRole } from '@/modules/user/user.enum'
import { ObjectId } from 'mongoose'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'
import {
  OtherDepositMethodStatus,
  OtherDepositMethodType,
} from './otherDepositMethod.enum'
import { IOtherDepositMethodService } from './otherDepositMethod.interface'

@Service()
class OtherDepositMethodController
  extends BaseController
  implements IController
{
  public path = '/other-deposit-method'
  public routes: IControllerRoute[] = [
    [
      'get',
      `${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false)(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:depositMethodId`,
      routePermission(UserRole.ADMIN),
      // schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'put',
      `/master${this.path}/update/:depositMethodId`,
      routePermission(UserRole.ADMIN),
      // schemaValidator(validate.update),
      (...params) => this.update(...params),
    ],
    [
      'get',
      `/master${this.path}`,
      routePermission(UserRole.ADMIN),
      (...params) => this.fetchAll(true)(...params),
    ],
  ]

  constructor(
    @Inject(ServiceToken.OTHER_DEPOSIT_METHOD_SERVICE)
    private otherDepositMethodService: IOtherDepositMethodService
  ) {
    super()
    this.initializeRoutes()
    // this.otherDepositMethodService.create({
    //   fee: 0,
    //   minDeposit: 50,
    //   type: OtherDepositMethodType.PAYPAL,
    //   paypalEmail: '',
    // })
  }

  private fetchAll = (all: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let depositMethods
      if (all) {
        depositMethods = await this.otherDepositMethodService.fetchAll({})
      } else {
        depositMethods = await this.otherDepositMethodService.fetchAll({
          status: OtherDepositMethodStatus.ENABLED,
        })
      }
      return new SuccessResponse('Deposit methods fetched successfully', {
        depositMethods,
      }).send(res)
    })

  private update = asyncHandler(async (req, res): Promise<Response | void> => {
    const { depositMethodId } = req.params
    const depositMethod = await this.otherDepositMethodService.update(
      { _id: depositMethodId as unknown as ObjectId },
      req.body
    )
    return new SuccessResponse('Deposit method updated successfully', {
      depositMethod,
    }).send(res)
  })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { depositMethodId } = req.params
      const depositMethod = await this.otherDepositMethodService.updateStatus(
        { _id: depositMethodId as unknown as ObjectId },
        status
      )
      return new SuccessResponse('Status updated successfully', {
        depositMethod,
      }).send(res)
    }
  )
}

export default OtherDepositMethodController
