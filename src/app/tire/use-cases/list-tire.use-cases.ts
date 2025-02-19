import { Inject, Injectable } from '@nestjs/common';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { TireRepository } from '@app/tire/repositories';
import { Exception } from '@core/@shared/domain/exception/Exception';

@Injectable()
export class ListTireUseCase {
  constructor(
    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,
  ) {}

  async execute() {
    try {
      return await this.tireRepository.findAll();
    } catch (error) {
      throw Exception.new({
        code: error.code,
        overrideMessage: error.message,
      });
    }
  }
}
