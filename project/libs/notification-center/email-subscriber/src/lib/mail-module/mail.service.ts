import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { Subscriber } from '@project/core';
import { notificationCenterConfig } from '@project/notification-center-config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(notificationCenterConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof notificationCenterConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }
}
