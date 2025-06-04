import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notification.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notification.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
  }
}
