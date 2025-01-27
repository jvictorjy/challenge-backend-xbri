import { Users } from '@prisma/client';

export abstract class AuthRepository {
  abstract findUserByEmail(email: string): Promise<Users>;
}
