import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { jwtConfig } from '@project/user-config';
import { TokenPayload } from '@project/core';
import { STRATEGY_NAME } from './strategy-name.constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_NAME.JWT_ACCESS
) {
  constructor(
    @Inject(jwtConfig.KEY)
    readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    const { accessTokenSecret } = jwtConfiguration;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenSecret,
    });
  }

  public async validate(payload: TokenPayload) {
    return payload;
  }
}
