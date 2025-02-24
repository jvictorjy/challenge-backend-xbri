import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';
import { UpdateStatusOrderUseCase } from '@app/order/use-cases/update-status-order.use-case';
import { UpdateStatusOrderDto } from '@app/order/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { UUIDSchemaValidation } from '@app/@common/application/validations';
import { OrderResponseDto } from '@app/order/dto/order-response.dto';

@Controller('orders')
@ApiTags('Order')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class UpdateStatusOrderController {
  constructor(
    private readonly updateStatusOrderUseCase: UpdateStatusOrderUseCase,
  ) {}

  @Patch(':id/status')
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiBody({ type: UpdateStatusOrderDto })
  @ApiOkResponse({ type: OrderResponseDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async updateStatus(
    @Param('id', new ZodValidationPipe(new UUIDSchemaValidation())) id: string,
    @Body() payload: UpdateStatusOrderDto,
  ): Promise<OrderResponseDto> {
    return this.updateStatusOrderUseCase.execute(id, payload);
  }
}
