import { CreateTireDtoRequest } from '@app/tire/dto';

export abstract class TireRepository {
  abstract create(payload: CreateTireDtoRequest): Promise<void>;
  // abstract update(id: string, payload: CreateTireDtoRequest): Promise<Tire>;
  // abstract delete(id: string): Promise<void>;
  // abstract findAll(): Promise<Tire[]>;
  // abstract findOne(id: string): Promise<Tire>;
}
