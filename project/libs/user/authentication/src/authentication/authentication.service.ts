import crypto from 'node:crypto';
import dayjs from 'dayjs';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';

import { Token, User, UserRole } from '@project/core';
import { UserNotificationService } from '@project/user-notification';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { jwtConfig } from '@project/user-config';
import { createJWTPayload } from '@project/helpers';

import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

import { AUTH_USER } from './authentication.constants';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly notificationService: UserNotificationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password, dateBirth } = dto;

    const blogUser = {
      email,
      firstname,
      lastname,
      role: UserRole.User,
      avatar: '',
      dateOfBirth: dayjs(dateBirth).toDate(),
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER.EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    await this.blogUserRepository.save(userEntity);
    await this.notificationService.registerSubscriber({
      email,
      firstname,
      lastname,
    });

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AUTH_USER.NOT_FOUND);
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER.PASSWORD_WRONG);
    }

    return user;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER.NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    try {
      const accessTokenPayload = createJWTPayload(user);
      const refreshTokenPayload = {
        ...accessTokenPayload,
        tokenId: crypto.randomUUID(),
      };

      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtConfiguration.refreshTokenSecret,
        expiresIn: this.jwtConfiguration.refreshTokenExpiresIn,
      });

      return { accessToken, refreshToken };
    } catch (error: any) {
      this.logger.error('[Token generation error]: ' + error?.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }
}
