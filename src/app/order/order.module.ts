import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '@app/@common/infrastructure/adapters/persistente/database/database.module';
import { CreateOrderController } from '@app/order/controllers/create-order.controller';
import { CreateOrderUseCase } from '@app/order/use-cases';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import {
  PrismaOrderRepository,
  PrismaTireRepository,
  PrismaUserRepository,
} from '@app/@common/infrastructure/adapters/persistente/database/prisma/repositories';
import { PrismaDatabaseAdapter } from '@app/@common/infrastructure/adapters/persistente/database/prisma/prisma-database.adapter';
import { PrismaClient } from '@prisma/client';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { OrderDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/OrderDITokens';
import { UpdateStatusOrderController } from '@app/order/controllers';
import { UpdateStatusOrderUseCase } from '@app/order/use-cases/update-status-order.use-case';

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
  {
    provide: OrderDITokens.OrderRepository,
    useFactory: (prisma: PrismaClient) => new PrismaOrderRepository(prisma),
    inject: [PrismaDatabaseAdapter],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrderController, UpdateStatusOrderController],
  providers: [
    ...persistenceProviders,
    CreateOrderUseCase,
    UpdateStatusOrderUseCase,
  ],
})
export class OrderModule {}
