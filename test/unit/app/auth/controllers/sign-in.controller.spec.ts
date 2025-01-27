import { Test, TestingModule } from '@nestjs/testing';
import { SignInController } from '@app/auth/controllers/sign-in.controller';
import { AuthenticateUseCase } from '@app/auth/use-cases';
import { SignInDto, SignInResponseDto } from '@app/auth/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { SignInSchemaValidation } from '@app/auth/validations';
import { HttpStatus } from '@nestjs/common';
import { Exception } from '@core/@shared/domain/exception/Exception';
import { Code } from '@core/@shared/domain/error/Code';

describe('SignInController', () => {
  let controller: SignInController;
  let authenticateUseCase: AuthenticateUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignInController],
      providers: [
        {
          provide: AuthenticateUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SignInController>(SignInController);
    authenticateUseCase = module.get<AuthenticateUseCase>(AuthenticateUseCase);
  });

  it('should authenticate successfully with valid credentials', async () => {
    const dto: SignInDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const result: SignInResponseDto = { accessToken: 'validToken' };
    jest.spyOn(authenticateUseCase, 'execute').mockResolvedValue(result);

    const response = await controller.execute(dto);

    expect(response).toEqual(result);
    expect(authenticateUseCase.execute).toHaveBeenCalledWith(dto);
  });
});
