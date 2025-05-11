import dayjs from 'dayjs';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRole } from '@project/core';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';

import { dbConfig } from '@project/user-config';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER } from './authentication.constants';
import { LoginUserDto } from '../dto/login-user.dto';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {
    const { host, user } = this.databaseConfig;

    console.log({ host, user });
  }

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
}
