import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { applicationConfig } from './configs/app.config';
import { dbConfig as mongoConfig } from './configs/mongo.config';
import { jwtConfig } from './configs/jwt.config';

const ENV_USERS_FILE_PATH = 'apps/user/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class UserConfigModule {}
