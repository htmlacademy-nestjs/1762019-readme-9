import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import type { ConfigType } from '@nestjs/config';

import { bffConfig, BffConfigModule } from '@project/bff-config';

import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    BffConfigModule,
    HttpModule.registerAsync({
      useFactory: async (bffConfiguration: ConfigType<typeof bffConfig>) => {
        return {
          timeout: bffConfiguration.httpClientTimeout,
          maxRedirects: bffConfiguration.httpClientMaxRedirects,
        };
      },
      inject: [bffConfig.KEY],
    }),
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
