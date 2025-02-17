import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderController } from '@app/order/controllers/create-order.controller';
import { CreateOrderUseCase } from '@app/order/use-cases';
import { CreateOrderDtoRequest } from '@app/order/dto';
import { OrderStatus } from '@app/order/enum';

describe('CreateOrderController', () => {
  let controller: CreateOrderController;
  let useCase: CreateOrderUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateOrderController],
      providers: [
        {
          provide: CreateOrderUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateOrderController>(CreateOrderController);
    useCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
  });

  it('should create an order successfully', async () => {
    const dto: CreateOrderDtoRequest = {
      buyer_id: 'buyer_id',
      tire_id: 'tire_id',
      quantity: 1,
      price_total: 10,
      status: OrderStatus.PAID,
    };
    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.createOrder(dto);

    expect(result).toBeUndefined();
    expect(useCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should return unprocessable entity for unprocessable data', async () => {
    const dto: CreateOrderDtoRequest = {
      /* unprocessable DTO properties */
    };
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unprocessable Entity'));

    await expect(controller.createOrder(dto)).rejects.toThrowError(
      'Unprocessable Entity',
    );
  });

  it('should return not found if order creation fails due to missing resources', async () => {
    const dto: CreateOrderDtoRequest = {
      /* valid DTO properties */
    };
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error('Not Found'));

    await expect(controller.createOrder(dto)).rejects.toThrowError('Not Found');
  });
});
