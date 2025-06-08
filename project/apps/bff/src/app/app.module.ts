import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { bffConfig, BffConfigModule } from '@project/bff-config';
import type { ConfigType } from '@nestjs/config';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
