import { OrderStatus } from '@app/order/enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusOrderDto {
  @ApiProperty({ type: 'string', example: 'PAID' })
  status: OrderStatus;
}
