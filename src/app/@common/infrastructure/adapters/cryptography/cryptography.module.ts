import { Module } from '@nestjs/common';
import { BcryptHasher } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/bcrypt-hasher';

@Module({
  providers: [BcryptHasher],
  exports: [BcryptHasher],
})
export class CryptographyModule {}
