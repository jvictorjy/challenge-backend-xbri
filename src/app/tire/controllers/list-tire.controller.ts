import { ListTireUseCase } from '@app/tire/use-cases';
import { Tire } from '@prisma/client';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { ListTireResponseDto } from '@app/tire/dto/list-tire.response.dto';

@Controller('tire')
@ApiTags('Tire')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class ListTireController {
  constructor(private readonly listTireUseCase: ListTireUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List tire',
    description: 'List tire',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ListTireResponseDto],
  })
  async handle(): Promise<Tire[]> {
    return await this.listTireUseCase.execute();
  }
}
