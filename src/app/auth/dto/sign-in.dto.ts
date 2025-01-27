import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class SignInDto {
  @ApiProperty({ type: 'string', example: faker.internet.email() })
  email: string;

  @ApiProperty({ type: 'string', example: faker.internet.password() })
  password: string;
}
