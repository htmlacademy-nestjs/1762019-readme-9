import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { ConfigType } from '@nestjs/config';

import { bffConfig } from '@project/bff-config';
import { TokenPayload } from '@project/core';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  private readonly userServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(bffConfig.KEY) private readonly config: ConfigType<typeof bffConfig>
  ) {
    this.userServiceUrl = this.config.userServiceUrl;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post<TokenPayload>(
      `${this.userServiceUrl}/check`,
      {},
      {
        headers: {
          Authorization: request.headers['authorization'],
        },
      }
    );

    request['user'] = data;
    return true;
  }
}
