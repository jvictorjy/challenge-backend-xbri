import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class ListTireResponseDto {
  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  id: string;

  @ApiProperty({ type: 'string', example: faker.lorem.words() })
  name: string;

  @ApiProperty({ type: 'string', example: faker.string.sample() })
  brand: string;

  @ApiProperty({ type: 'string', example: '205/55R16' })
  size: string;

  @ApiProperty({ type: 'number', example: faker.finance.amount() })
  price: number;

  @ApiProperty({ type: 'number', example: faker.string.numeric() })
  quantity_available: number;

  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  seller_id: string;

  @ApiProperty({ type: 'date', example: faker.date.recent() })
  created_at: Date;

  @ApiProperty({ type: 'date', example: faker.date.recent() })
  updated_at: Date;

  @ApiProperty({ type: 'date', example: faker.date.recent() })
  deleted_at: Date | null;
}
