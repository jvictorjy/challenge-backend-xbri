import { CreateUserUseCase } from '@app/users/use-cases';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { CreateUserDtoInput } from '@app/users/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { CreateUserSchemaValidation } from '@app/users/validations/create-user.schema.validation';

@Controller('users')
@ApiTags('Users')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiBody({ type: CreateUserDtoInput })
  async execute(
    @Body(new ZodValidationPipe(new CreateUserSchemaValidation()))
    data: CreateUserDtoInput,
  ) {
    return this.useCase.execute(data);
  }
}
