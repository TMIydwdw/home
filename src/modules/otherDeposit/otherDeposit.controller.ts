import { IOtherDepositService } from '@/modules/otherDeposit/otherDeposit.interface'
import { Inject, Service } from 'typedi'
import { Router, Response } from 'express'
import validate from '@/modules/otherDeposit/otherDeposit.validation'
import { UserRole } from '@/modules/user/user.enum'
import { ObjectId } from 'mongoose'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import BaseController from '@/core/baseController'

@Service()
class OtherDepositController extends BaseController implements IController {
  public path = '/other-deposit'
  public routes: IControllerRoute[] = [
    [
      'post',
      `${this.path}/create`,
      routePermission(UserRole.USER),
      schemaValidator(validate.create),
      (...params) => this.create(...params),
    ],
    [
      'get',
      `${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false)(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:otherDepositId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:otherDepositId`,
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
    @Inject(ServiceToken.OTHER_DEPOSIT_SERVICE)
    private otherDepositService: IOtherDepositService
  ) {
    super()
    this.initializeRoutes()
  }

  private fetchAll = (all: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let otherDeposits
      if (all) {
        otherDeposits = await this.otherDepositService.fetchAll({})
      } else {
        const userId = req.user._id
        otherDeposits = await this.otherDepositService.fetchAll({
          user: userId,
        })
      }
      return new SuccessResponse('Deposit transactions fetched successfully', {
        otherDeposits,
      }).send(res)
    })

  private create = asyncHandler(async (req, res): Promise<Response | void> => {
    const { amount, type } = req.body
    const userId = req.user._id
    const otherDeposit = await this.otherDepositService.create(
      userId,
      amount,
      type
    )
    return new SuccessCreatedResponse('Deposit registered successfully', {
      otherDeposit,
    }).send(res)
  })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { otherDepositId } = req.params
      const otherDeposit = await this.otherDepositService.updateStatus(
        { _id: otherDepositId as unknown as ObjectId },
        status
      )
      return new SuccessResponse('Status updated successfully', {
        otherDeposit,
      }).send(res)
    }
  )

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const otherDepositId = req.params.otherDepositId as unknown as ObjectId
    const otherDeposit = await this.otherDepositService.delete({
      _id: otherDepositId,
    })
    return new SuccessResponse('Deposit transaction deleted successfully', {
      otherDeposit,
    }).send(res)
  })
}

export default OtherDepositController
