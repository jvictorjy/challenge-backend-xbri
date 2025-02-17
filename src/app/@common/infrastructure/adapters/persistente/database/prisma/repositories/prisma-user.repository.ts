import { UserRepository } from '@app/users/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Users } from '@prisma/client';
import { CreateUserDtoInput } from '@app/users/dto';
import { $Enums } from '.prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(input: CreateUserDtoInput): Promise<void> {
    const data: Prisma.UsersCreateInput = {
      name: input.name,
      email: input.email,
      password: input.password,
      user_type: $Enums.UserType[input.type],
    };

    await this.prisma.users.create({ data });
  }

  async findOne(id: string): Promise<Users> {
    return this.prisma.users.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.prisma.users.findFirst({
      where: {
        email,
      },
    });
  }

  async findSeller(id: string): Promise<Users> {
    return this.prisma.users.findFirst({
      where: {
        id,
        user_type: $Enums.UserType.SELLER,
      },
    });
  }
}
