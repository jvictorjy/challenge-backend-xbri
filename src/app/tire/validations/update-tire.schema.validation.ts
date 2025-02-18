import { CreateValidationSchema } from '@app/@common/application/validators/zod/schemas/create-schema.interface';
import { z } from 'zod';

export class UpdateTireSchemaValidation implements CreateValidationSchema {
  createSchema(): z.ZodSchema {
    return z.object({
      name: z
        .string({
          description: 'Name',
          invalid_type_error: 'Name must be a string',
          required_error: 'Name is required',
        })
        .trim()
        .min(1, { message: 'Name must be at least 1 character' }),
      brand: z
        .string({
          description: 'Brand',
          invalid_type_error: 'Brand must be a string',
          required_error: 'Brand is required',
        })
        .trim()
        .min(1, { message: 'Description must be at least 1 character' }),
      size: z
        .string({
          description: 'Size',
          invalid_type_error: 'Size must be a string',
          required_error: 'Size is required',
        })
        .regex(/^\d{3}\/\d{2}R\d{2}$/, {
          message: 'Size must be in the format 00/000R00',
        })
        .trim()
        .min(1, { message: 'Size must be at least 1 character' }),
      price: z
        .number({
          description: 'Price',
          invalid_type_error: 'Price must be a number',
          required_error: 'Price is required',
        })
        .min(1, { message: 'Price must be greater than 0' }),
      quantity: z
        .number({
          description: 'Quantity',
          invalid_type_error: 'Quantity must be a number',
          required_error: 'Quantity is required',
        })
        .min(1, { message: 'Quantity must be greater than 0' }),
      seller_id: z
        .string({
          description: 'Seller ID',
          invalid_type_error: 'Seller ID must be a string',
          required_error: 'Seller ID is required',
        })
        .trim()
        .min(1, { message: 'Seller ID must be at least 1 character' }),
    });
  }
}
