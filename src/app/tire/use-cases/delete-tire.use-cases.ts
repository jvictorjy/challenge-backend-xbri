import { Inject, Injectable } from '@nestjs/common';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { TireRepository } from '@app/tire/repositories';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';

@Injectable()
export class DeleteTireUseCase {
  constructor(
    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const tire = await this.tireRepository.findOne(id);

      if (!tire) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `Tire not found`,
        });
      }

      await this.tireRepository.delete(id);
    } catch (error) {
      throw Exception.new({
        code: error.code,
        overrideMessage: error.message,
      });
    }
  }
}
