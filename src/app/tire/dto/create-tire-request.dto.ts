import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Users } from '@prisma/client';

export class CreateTireDtoRequest {
  @ApiProperty({ type: 'string', example: faker.lorem.words() })
  name: string;

  @ApiProperty({ type: 'string', example: faker.string.sample() })
  brand: string;

  @ApiProperty({ type: 'string', example: '205/55R16' })
  size: string;

  @ApiProperty({ type: 'number', example: faker.finance.amount() })
  price: number;

  @ApiProperty({ type: 'number', example: faker.string.numeric() })
  quantity: number;

  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  seller_id: string;

  seller: Users;
}
