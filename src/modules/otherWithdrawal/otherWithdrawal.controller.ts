import { IOtherWithdrawalService } from '@/modules/otherWithdrawal/otherWithdrawal.interface'
import { Inject, Service } from 'typedi'
import { Response } from 'express'
import validate from '@/modules/otherWithdrawal/otherWithdrawal.validation'
import { UserRole } from '@/modules/user/user.enum'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import asyncHandler from '@/helpers/asyncHandler'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'

@Service()
class OtherWithdrawalController extends BaseController implements IController {
  public path = '/other-withdrawal'
  public routes: IControllerRoute[] = [
    [
      'post',
      `${this.path}/create`,
      routePermission(UserRole.USER),
      // schemaValidator(validate.create),
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
      `/master${this.path}/update-status/:otherWithdrawalId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:otherWithdrawalId`,
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
    @Inject(ServiceToken.OTHER_WITHDRAWAL_SERVICE)
    private otherWithdrawalService: IOtherWithdrawalService
  ) {
    super()
    this.initializeRoutes()
  }

  private fetchAll = (byAdmin: boolean) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      let otherWithdrawals
      if (byAdmin) {
        otherWithdrawals = await this.otherWithdrawalService.fetchAll({})
      } else {
        const userId = req.user._id
        otherWithdrawals = await this.otherWithdrawalService.fetchAll({
          user: userId,
        })
      }
      return new SuccessResponse('Withdrawals fetched successfully', {
        otherWithdrawals,
      }).send(res)
    })

  private create = asyncHandler(async (req, res): Promise<Response | void> => {
    const userId = req.user._id
    const otherWithdrawal = await this.otherWithdrawalService.create({
      ...req.body,
      userId,
    })
    return new SuccessCreatedResponse('Withdrawal registered successfully', {
      otherWithdrawal,
    }).send(res)
  })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { otherWithdrawalId } = req.params
      const otherWithdrawal = await this.otherWithdrawalService.updateStatus(
        { _id: otherWithdrawalId },
        status
      )
      return new SuccessResponse('Status updated successfully', {
        otherWithdrawal,
      }).send(res)
    }
  )

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const otherWithdrawalId = req.params.otherWithdrawalId
    const otherWithdrawal = await this.otherWithdrawalService.delete({
      _id: otherWithdrawalId,
    })
    return new SuccessResponse('Withdrawal transaction deleted successfully', {
      otherWithdrawal,
    }).send(res)
  })
}

export default OtherWithdrawalController
