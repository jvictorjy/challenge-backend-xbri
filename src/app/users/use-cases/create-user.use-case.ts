import { UserRepository } from '@app/users/repositories';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { Inject, Injectable } from '@nestjs/common';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { HashGenerator } from '@app/@common/application/cryptography';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UsersDITokens.UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(BcryptDIToken.HashGenerator)
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(data: any): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(data.email);

      if (user) {
        throw Exception.new({
          code: Code.BAD_REQUEST.code,
          overrideMessage: `User already exists`,
        });
      }

      data.password = await this.hashGenerator.hash(data.password);

      await this.userRepository.create(data);
    } catch (error) {
      throw Exception.new({
        code: Code.BAD_REQUEST.code,
      });
    }
  }
}
