import { Module, Provider } from '@nestjs/common';

import { PrismaDatabaseAdapter } from './prisma/prisma-database.adapter';
import { UserRepository } from "@app/users/repositories";
import { PrismaUserRepository } from "@app/@common/infrastructure/adapters/persistente/database/prisma/repositories";
import { PrismaClient } from '@prisma/client';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';



@Module({
  providers: [
    PrismaDatabaseAdapter,
  ],
  exports: [PrismaDatabaseAdapter],
})
export class DatabaseModule {}
