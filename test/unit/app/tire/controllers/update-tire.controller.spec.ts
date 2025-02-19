import { UpdateTireController } from '@app/tire/controllers/update-tire.controller';
import { UpdateTireUseCases } from '@app/tire/use-cases';
import { Test, TestingModule } from '@nestjs/testing';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { UUIDSchemaValidation } from '@app/@common/application/validations';
import { UpdateTireRequestDTO } from '@app/tire/dto';
import { UpdateTireSchemaValidation } from '@app/tire/validations';

describe('UpdateTireController', () => {
  let controller: UpdateTireController;
  let useCase: UpdateTireUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateTireController],
      providers: [
        {
          provide: UpdateTireUseCases,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateTireController>(UpdateTireController);
    useCase = module.get<UpdateTireUseCases>(UpdateTireUseCases);
  });

  it('should update a tire successfully', async () => {
    const id = 'valid_uuid';
    const payload: UpdateTireRequestDTO = {
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.handle(id, payload);

    expect(result).toBeUndefined();
    expect(useCase.execute).toHaveBeenCalledWith(id, payload);
  });

  it('should throw an error if tire is not found', async () => {
    const id = 'invalid_uuid';
    const payload: UpdateTireRequestDTO = {
      seller_id: 'uuid',
      brand: 'Michelin',
      name: 'Pilot Sport 4',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Tire not found'));

    await expect(controller.handle(id, payload)).rejects.toThrowError(
      'Tire not found',
    );
  });

  it('should throw an error if id is invalid', async () => {
    const id = 'invalid_uuid';

    const schemaValidation = new UUIDSchemaValidation();
    const validationPipe = new ZodValidationPipe(schemaValidation);

    await expect(
      validationPipe.transform(id, { type: 'param' }),
    ).rejects.toThrowError();
  });

  it('should throw an error if payload is invalid', async () => {
    const payload: any = {
      name: '',
      seller_id: 'uuid',
      brand: 'Michelin',
      price: 100,
      quantity: 10,
      size: '225/220R17',
    };
    const schemaValidation = new UpdateTireSchemaValidation();
    const validationPipe = new ZodValidationPipe(schemaValidation);

    await expect(
      validationPipe.transform(payload, { type: 'body' }),
    ).rejects.toThrowError();
  });
});
