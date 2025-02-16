import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas/create-schema.interface';
import { z } from 'zod';

export class CreateOrderSchemaValidation implements CreateValidationSchema {
  createSchema(): z.ZodSchema {
    return z.object({
      buyer_id: z
        .string({
          description: 'Buyer ID',
          invalid_type_error: 'Buyer ID must be a string',
          required_error: 'Buyer ID is required',
        })
        .trim()
        .min(1, { message: 'Buyer ID must be at least 1 character' }),
      tire_id: z
        .string({
          description: 'Tire ID',
          invalid_type_error: 'Tire ID must be a string',
          required_error: 'Tire ID is required',
        })
        .trim()
        .min(1, { message: 'Tire ID must be at least 1 character' }),
      quantity: z
        .number({
          description: 'Quantity',
          invalid_type_error: 'Quantity must be a number',
          required_error: 'Quantity is required',
        })
        .min(1, { message: 'Quantity must be greater than 0' }),
      price_total: z
        .number({
          description: 'Price',
          invalid_type_error: 'Price must be a number',
          required_error: 'Price is required',
        })
        .min(1, { message: 'Price must be greater than 0' }),
    });
  }
}
