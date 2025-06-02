import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { notificationCenterConfig } from './notification-center.config';

const ENV_FILE_PATH = 'apps/notification-center/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationCenterConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class NotificationCenterConfigModule {}
