import { Module } from '@nestjs/common';

import { FileUploaderModule } from '@project/file-uploader';
import { FileVaultConfigModule } from '@project/file-vault-config';

@Module({
  imports: [FileVaultConfigModule, FileUploaderModule],
})
export class AppModule {}
