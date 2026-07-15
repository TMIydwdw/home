import { IFundingService } from '@/modules/funding/funding.interface'
import { Inject, Service } from 'typedi'
import { Router, Response } from 'express'
import validate from '@/modules/funding/funding.validation'
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
class FundingController extends BaseController implements IController {
  public path = '/funding'
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
      `/master${this.path}/update-status/:fundingId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:fundingId`,
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
    @Inject(ServiceToken.FUNDING_SERVICE)
    private fundingService: IFundingService
  ) {
    super()
    this.initializeRoutes()
  }

  private fetchAll = (all: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let fundings
      if (all) {
        fundings = await this.fundingService.fetchAll({})
      } else {
        const userId = req.user._id
        fundings = await this.fundingService.fetchAll({ user: userId })
      }
      return new SuccessResponse('Funding transactions fetched successfully', {
        fundings,
      }).send(res)
    })

  private create = asyncHandler(async (req, res): Promise<Response | void> => {
    const { amount, fundingMethodId } = req.body
    const userId = req.user._id
    const funding = await this.fundingService.create(
      fundingMethodId,
      userId,
      amount
    )
    return new SuccessCreatedResponse('Funding registered successfully', {
      funding,
    }).send(res)
  })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { fundingId } = req.params
      const funding = await this.fundingService.updateStatus(
        { _id: fundingId as unknown as ObjectId },
        status
      )
      return new SuccessResponse('Status updated successfully', {
        funding,
      }).send(res)
    }
  )

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const fundingId = req.params.fundingId as unknown as ObjectId
    const funding = await this.fundingService.delete({ _id: fundingId })
    return new SuccessResponse('Funding transcation deleted successfully', {
      funding,
    }).send(res)
  })
}

export default FundingController
