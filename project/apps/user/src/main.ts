import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const GLOBAL_PREFIX = 'api';
const OPEN_API_PATH = 'spec';
const PORT = process.env.PORT || '3000';

const isDevelopment = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);

  if (isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('User-сервис')
      .setDescription('Описание User-сервиса')
      .setVersion('1.0')
      .addTag('user')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(OPEN_API_PATH, app, document);
  }

  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`
  );

  if (isDevelopment) {
    Logger.log(`🚀 Swagger is running on: http://localhost:${PORT}/${OPEN_API_PATH}`);
  }
}

bootstrap();
