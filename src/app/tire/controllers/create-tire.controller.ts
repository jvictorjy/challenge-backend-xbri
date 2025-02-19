import { CreateTireUseCases } from '@app/tire/use-cases';
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
import { CreateTireDtoRequest } from '@app/tire/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { CreateTireSchemaValidation } from '@app/tire/validations';

@Controller('tire')
@ApiTags('Tire')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class CreateTireController {
  constructor(private readonly useCase: CreateTireUseCases) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tire created',
  })
  @ApiBody({ type: CreateTireDtoRequest })
  async handle(
    @Body(new ZodValidationPipe(new CreateTireSchemaValidation()))
    data: CreateTireDtoRequest,
  ) {
    return this.useCase.execute(data);
  }
}
