import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas/create-schema.interface';
import { z } from 'zod';

export class SignInSchemaValidation implements CreateValidationSchema {
  createSchema(): z.ZodSchema {
    return z.object({
      email: z
        .string({
          description: 'Email',
          invalid_type_error: 'Email must be a string',
          required_error: 'Email is required',
        })
        .trim()
        .min(1, { message: 'Email must be at least 1 character' })
        .email('This is not a valid email.'),
      password: z
        .string({
          description: 'Password',
          invalid_type_error: 'Password must be a string',
          required_error: 'Password is required',
        })
        .trim()
        .min(8, { message: 'Password must be at least 8 character' }),
    });
  }
}
