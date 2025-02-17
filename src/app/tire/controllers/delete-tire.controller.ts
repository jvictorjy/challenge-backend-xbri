import { DeleteTireUseCase } from '@app/tire/use-cases';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';

@Controller('tire')
@ApiTags('Tire')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class DeleteTireController {
  constructor(private readonly useCase: DeleteTireUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tire deleted',
  })
  @ApiParam({ name: 'id', type: 'string' })
  async handle(@Param('id') id: string) {
    return this.useCase.execute(id);
  }
}
