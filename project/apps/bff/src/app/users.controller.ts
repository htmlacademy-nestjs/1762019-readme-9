import type { Request } from 'express';
import type { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';

import { bffConfig } from '@project/bff-config';
import { LoginUserDto } from '@project/shared-dto';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(bffConfig.KEY)
    private readonly bffConfiguration: ConfigType<typeof bffConfig>
  ) {
    this.baseUrl = this.bffConfiguration.userServiceUrl;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/login`,
      loginUserDto
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${this.baseUrl}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
