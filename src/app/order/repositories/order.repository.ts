import { CreateOrderDtoRequest, UpdateStatusOrderDto } from '@app/order/dto';
import { Order } from '@prisma/client';
import { OrderResponseDto } from '@app/order/dto/order-response.dto';

export abstract class OrderRepository {
  abstract create(payload: CreateOrderDtoRequest): Promise<void>;
  abstract updateStatus(
    id: string,
    payload: UpdateStatusOrderDto,
  ): Promise<Order>;
  abstract findById(id: string): Promise<OrderResponseDto>;
  // abstract delete(id: string): Promise<void>;
  // abstract findAll(): Promise<Order[]>;
}
