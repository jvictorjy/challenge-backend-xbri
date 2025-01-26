import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from '@app/users/controllers/create-user.controller';
import { CreateUserUseCase } from '@app/users/use-cases';
import { CreateUserDtoInput } from '@app/users/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { CreateUserSchemaValidation } from '@app/users/validations/create-user.schema.validation';
import { HttpStatus } from '@nestjs/common';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    const dto: CreateUserDtoInput = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '12345678',
      type: 'SELLER',
    };

    const result = {};

    jest.spyOn(useCase, 'execute').mockResolvedValue(result);

    const response = await controller.execute(dto);

    expect(response).toEqual(result);
    expect(useCase.execute).toHaveBeenCalledWith(dto);
  });

  it('should return bad request for invalid data', async () => {
    const dto = {
      name: 1,
      email: 'teste@teste.com',
      password: '12345678',
      type: 'SELLER',
    };
    const validationPipe = new ZodValidationPipe(
      new CreateUserSchemaValidation(),
    );

    try {
      await validationPipe.transform(dto);
    } catch (error) {
      expect(error.getStatus()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    }
  });
});
