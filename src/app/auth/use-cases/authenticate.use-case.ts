import { Encrypter, HashComparer } from '@app/@common/application/cryptography';
import { UserRepository } from '@app/users/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { SignInDto, SignInResponseDto } from '@app/auth/dto';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';

@Injectable()
export class AuthenticateUseCase {
  constructor(
    @Inject(UsersDITokens.UserRepository)
    private readonly userRepository: UserRepository,

    @Inject(BcryptDIToken.HashComparer)
    private readonly hashComparer: HashComparer,

    @Inject(BcryptDIToken.Encrypter)
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, password }: SignInDto): Promise<SignInResponseDto> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw Exception.new({
          code: Code.NOT_FOUND.code,
          overrideMessage: `User not found`,
        });
      }

      const isPasswordValid = await this.hashComparer.compare(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw Exception.new({
          code: Code.BAD_REQUEST.code,
          overrideMessage: `User or password invalid`,
        });
      }

      const accessToken = await this.encrypter.encrypt({
        sub: user.id.toString(),
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw Exception.new({
        code: Code.BAD_REQUEST.code,
        overrideMessage: error.message,
      });
    }
  }
}
