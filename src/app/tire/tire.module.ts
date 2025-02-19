import { Module, Provider } from '@nestjs/common';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '@app/@common/infrastructure/adapters/persistente/database/prisma/repositories';
import { PrismaDatabaseAdapter } from '@app/@common/infrastructure/adapters/persistente/database/prisma/prisma-database.adapter';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { DatabaseModule } from '@app/@common/infrastructure/adapters/persistente/database/database.module';
import {
  CreateTireController,
  UpdateTireController,
} from '@app/tire/controllers';
import {
  CreateTireUseCases,
  DeleteTireUseCase,
  ListTireUseCase,
  UpdateTireUseCases,
} from '@app/tire/use-cases';
import { PrismaTireRepository } from '@app/@common/infrastructure/adapters/persistente/database/prisma/repositories/prisma-tire.repository';
import { DeleteTireController } from '@app/tire/controllers/delete-tire.controller';
import { ListTireController } from '@app/tire/controllers/list-tire.controller';

const persistenceProviders: Provider[] = [
  {
    provide: UsersDITokens.UserRepository,
    useFactory: (prisma: PrismaClient) => new PrismaUserRepository(prisma),
    inject: [PrismaDatabaseAdapter],
  },
  {
    provide: TireDITokens.TireRepository,
    useFactory: (prisma: PrismaClient) => new PrismaTireRepository(prisma),
    inject: [PrismaDatabaseAdapter],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTireController,
    DeleteTireController,
    UpdateTireController,
    ListTireController,
  ],
  providers: [
    ...persistenceProviders,
    CreateTireUseCases,
    DeleteTireUseCase,
    UpdateTireUseCases,
    ListTireUseCase,
  ],
})
export class TireModule {}
