import { Inject, Service } from 'typedi'
import {
  INotification,
  INotificationObject,
  INotificationService,
} from '@/modules/notification/notification.interface'
import {
  NotificationForWho,
  NotificationTitle,
} from '@/modules/notification/notification.enum'
import { IUserObject } from '@/modules/user/user.interface'
import { UserEnvironment } from '@/modules/user/user.enum'
import { FilterQuery } from 'mongoose'
import baseObjectInterface from '@/core/baseObjectInterface'
import { InternalError, NotFoundError } from '@/core/apiError'
import NotificationModel from '@/modules/notification/notification.model'
import ServiceToken from '@/core/serviceToken'
import { IMailService } from '../mail/mail.interface'
import renderFile from '@/utils/renderFile'
import { SiteConstants } from '../config/config.constants'

@Service()
class NotificationService implements INotificationService {
  private notificationModel = NotificationModel

  public constructor(
    @Inject(ServiceToken.MAIL_SERVICE) private mailService: IMailService
  ) {}

  public async create(
    message: string,
    title: NotificationTitle,
    object: baseObjectInterface | any,
    forWho: NotificationForWho,
    environment: UserEnvironment,
    user?: IUserObject
  ): Promise<INotificationObject> {
    if (forWho === NotificationForWho.USER && !user)
      throw new InternalError(
        'User object must be provided when forWho is equal to user'
      )

    const notification = await this.notificationModel.create({
      user,
      message,
      title,
      object,
      forWho,
      environment,
    })

    if (forWho === NotificationForWho.ADMIN) {
      const { ADMIN_EMAIL } = process.env

      const emailContent = await renderFile('email/custom', {
        heading: title,
        content: message,
        user: object,
        config: SiteConstants,
      })

      this.mailService.sendMail({
        subject: title,
        to: ADMIN_EMAIL,
        text: message,
        html: emailContent,
      })
    }

    return notification
  }

  public async delete(
    filter: FilterQuery<INotification>
  ): Promise<INotificationObject> {
    const notification = await this.notificationModel.findOne(filter)

    if (!notification) throw new NotFoundError('Notification not found')

    await notification.deleteOne()

    return notification
  }

  public async read(
    filter: FilterQuery<INotification>
  ): Promise<INotificationObject> {
    const notification = await this.notificationModel
      .findOne(filter)
      .populate('user')

    if (!notification) throw new NotFoundError('Notification not found')

    notification.read = true

    await notification.save()

    return notification
  }

  public async readAll(filter: FilterQuery<INotification>): Promise<void> {
    await this.notificationModel.updateMany(filter, { $set: { read: true } })
  }

  public async fetchAll(
    filter: FilterQuery<INotification>
  ): Promise<INotificationObject[]> {
    const notifications = await this.notificationModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate('user')

    return notifications
  }

  public async count(filter: FilterQuery<INotification>): Promise<number> {
    return await this.notificationModel.count(filter)
  }
}

export default NotificationService
