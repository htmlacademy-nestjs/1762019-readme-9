# Демонстрация чтения конфигов из DI

## Демо: чтение конфига из DI с помощью @Inject
```typescript
// file: authentication.service.ts:
import dayjs from 'dayjs';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

import { UserRole } from '@project/core';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { dbConfig } from '@project/user-config';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER } from './authentication.constants';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(dbConfig.KEY)
    private readonly dbConfiguration: ConfigType<typeof dbConfig>
  ) {
    console.log({
      host: this.dbConfiguration.host,
      user: this.dbConfiguration.user,
    });
  }
}
```

## Демо: чтение конфига с помощью ConfigService
```typescript
import dayjs from 'dayjs';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRole } from '@project/core';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER } from './authentication.constants';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService
  ) {
    console.log({
      host: this.configService.get('db.host'),
      user: this.configService.get('db.user'),
    });
  }
}
```


## Добавление значений в ConfigService:

```typescript
// file: @project/user-config => './src/configs/mongo.config':
import { ConfigType, registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

import { MongoConfiguration } from '@project/configs';

const DEFAULT_MONGO_PORT = 27017;

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToInstance(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT
      ? parseInt(process.env.MONGO_PORT, 10)
      : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await config.validate();

  return config;
}

// Будет внедряться в @Inject(dbConfig.KEY)
export const dbConfig = registerAs(
  'db',
  async (): Promise<ConfigType<typeof getDbConfig>> => {
    return getDbConfig();
  }
);
```

```typescript
// file: @project/user-config => './src/configs/app.config':
import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

export const applicationConfig = registerAs('application', getConfig);
```

```typescript
// file: @project/user-config => ./src/user-config.module.ts: 
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { applicationConfig } from './configs/app.config';
import { mongoConfig } from './configs/mongo.config';

const ENV_USERS_FILE_PATH = 'apps/user/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class UserConfigModule {}

```
