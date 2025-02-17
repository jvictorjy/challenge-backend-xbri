import { CreateTireSchemaValidation } from '@app/tire/validations/create-tire.schema.validation';

describe('CreateTireSchemaValidation', () => {
  let schemaValidation: CreateTireSchemaValidation;

  beforeEach(() => {
    schemaValidation = new CreateTireSchemaValidation();
  });

  it('should throw an error if name is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      brand: 'Michelin',
      size: '225/220R17',
      price: 100,
      quantity: 10,
      seller_id: 'uuid',
    };

    expect(() => schema.parse(invalidTire)).toThrow('Name is required');
  });

  it('should throw an error if brand is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      name: 'Pilot Sport 4',
      size: '225/220R17',
      price: 100,
      quantity: 10,
      seller_id: 'uuid',
    };

    expect(() => schema.parse(invalidTire)).toThrow('Brand is required');
  });

  it('should throw an error if size is in incorrect format', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      name: 'Pilot Sport 4',
      brand: 'Michelin',
      size: '225-220R17',
      price: 100,
      quantity: 10,
      seller_id: 'uuid',
    };

    expect(() => schema.parse(invalidTire)).toThrow(
      'Size must be in the format 00/000R00',
    );
  });

  it('should throw an error if price is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      name: 'Pilot Sport 4',
      brand: 'Michelin',
      size: '225/220R17',
      price: 0,
      quantity: 10,
      seller_id: 'uuid',
    };

    expect(() => schema.parse(invalidTire)).toThrow(
      'Price must be greater than 0',
    );
  });

  it('should throw an error if quantity is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      name: 'Pilot Sport 4',
      brand: 'Michelin',
      size: '225/220R17',
      price: 100,
      quantity: 0,
      seller_id: 'uuid',
    };

    expect(() => schema.parse(invalidTire)).toThrow(
      'Quantity must be greater than 0',
    );
  });

  it('should throw an error if seller_id is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidTire = {
      name: 'Pilot Sport 4',
      brand: 'Michelin',
      size: '225/220R17',
      price: 100,
      quantity: 10,
    };

    expect(() => schema.parse(invalidTire)).toThrow('Seller ID is required');
  });
});
