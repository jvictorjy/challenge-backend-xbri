import { Inject, Injectable } from '@nestjs/common';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { TireRepository } from '@app/tire/repositories';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { UserRepository } from '@app/users/repositories';

@Injectable()
export class UpdateTireUseCases {
  constructor(
    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,

    @Inject(UsersDITokens.UserRepository)
    private readonly sellerRepository: UserRepository,
  ) {}

  async execute(id, payload): Promise<void> {
    try {
      const seller = await this.sellerRepository.findSeller(payload.seller_id);

      if (!seller) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Seller not found`,
        });
      }

      const tire = await this.tireRepository.findOne(id);

      if (!tire) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Tire not found`,
        });
      }

      await this.tireRepository.update(id, payload);
    } catch (error) {
      throw error;
    }
  }
}
