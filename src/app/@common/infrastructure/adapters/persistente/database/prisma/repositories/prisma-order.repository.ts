import { OrderRepository } from '@app/order/repositories';
import { CreateOrderDtoRequest, UpdateStatusOrderDto } from '@app/order/dto';
import { Order, Prisma, PrismaClient } from '@prisma/client';
import { $Enums } from '.prisma/client';
import { OrderResponseDto } from '@app/order/dto/order-response.dto';

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

  async updateStatus(
    id: string,
    payload: UpdateStatusOrderDto,
  ): Promise<Order> {
    const data: Prisma.OrderUpdateInput = {
      status: $Enums.Status[payload.status],
    };
    console.log(data);

    return this.prisma.order.update({
      where: {
        id,
      },
      data,
    });
  }

  async findById(id: string): Promise<OrderResponseDto> {
    return this.prisma.order.findFirst({
      where: {
        id,
      },
    });
  }
}
