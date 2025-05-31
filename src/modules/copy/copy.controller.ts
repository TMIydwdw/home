import { ICopyService } from '@/modules/copy/copy.interface'
import { Inject, Service } from 'typedi'
import { Response } from 'express'
import validate from '@/modules/copy/copy.validation'
import { UserEnvironment, UserRole } from '@/modules/user/user.enum'
import { ObjectId } from 'mongoose'
import { SuccessCreatedResponse, SuccessResponse } from '@/core/apiResponse'
import asyncHandler from '@/helpers/asyncHandler'
import { IController, IControllerRoute } from '@/core/utils'
import ServiceToken from '@/core/serviceToken'
import routePermission from '@/helpers/routePermission'
import schemaValidator from '@/helpers/schemaValidator'
import BaseController from '@/core/baseController'

@Service()
class CopyController extends BaseController implements IController {
  public path = '/copy'
  public routes: IControllerRoute[] = [
    [
      'get',
      `${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false, UserEnvironment.LIVE)(...params),
    ],
    [
      'post',
      `${this.path}/create`,
      routePermission(UserRole.USER),
      schemaValidator(validate.create),
      (...params) => this.create(UserEnvironment.LIVE)(...params),
    ],
    [
      'get',
      `/demo${this.path}`,
      routePermission(UserRole.USER),
      (...params) => this.fetchAll(false, UserEnvironment.DEMO)(...params),
    ],
    [
      'post',
      `/demo${this.path}/create`,
      routePermission(UserRole.USER),
      schemaValidator(validate.createDemo),
      (...params) => this.create(UserEnvironment.DEMO)(...params),
    ],
    [
      'patch',
      `/master${this.path}/fund/:copyId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.fund),
      (...params) => this.fund(...params),
    ],
    [
      'patch',
      `/master${this.path}/update-status/:copyId`,
      routePermission(UserRole.ADMIN),
      schemaValidator(validate.updateStatus),
      (...params) => this.updateStatus(...params),
    ],
    [
      'delete',
      `/master${this.path}/delete/:copyId`,
      routePermission(UserRole.ADMIN),
      (...params) => this.delete(...params),
    ],
    [
      'get',
      `/master/demo${this.path}`,
      routePermission(UserRole.ADMIN),
      (...params) => this.fetchAll(true, UserEnvironment.DEMO)(...params),
    ],
    [
      'get',
      `/master${this.path}`,
      routePermission(UserRole.ADMIN),
      (...params) => this.fetchAll(true, UserEnvironment.LIVE)(...params),
    ],
  ]

  constructor(
    @Inject(ServiceToken.COPY_SERVICE)
    private copyService: ICopyService
  ) {
    super()
    this.initializeRoutes()
  }

  private fetchAll = (all: boolean, environment: UserEnvironment) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      const userId = req.user._id
      let copies
      if (all) {
        copies = await this.copyService.fetchAll({ environment })
      } else {
        copies = await this.copyService.fetchAll({
          environment,
          user: userId,
        })
      }

      return new SuccessResponse('copies fetched successfully', {
        copies,
      }).send(res)
    })

  private create = (environment: UserEnvironment) =>
    asyncHandler(async (req, res): Promise<Response | void> => {
      const { amount, account, copyTradeId } = req.body
      const userId = req.user._id
      const copy = await this.copyService.create(
        copyTradeId as unknown as ObjectId,
        userId,
        amount,
        account,
        environment
      )
      return new SuccessCreatedResponse('Copy registered successfully', {
        copy,
      }).send(res)
    })

  private updateStatus = asyncHandler(
    async (req, res): Promise<Response | void> => {
      const { status } = req.body
      const { copyId } = req.params
      const copy = await this.copyService.updateStatus({ _id: copyId }, status)
      return new SuccessResponse('Status updated successfully', {
        copy,
      }).send(res)
    }
  )

  private fund = asyncHandler(async (req, res): Promise<Response | void> => {
    const { amount } = req.body
    const { copyId } = req.params
    const copy = await this.copyService.fund({ _id: copyId }, amount)
    return new SuccessResponse('Copy funded successfully', {
      copy,
    }).send(res)
  })

  private delete = asyncHandler(async (req, res): Promise<Response | void> => {
    const copyId = req.params.copyId as unknown as ObjectId
    const copy = await this.copyService.delete({
      _id: copyId,
    })
    return new SuccessResponse('Copy deleted successfully', {
      copy,
    }).send(res)
  })
}

export default CopyController
