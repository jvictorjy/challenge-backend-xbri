import { UpdateStatusOrderDto } from '@app/order/dto';
import { Inject, Injectable } from '@nestjs/common';
import { OrderDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/OrderDITokens';
import { OrderRepository } from '@app/order/repositories';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { OrderResponseDto } from '@app/order/dto/order-response.dto';

@Injectable()
export class UpdateStatusOrderUseCase {
  constructor(
    @Inject(OrderDITokens.OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    id: string,
    payload: UpdateStatusOrderDto,
  ): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findById(id);

      if (!order) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Order not found`,
        });
      }
      console.log(payload);

      return this.orderRepository.updateStatus(id, payload);
    } catch (error) {
      throw Exception.new({
        code: error.code,
        overrideMessage: error.message,
      });
    }
  }
}
