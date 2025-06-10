import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserNotificationModule } from '@project/user-notification';
import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/user-config';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { LocalStrategy } from '../strategies/local.strategy';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserNotificationModule,
    RefreshTokenModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
