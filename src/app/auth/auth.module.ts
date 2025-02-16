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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtEncrypter } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/jwt-encrypter';
import { AuthServerConfig } from '@core/@shared/infrastructure/config/env';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard, JwtStrategy } from '@app/auth/infra';

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
    inject: [JwtService],
  },
];

const providers: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: JwtGuard,
  },
];

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        const privateKey = AuthServerConfig.PRIVATE_KEY;
        const publicKey = AuthServerConfig.PUBLIC_KEY;

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
    CryptographyModule,
  ],
  controllers: [SignInController],
  providers: [
    ...persistenceProviders,
    ...providers,
    AuthenticateUseCase,
    JwtStrategy,
  ],
})
export class AuthModule {}
