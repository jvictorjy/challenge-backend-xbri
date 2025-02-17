import { Test, TestingModule } from '@nestjs/testing';
import { CreateTireController } from '@app/tire/controllers/create-tire.controller';
import { CreateTireUseCases } from '@app/tire/use-cases';
import { CreateTireDtoRequest } from '@app/tire/dto';

describe('CreateTireController', () => {
  let controller: CreateTireController;
  let useCase: CreateTireUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTireController],
      providers: [
        {
          provide: CreateTireUseCases,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateTireController>(CreateTireController);
    useCase = module.get<CreateTireUseCases>(CreateTireUseCases);
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

    const result = await controller.execute(dto);

    expect(result).toEqual(undefined);
    expect(useCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should return unprocessable entity for unprocessable data', async () => {
    const dto: CreateTireDtoRequest = {
      /* unprocessable DTO properties */
    };
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Unprocessable Entity'));

    await expect(controller.execute(dto)).rejects.toThrowError(
      'Unprocessable Entity',
    );
  });
});
