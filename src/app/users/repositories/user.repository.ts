import { CreateUserDtoInput } from '@app/users/dto';
import { Users } from '@prisma/client';

export abstract class UserRepository {
  abstract create(data: CreateUserDtoInput): Promise<void>;
  abstract update(id: string, data: any): Promise<any>;
  abstract delete(id: string): Promise<any>;
  abstract findAll(): Promise<Users[]>;
  abstract findOne(id: string): Promise<Users>;
  abstract findByEmail(email: string): Promise<Users>;
}
