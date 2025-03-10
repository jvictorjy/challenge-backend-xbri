import { CreateTireDtoRequest } from '@app/tire/dto';
import { Tire } from '@prisma/client';

export abstract class TireRepository {
  abstract create(payload: CreateTireDtoRequest): Promise<void>;
  abstract update(id: string, payload: CreateTireDtoRequest): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Tire[]>;
  abstract updateStock(id: string, quantity: number): Promise<void>;
  abstract findOne(id: string): Promise<Tire>;
}
