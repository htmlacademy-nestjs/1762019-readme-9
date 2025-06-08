import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RefreshTokenPayload } from '@project/core';

import { AuthenticationService } from '../authentication/authentication.service';
import { TokenNotExistsException } from '../authentication/exceptions/token-not-exists.exception';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { STRATEGY_NAME } from './strategy-name.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_NAME.JWT_REFRESH
) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.refreshTokenSecret')!,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!await this.refreshTokenService.isExists(payload.tokenId)) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(payload.email);
  }
}
