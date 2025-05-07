import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
