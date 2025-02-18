import { TireRepository } from '@app/tire/repositories';
import { CreateTireDtoRequest } from '@app/tire/dto';
import { Prisma, PrismaClient, Tire } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTireRepository implements TireRepository {
  constructor(private prisma: PrismaClient) {}

  async create(payload: CreateTireDtoRequest): Promise<void> {
    try {
      const data: Prisma.TireUncheckedCreateInput = {
        name: payload.name,
        brand: payload.brand,
        size: payload.size,
        price: payload.price,
        quantity_available: payload.quantity,
        seller_id: payload.seller_id,
      };

      await this.prisma.tire.create({ data });
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, payload: CreateTireDtoRequest): Promise<void> {
    await this.prisma.tire.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        brand: payload.brand,
        size: payload.size,
        price: payload.price,
        quantity_available: payload.quantity,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tire.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async findAll(): Promise<Tire[]> {
    return this.prisma.tire.findMany();
  }

  async updateStock(id: string, quantity: number): Promise<void> {
    await this.prisma.tire.update({
      where: {
        id,
      },
      data: {
        quantity_available: {
          decrement: quantity,
        },
      },
    });
  }

  async findOne(id: string): Promise<Tire> {
    return this.prisma.tire.findFirst({
      where: {
        id,
      },
    });
  }
}
