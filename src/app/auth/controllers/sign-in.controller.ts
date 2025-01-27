import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { AuthenticateUseCase } from '@app/auth/use-cases';
import { SignInDto, SignInResponseDto } from '@app/auth/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { SignInSchemaValidation } from '@app/auth/validations';

@Controller('auth')
@ApiTags('Auth')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class SignInController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authentication successful',
  })
  @ApiBody({ type: SignInDto })
  async execute(
    @Body(new ZodValidationPipe(new SignInSchemaValidation()))
    data: SignInDto,
  ): Promise<SignInResponseDto> {
    return this.authenticateUseCase.execute(data);
  }
}
