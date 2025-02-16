import { TireRepository } from '@app/tire/repositories';
import { CreateTireDtoRequest } from '@app/tire/dto';
import { Prisma, PrismaClient } from '@prisma/client';
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
}
