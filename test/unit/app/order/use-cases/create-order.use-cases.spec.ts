import { TireRepository } from '@app/tire/repositories';
import { UserRepository } from '@app/users/repositories';
import { Test, TestingModule } from '@nestjs/testing';
import { TireDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/TireDITokens';
import { UsersDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/UsersDITokens';
import { CreateOrderUseCase } from '@app/order/use-cases';
import { OrderRepository } from '@app/order/repositories';
import { OrderDITokens } from '@app/@common/infrastructure/adapters/persistente/database/prisma/di/OrderDITokens';
import { CreateOrderDtoRequest } from '@app/order/dto';
import { OrderStatus } from '@app/order/enum';
import { UserType } from '@app/users/enum';

describe('CreateOrderUseCases', () => {
  let useCase: CreateOrderUseCase;
  let tireRepository: TireRepository;
  let userRepository: UserRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUseCase,
        {
          provide: TireDITokens.TireRepository,
          useValue: {
            findOne: jest.fn(),
            updateStock: jest.fn(),
          },
        },
        {
          provide: UsersDITokens.UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: OrderDITokens.OrderRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    tireRepository = module.get<TireRepository>(TireDITokens.TireRepository);
    userRepository = module.get<UserRepository>(UsersDITokens.UserRepository);
    orderRepository = module.get<OrderRepository>(
      OrderDITokens.OrderRepository,
    );
  });

  it('should create an order successfully', async () => {
    const dto: CreateOrderDtoRequest = {
      buyer_id: 'uuid',
      tire_id: 'tire_uuid',
      quantity: 2,
      price_total: 10,
      status: OrderStatus.PAID,
    };
    const buyer = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.BUYER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const tire = {
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

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(buyer);
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(tire);
    jest.spyOn(orderRepository, 'create').mockResolvedValue(undefined);
    jest.spyOn(tireRepository, 'updateStock').mockResolvedValue(undefined);

    await expect(useCase.execute(dto)).resolves.toBeUndefined();
    expect(userRepository.findOne).toHaveBeenCalledWith('uuid');
    expect(tireRepository.findOne).toHaveBeenCalledWith('tire_uuid');
    expect(orderRepository.create).toHaveBeenCalledWith(dto);
    expect(tireRepository.updateStock).toHaveBeenCalledWith('tire_uuid', 2);
  });

  it('should throw an error if buyer is not found', async () => {
    const dto: CreateOrderDtoRequest = {
      buyer_id: 'uuid',
      tire_id: 'tire_uuid',
      quantity: 2,
      price_total: 10,
      status: OrderStatus.PAID,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrowError('Buyer not found');
  });

  it('should throw an error if tire is not found', async () => {
    const dto: CreateOrderDtoRequest = {
      buyer_id: 'uuid',
      tire_id: 'tire_uuid',
      quantity: 2,
      price_total: 10,
      status: OrderStatus.PAID,
    };
    const buyer = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.BUYER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(buyer);
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrowError('Tire not found');
  });

  it('should throw an error if insufficient stock', async () => {
    const dto: CreateOrderDtoRequest = {
      buyer_id: 'uuid',
      tire_id: 'tire_uuid',
      quantity: 2,
      price_total: 10,
      status: OrderStatus.PAID,
    };
    const buyer = {
      id: 'uuid',
      name: 'John Doe',
      email: 'teste@test.com',
      password: '12345678',
      user_type: UserType.BUYER,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    const tire = {
      id: 'uuid',
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity_available: 1,
      size: '225/220R17',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(buyer);
    jest.spyOn(tireRepository, 'findOne').mockResolvedValue(tire);

    await expect(useCase.execute(dto)).rejects.toThrowError(
      'Insufficient stock',
    );
  });
});
