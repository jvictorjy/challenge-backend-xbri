import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Status } from '@prisma/client';

export class OrderResponseDto {
  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  id: string;

  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  tire_id: string;

  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  buyer_id: string;

  @ApiProperty({ type: 'string', example: faker.number.int() })
  quantity: number;

  @ApiProperty({ type: 'string', example: faker.number.float() })
  price_total: number;

  @ApiProperty({ type: 'string', example: 'PENDING' })
  status: Status;

  @ApiProperty({ type: 'string', example: faker.date.recent() })
  created_at: Date;

  @ApiProperty({ type: 'string', example: faker.date.recent() })
  updated_at: Date;

  @ApiProperty({ type: 'string', example: 'null' })
  deleted_at: Date;
}
