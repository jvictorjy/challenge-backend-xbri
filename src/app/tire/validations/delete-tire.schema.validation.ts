import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas/create-schema.interface';
import { z } from 'zod';

export class DeleteTireSchemaValidation implements CreateValidationSchema {
  createSchema(): z.ZodSchema {
    return z.object({
      id: z
        .string({
          description: 'ID',
          invalid_type_error: 'ID must be a string',
          required_error: 'ID is required',
        })
        .trim()
        .min(1, { message: 'ID must be at least 1 character' }),
    });
  }
}
