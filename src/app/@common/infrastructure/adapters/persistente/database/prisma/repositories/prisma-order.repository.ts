import { OrderRepository } from '@app/order/repositories';
import { CreateOrderDtoRequest } from '@app/order/dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { $Enums } from '.prisma/client';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaClient) {}

  async create(payload: CreateOrderDtoRequest): Promise<void> {
    try {
      const data: Prisma.OrderUncheckedCreateInput = {
        tire_id: payload.tire_id,
        buyer_id: payload.buyer_id,
        quantity: payload.quantity,
        price_total: payload.price_total,
        status: $Enums.Status[payload.status],
      };

      await this.prisma.order.create({ data });
    } catch (error) {
      console.log(error);
    }
  }
}
