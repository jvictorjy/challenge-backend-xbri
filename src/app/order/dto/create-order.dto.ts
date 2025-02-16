import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { OrderStatus } from '@app/order/enum';

export class CreateOrderDtoRequest {
  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  readonly buyer_id: string;

  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  readonly tire_id: string;

  @ApiProperty({ type: 'number', example: faker.string.numeric() })
  readonly quantity: number;

  @ApiProperty({ type: 'number', example: faker.finance.amount() })
  readonly price_total: number;

  @ApiProperty({ type: 'string', example: 'PAID' })
  readonly status: OrderStatus;
}
