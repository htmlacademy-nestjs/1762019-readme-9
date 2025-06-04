import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { UserConfigModule } from '@project/user-config';
import { UserNotificationModule } from '@project/user-notification';
import { getMongooseOptions } from '@project/configs';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    UserConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserNotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
