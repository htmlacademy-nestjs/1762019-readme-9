import { Module } from '@nestjs/common';

import { BffConfigModule } from '@project/bff-config';

@Module({
  imports: [BffConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
