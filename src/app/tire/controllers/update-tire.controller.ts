import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateTireUseCases } from '@app/tire/use-cases';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { UpdateTireRequestDTO } from '@app/tire/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { UUIDSchemaValidation } from '@app/@common/application/validations';
import { UpdateTireSchemaValidation } from '@app/tire/validations';

@Controller('tire')
@ApiTags('Tire')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class UpdateTireController {
  constructor(private readonly updateTireUseCase: UpdateTireUseCases) {}

  @Put(':id')
  async updateTire(
    @Param('id', new ZodValidationPipe(new UUIDSchemaValidation())) id: string,
    @Body(new ZodValidationPipe(new UpdateTireSchemaValidation()))
    payload: UpdateTireRequestDTO,
  ): Promise<void> {
    return this.updateTireUseCase.execute(id, payload);
  }
}
