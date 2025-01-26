import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@app/users/use-cases/create-user.use-case';
import { UserRepository } from '@app/users/repositories';
import { HashGenerator } from '@app/@common/application/cryptography';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { BcryptDIToken } from '@app/@common/infrastructure/adapters/cryptography/bcryptjs/di/BcryptDIToken';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserRepository;
  let hashGenerator: HashGenerator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UsersDITokens.UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: BcryptDIToken.HashGenerator,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UsersDITokens.UserRepository);
    hashGenerator = module.get<HashGenerator>(BcryptDIToken.HashGenerator);
  });

  it('should create a user successfully', async () => {
    const data = {
      name: 'John Doe',
      email: 'test@example.com',
      password: '12345678',
      type: 'SELLER',
    };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(hashGenerator, 'hash').mockResolvedValue('12345678');
    jest.spyOn(userRepository, 'create').mockResolvedValue(undefined);

    await useCase.execute(data);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(data.email);
    expect(hashGenerator.hash).toHaveBeenCalledWith(data.password);
    expect(userRepository.create).toHaveBeenCalledWith({
      ...data,
      password: '12345678',
    });
  });

  it('should throw an error if user already exists', async () => {
    const data = {
      name: 'John Doe',
      email: 'test@example.com',
      password: '12345678',
      type: 'SELLER',
    };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: 'uuid',
      name: 'John Doe',
      email: 'test@example.com',
      password: '12345678',
      user_type: 'SELLER',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.BAD_REQUEST.code,
        overrideMessage: 'User already exists',
      }),
    );
  });

  it('should throw an error if hashing fails', async () => {
    const data = { email: 'test@example.com', password: 'password123' };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
    jest
      .spyOn(hashGenerator, 'hash')
      .mockRejectedValue(new Error('Bad request'));

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.BAD_REQUEST.code,
      }),
    );
  });

  it('should throw an error if user creation fails', async () => {
    const data = { email: 'test@example.com', password: 'password123' };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(hashGenerator, 'hash').mockResolvedValue('hashedPassword');
    jest
      .spyOn(userRepository, 'create')
      .mockRejectedValue(new Error('Bad request'));

    await expect(useCase.execute(data)).rejects.toThrow(
      Exception.new({
        code: Code.BAD_REQUEST.code,
      }),
    );
  });
});
