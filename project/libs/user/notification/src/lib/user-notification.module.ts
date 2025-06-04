import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/helpers';

import { UserNotificationService } from './user-notification.service';

@Module({
  imports: [RabbitMQModule.forRootAsync(getRabbitMQOptions('rabbit'))],
  providers: [UserNotificationService],
  exports: [UserNotificationService],
})
export class UserNotificationModule {}
