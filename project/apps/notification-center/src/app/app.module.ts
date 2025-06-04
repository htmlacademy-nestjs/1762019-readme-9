import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { NotificationCenterConfigModule, getMongooseOptions } from '@project/notification-center-config';
import { EmailSubscriberModule } from '@project/email-subscriber';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotificationCenterConfigModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
