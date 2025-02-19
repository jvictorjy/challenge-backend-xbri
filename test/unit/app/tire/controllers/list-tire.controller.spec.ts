import { ListTireController } from '@app/tire/controllers/list-tire.controller';
import { ListTireUseCase } from '@app/tire/use-cases';
import { Test, TestingModule } from '@nestjs/testing';
import { Tire } from '@prisma/client';

describe('ListTireController', () => {
  let controller: ListTireController;
  let useCase: ListTireUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListTireController],
      providers: [
        {
          provide: ListTireUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ListTireController>(ListTireController);
    useCase = module.get<ListTireUseCase>(ListTireUseCase);
  });

  it('should list tires successfully', async () => {
    const tires: Tire[] = [
      { id: '1', name: 'Tire 1', price: 100, stock: 10 },
      { id: '2', name: 'Tire 2', price: 150, stock: 5 },
    ];
    jest.spyOn(useCase, 'execute').mockResolvedValue(tires);

    const result = await controller.handle();

    expect(result).toEqual(tires);
    expect(useCase.execute).toHaveBeenCalled();
  });

  it('should return an empty array if no tires are found', async () => {
    jest.spyOn(useCase, 'execute').mockResolvedValue([]);

    const result = await controller.handle();

    expect(result).toEqual([]);
    expect(useCase.execute).toHaveBeenCalled();
  });

  it('should throw an error if use case execution fails', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Internal Server Error'));

    await expect(controller.handle()).rejects.toThrowError(
      'Internal Server Error',
    );
  });
});
