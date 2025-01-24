import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class CreateUserDtoInput {
  @ApiProperty({ type: 'string', example: faker.person.fullName() })
  name: string;

  @ApiProperty({ type: 'string', example: faker.internet.email() })
  email: string;

  @ApiProperty({ type: 'string', example: faker.internet.password() })
  password: string;

  @ApiProperty({ type: 'string', example: 'SELLER' })
  type: string;
}
