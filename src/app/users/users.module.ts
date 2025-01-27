import { Module, Provider } from '@nestjs/common';
import { CreateUserController } from '@app/users/controllers';
import { CreateUserUseCase } from '@app/users/use-cases';
import { DatabaseModule } from '@app/@common/infrastructure/adapters/persistente/database/database.module';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '@app/@common/infrastructure/adapters/persistente/database/prisma/repositories';
import { PrismaDatabaseAdapter } from '@app/@common/infrastructure/adapters/persistente/database/prisma/prisma-database.adapter';
import { CryptographyModule } from '@app/@common/infrastructure/adapters/cryptography/cryptography.module';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';
import { BcryptHasher } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/bcrypt-hasher';

const persistenceProviders: Provider[] = [
  {
    provide: UsersDITokens.UserRepository,
    useFactory: (prisma: PrismaClient) => new PrismaUserRepository(prisma),
    inject: [PrismaDatabaseAdapter],
  },
  {
    provide: BcryptDIToken.HashGenerator,
    useFactory: (hasher: BcryptHasher) => hasher,
    inject: [BcryptHasher],
  },
];

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [...persistenceProviders, CreateUserUseCase],
})
export class UsersModule {}
