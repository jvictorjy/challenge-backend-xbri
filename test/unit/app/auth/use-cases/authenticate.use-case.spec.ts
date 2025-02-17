import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateUseCase } from '@app/auth/use-cases/authenticate.use-case';
import { UserRepository } from '@app/users/repositories';
import { HashComparer, Encrypter } from '@app/@common/application/cryptography';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';
import { UserType } from '@app/users/enum';

describe('AuthenticateUseCase', () => {
  let useCase: AuthenticateUseCase;
  let userRepository: UserRepository;
  let hashComparer: HashComparer;
  let encrypter: Encrypter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUseCase,
        {
          provide: UsersDITokens.UserRepository,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: BcryptDIToken.HashComparer,
          useValue: {
            compare: jest.fn(),
          },
        },
        {
          provide: BcryptDIToken.Encrypter,
          useValue: {
            encrypt: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<AuthenticateUseCase>(AuthenticateUseCase);
    userRepository = module.get<UserRepository>(UsersDITokens.UserRepository);
    hashComparer = module.get<HashComparer>(BcryptDIToken.HashComparer);
    encrypter = module.get<Encrypter>(BcryptDIToken.Encrypter);
  });

  it('should authenticate successfully with valid credentials', async () => {
    const data = { email: 'test@example.com', password: 'password123' };
    const user = {
      id: 'uuid',
      name: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const accessToken = 'validToken';

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(hashComparer, 'compare').mockResolvedValue(true);
    jest.spyOn(encrypter, 'encrypt').mockResolvedValue(accessToken);

    const result = await useCase.execute(data);

    expect(result).toEqual({ accessToken });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(hashComparer.compare).toHaveBeenCalledWith(
      data.password,
      user.password,
    );
    expect(encrypter.encrypt).toHaveBeenCalledWith({ sub: user.id.toString() });
  });

  it('should throw an error if user is not found', async () => {
    const data = { email: 'test@example.com', password: 'password123' };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.UNAUTHORIZED.code,
        overrideMessage: 'User or password invalid',
      }),
    );
  });

  it('should throw an error if password is invalid', async () => {
    const data = { email: 'test@example.com', password: 'password123' };
    const user = {
      id: 'uuid',
      name: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(hashComparer, 'compare').mockResolvedValue(false);

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.BAD_REQUEST.code,
        overrideMessage: 'User or password invalid',
      }),
    );
  });

  it('should throw an error if encryption fails', async () => {
    const data = { email: 'test@example.com', password: 'password123' };
    const user = {
      id: 'uuid',
      name: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(hashComparer, 'compare').mockResolvedValue(true);
    jest
      .spyOn(encrypter, 'encrypt')
      .mockRejectedValue(new Error('Encryption failed'));

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.BAD_REQUEST.code,
        overrideMessage: 'Encryption failed',
      }),
    );
  });
});
