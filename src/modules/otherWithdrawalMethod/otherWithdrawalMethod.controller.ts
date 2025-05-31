import { IWithdrawalMethodService } from '@/modules/withdrawalMethod/withdrawalMethod.interface'
import { Inject, Service } from 'typedi'
import { Router, Response } from 'express'
import validate from '@/modules/withdrawalMethod/withdrawalMethod.validation'
import { UserRole } from '@/modules/user/user.enum'
import { ObjectId } from 'mongoose'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'
import { OtherWithdrawalMethodType } from './otherWithdrawalMethod.enum'
import { IOtherWithdrawalMethodService } from './otherWithdrawalMethod.interface'
import { WithdrawalMethodStatus } from '../withdrawalMethod/withdrawalMethod.enum'

@Service()
class OtherWithdrawalMethodController
  extends BaseController
  implements IController
{
  public path = '/other-withdrawal-method'
  public routes: IControllerRoute[] = [
    [
      'get',
      `${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false)(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:withdrawalMethodId`,
      routePermission(UserRole.ADMIN),
      // schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'put',
      `/master${this.path}/update/:withdrawalMethodId`,
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
    @Inject(ServiceToken.OTHER_WITHDRAWAL_METHOD_SERVICE)
    private otherWithdrawalMethodService: IOtherWithdrawalMethodService
  ) {
    super()
    this.initializeRoutes()
    // this.otherWithdrawalMethodService.create({
    //   fee: 0,
    //   minWithdrawal: 50,
    //   type: OtherWithdrawalMethodType.BANK,
    // })
  }

  private fetchAll = (all: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let withdrawalMethods
      if (all) {
        withdrawalMethods = await this.otherWithdrawalMethodService.fetchAll({})
      } else {
        withdrawalMethods = await this.otherWithdrawalMethodService.fetchAll({
          status: WithdrawalMethodStatus.ENABLED,
        })
      }
      return new SuccessResponse('Withdrawal methods fetched successfully', {
        withdrawalMethods,
      }).send(res)
    })

  private update = asyncHandler(async (req, res): Promise<Response | void> => {
    const { withdrawalMethodId } = req.params
    const withdrawalMethod = await this.otherWithdrawalMethodService.update(
      { _id: withdrawalMethodId as unknown as ObjectId },
      req.body
    )
    return new SuccessResponse('Withdrawal method updated successfully', {
      withdrawalMethod,
    }).send(res)
  })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { withdrawalMethodId } = req.params
      const withdrawalMethod =
        await this.otherWithdrawalMethodService.updateStatus(
          { _id: withdrawalMethodId as unknown as ObjectId },
          status
        )
      return new SuccessResponse('Status updated successfully', {
        withdrawalMethod,
      }).send(res)
    }
  )
}

export default OtherWithdrawalMethodController
