import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class DeleteTireDto {
  @ApiProperty({ type: 'string', example: faker.string.uuid() })
  id: string;
}
