import { CreateOrderUseCase } from '@app/order/use-cases';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDtoRequest } from '@app/order/dto';
import { ZodValidationPipe } from '@app/@common/application/pipes/zod-validation.pipe';
import { CreateOrderSchemaValidation } from '@app/order/validations/create-order.schema.validation';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorSchema } from '@app/@common/application/documentations/openapi/swagger/error.schema';

@Controller('orders')
@ApiTags('Order')
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiNotFoundResponse({ description: 'Not Found', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class CreateOrderController {
  constructor(private readonly useCase: CreateOrderUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created',
  })
  @ApiBody({ type: CreateOrderDtoRequest })
  async createOrder(
    @Body(new ZodValidationPipe(new CreateOrderSchemaValidation()))
    data: CreateOrderDtoRequest,
  ): Promise<void> {
    return this.useCase.execute(data);
  }
}
