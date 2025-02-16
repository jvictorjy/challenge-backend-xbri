import { CreateOrderDtoRequest } from '@app/order/dto';

export abstract class OrderRepository {
  abstract create(payload: CreateOrderDtoRequest): Promise<void>;
  // abstract update(id: string, payload: CreateOrderDtoRequest): Promise<Order>;
  // abstract delete(id: string): Promise<void>;
  // abstract findAll(): Promise<Order[]>;
  // abstract findOne(id: string): Promise<Order>;
}
