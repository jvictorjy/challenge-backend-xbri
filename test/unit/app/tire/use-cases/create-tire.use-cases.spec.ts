import { Test, TestingModule } from '@nestjs/testing';
import { CreateTireUseCases } from '@app/tire/use-cases';
import { CreateTireDtoRequest } from '@app/tire/dto';
import { Tire, Users } from '@prisma/client';
import { UserRepository } from '@app/users/repositories';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { TireRepository } from '@app/tire/repositories';
import { UserType } from '@app/users/enum';

describe('CreateTireUseCases', () => {
  let useCase: CreateTireUseCases;
  let tireRepository: TireRepository;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTireUseCases,
        {
          provide: TireDITokens.TireRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: UsersDITokens.UserRepository,
          useValue: {
            findOne: jest.fn(),
            findSeller: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateTireUseCases>(CreateTireUseCases);
    tireRepository = module.get<TireRepository>(TireDITokens.TireRepository);
    userRepository = module.get<UserRepository>(UsersDITokens.UserRepository);
  });

  it('should create a tire successfully', async () => {
    const dto: CreateTireDtoRequest = {
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    const tire: Tire = {
      id: 'uuid',
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity_available: 10,
      size: '225/220R17',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const user: Users = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.SELLER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(userRepository, 'findSeller').mockResolvedValue(user);
    jest.spyOn(tireRepository, 'create').mockResolvedValue(tire);

    const result = await useCase.execute(dto);

    expect(result).toBeUndefined();
    expect(userRepository.findSeller).toHaveBeenCalledWith('uuid');
    expect(tireRepository.create).toHaveBeenCalledWith({
      ...dto,
      seller: user,
    });
  });

  it('should throw an error if seller is not found', async () => {
    const dto: CreateTireDtoRequest = {
      seller_id: 'invalid_uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrowError('Seller not found');
  });

  it('should throw an error if creation fails', async () => {
    const dto: CreateTireDtoRequest = {
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    const user: Users = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: 'SELLER',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    jest.spyOn(userRepository, 'findSeller').mockResolvedValue(user);
    jest
      .spyOn(tireRepository, 'create')
      .mockRejectedValue(new Error('Status code not found'));

    await expect(useCase.execute(dto)).rejects.toThrowError(
      'Status code not found',
    );
  });

  it('should throw an error for invalid data', async () => {
    const dto: CreateTireDtoRequest = {
      seller_id: '',
      brand: '',
      name: '',
      price: -1,
      quantity: -1,
      size: '',
    };

    await expect(useCase.execute(dto)).rejects.toThrowError();
  });
});
