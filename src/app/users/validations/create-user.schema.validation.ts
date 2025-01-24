import { z } from 'zod';

import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas/create-schema.interface';

export class CreateUserSchemaValidation implements CreateValidationSchema {
  createSchema(): z.ZodSchema {
    const types = ['SELLER', 'BUYER'] as const;

    return z.object({
      name: z
        .string({
          description: 'Name',
          invalid_type_error: 'Name must be a string',
          required_error: 'Name is required',
        })
        .trim()
        .min(1, { message: 'Name must be at least 1 character' }),
      email: z
        .string({
          description: 'Email',
          invalid_type_error: 'Email must be a string',
          required_error: 'Email is required',
        })
        .trim()
        .min(1, { message: 'Description must be at least 1 character' })
        .email('This is not a valid email.'),
      password: z
        .string({
          description: 'Password',
          invalid_type_error: 'Password must be a string',
          required_error: 'Password is required',
        })
        .trim()
        .min(8, { message: 'Password must be at least 8 character' }),
      type: z.enum(types),
    });
  }
}
