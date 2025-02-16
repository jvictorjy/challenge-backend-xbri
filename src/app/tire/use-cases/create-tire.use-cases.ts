import { TireRepository } from '@app/tire/repositories';
import { CreateTireDtoRequest } from '@app/tire/dto';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { Injectable, Inject } from '@nestjs/common';

import { UserRepository } from '@app/users/repositories';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';

@Injectable()
export class CreateTireUseCases {
  constructor(
    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,

    @Inject(UsersDITokens.UserRepository)
    private readonly sellerRepository: UserRepository,
  ) {}

  async execute(payload: CreateTireDtoRequest): Promise<void> {
    try {
      const seller = await this.sellerRepository.findOne(payload.seller_id);

      if (!seller) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Seller not found`,
        });
      }

      const data = {
        ...payload,
        seller: seller,
      };

      await this.tireRepository.create(data);
    } catch (error) {
      throw Exception.new({
        code: error.code,
        overrideMessage: error.message,
      });
    }
  }
}
