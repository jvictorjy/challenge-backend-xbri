import { Inject, Injectable } from '@nestjs/common';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { TireRepository } from '@app/tire/repositories';

@Injectable()
export class ListTireUseCase {
  constructor(
    @Inject(TireDITokens.TireRepository)
    private readonly tireRepository: TireRepository,
  ) {}

  async execute() {
    return await this.tireRepository.findAll();
  }
}
