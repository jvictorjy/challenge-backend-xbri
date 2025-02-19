import { DeleteTireController } from '@app/tire/controllers/delete-tire.controller';
import { DeleteTireUseCase } from '@app/tire/use-cases';
import { Test, TestingModule } from '@nestjs/testing';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { UUIDSchemaValidation } from '@app/@common/application/validations';

describe('DeleteTireController', () => {
  let controller: DeleteTireController;
  let useCase: DeleteTireUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteTireController],
      providers: [
        {
          provide: DeleteTireUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteTireController>(DeleteTireController);
    useCase = module.get<DeleteTireUseCase>(DeleteTireUseCase);
  });

  it('should delete a tire successfully', async () => {
    const id = 'valid_uuid';
    jest.spyOn(useCase, 'execute').mockResolvedValue(undefined);

    const result = await controller.handle(id);

    expect(result).toBeUndefined();
    expect(useCase.execute).toHaveBeenCalledWith(id);
  });

  it('should throw an error if tire is not found', async () => {
    const id = 'invalid_uuid';
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Tire not found'));

    await expect(controller.handle(id)).rejects.toThrowError('Tire not found');
  });

  it('should throw an error if id is invalid', async () => {
    const id = 'invalid_uuid';
    const schemaValidation = new UUIDSchemaValidation();
    const validationPipe = new ZodValidationPipe(schemaValidation);

    await expect(validationPipe.transform(id)).rejects.toThrowError();
  });
});
