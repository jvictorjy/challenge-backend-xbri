import { OrderRepository } from '@app/order/repositories';
import { CreateOrderDtoRequest } from '@app/order/dto';
import { Inject, Injectable } from '@nestjs/common';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { UserRepository } from '@app/users/repositories';
import { TireRepository } from '@app/tire/repositories';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { OrderDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/OrderDITokens';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(OrderDITokens.OrderRepository)
    private readonly orderRepository: OrderRepository,

    @Inject(UsersDITokens.UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,
  ) {}

  async execute(payload: CreateOrderDtoRequest): Promise<void> {
    try {
      const buyer = await this.userRepository.findOne(payload.buyer_id);

      if (!buyer) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Buyer not found`,
        });
      }

      const tire = await this.tireRepository.findOne(payload.tire_id);

      if (!tire) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Tire not found`,
        });
      }

      if (tire.quantity_available < payload.quantity) {
        throw Exception.new({
          code: Code.BAD_REQUEST.code,
          overrideMessage: `Insufficient stock`,
        });
      }

      await this.orderRepository.create(payload);

      await this.tireRepository.updateStock(payload.tire_id, payload.quantity);
    } catch (error) {
      throw Exception.new({
        code: error.code,
        overrideMessage: error.message,
      });
    }
  }
}
