import { CreateOrderSchemaValidation } from '@app/order/validations/create-order.schema.validation';

describe('CreateOrderSchemaValidation', () => {
  let schemaValidation: CreateOrderSchemaValidation;

  beforeEach(() => {
    schemaValidation = new CreateOrderSchemaValidation();
  });

  it('should validate a valid order schema', () => {
    const schema = schemaValidation.createSchema();
    const validData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 'valid_tire_id',
      quantity: 1,
      price_total: 100,
    };

    expect(() => schema.parse(validData)).not.toThrow();
  });

  it('should throw an error if buyer_id is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      tire_id: 'valid_tire_id',
      quantity: 1,
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Buyer ID is required',
    );
  });

  it('should throw an error if tire_id is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      quantity: 1,
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError('Tire ID is required');
  });

  it('should throw an error if quantity is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 'valid_tire_id',
      quantity: 0,
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Quantity must be greater than 0',
    );
  });

  it('should throw an error if price_total is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 'valid_tire_id',
      quantity: 1,
      price_total: 0,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Price must be greater than 0',
    );
  });

  it('should throw an error if buyer_id is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 123,
      tire_id: 'valid_tire_id',
      quantity: 1,
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Buyer ID must be a string',
    );
  });

  it('should throw an error if tire_id is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 123,
      quantity: 1,
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Tire ID must be a string',
    );
  });

  it('should throw an error if quantity is not a number', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 'valid_tire_id',
      quantity: 'one',
      price_total: 100,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Quantity must be a number',
    );
  });

  it('should throw an error if price_total is not a number', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      buyer_id: 'valid_buyer_id',
      tire_id: 'valid_tire_id',
      quantity: 1,
      price_total: 'one hundred',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Price must be a number',
    );
  });
});
