import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { bffConfig } from './config';

const ENV_BFF_FILE_PATH = 'apps/bff/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [bffConfig],
      envFilePath: ENV_BFF_FILE_PATH,
    }),
  ],
})
export class BffConfigModule {}
