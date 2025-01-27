import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '@app/@common/infrastructure/adapters/persistente/database/database.module';
import { CryptographyModule } from '@app/@common/infrastructure/adapters/cryptography/cryptography.module';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '@app/@common/infrastructure/adapters/persistente/database/prisma/repositories';
import { PrismaDatabaseAdapter } from '@app/@common/infrastructure/adapters/persistente/database/prisma/prisma-database.adapter';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';
import { BcryptHasher } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/bcrypt-hasher';
import { AuthenticateUseCase } from '@app/auth/use-cases';
import { SignInController } from '@app/auth/controllers';
import { JwtService } from '@nestjs/jwt';
import { JwtEncrypter } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/jwt-encrypter';

const persistenceProviders: Provider[] = [
  {
    provide: UsersDITokens.UserRepository,
    useFactory: (prisma: PrismaClient) => new PrismaUserRepository(prisma),
    inject: [PrismaDatabaseAdapter],
  },
  {
    provide: BcryptDIToken.HashComparer,
    useFactory: (hasher: BcryptHasher) => hasher,
    inject: [BcryptHasher],
  },
  {
    provide: BcryptDIToken.Encrypter,
    useFactory: (jwt: JwtService) => new JwtEncrypter(jwt),
    inject: [JwtEncrypter],
  },
];

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SignInController],
  providers: [...persistenceProviders, AuthenticateUseCase],
})
export class AuthModule {}
