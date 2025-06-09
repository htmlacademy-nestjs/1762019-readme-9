import {
  Body,
  Controller,
  Inject,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { ConfigType } from '@nestjs/config';

import { bffConfig } from '@project/bff-config';
import { CreatePostDto, BlogPostRdo } from '@project/blog-post';
import { InjectUserIdInterceptor } from '@project/interceptors';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';


@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  private readonly blogServiceUrl: string;
  constructor(
    private readonly httpService: HttpService,
    @Inject(bffConfig.KEY) private readonly config: ConfigType<typeof bffConfig>
  ) {
    this.blogServiceUrl = this.config.blogServiceUrl;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post<BlogPostRdo>(
      `${this.blogServiceUrl}/`,
      dto
    );
    return data;
  }
}
