import { CreateUserDtoInput } from '@app/users/dto';
import { Users } from '@prisma/client';

export abstract class UserRepository {
  abstract create(data: CreateUserDtoInput): Promise<void>;
  abstract findOne(id: string): Promise<Users>;
  abstract findByEmail(email: string): Promise<Users>;
  abstract findSeller(id: string): Promise<Users>;
}
