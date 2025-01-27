import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

export class SignInResponseDto {
  @ApiProperty({ type: 'string', example: faker.internet.jwt() })
  accessToken: string;
}
