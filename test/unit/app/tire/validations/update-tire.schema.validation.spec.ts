import { UpdateTireSchemaValidation } from '@app/tire/validations/update-tire.schema.validation';

describe('UpdateTireSchemaValidation', () => {
  let schemaValidation: UpdateTireSchemaValidation;

  beforeEach(() => {
    schemaValidation = new UpdateTireSchemaValidation();
  });

  it('should validate a valid tire schema', () => {
    const schema = schemaValidation.createSchema();
    const validData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(validData)).not.toThrow();
  });

  it('should throw an error if name is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError('Name is required');
  });

  it('should throw an error if brand is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError('Brand is required');
  });

  it('should throw an error if size is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError('Size is required');
  });

  it('should throw an error if size is in incorrect format', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205-55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Size must be in the format 00/000R00',
    );
  });

  it('should throw an error if price is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError('Price is required');
  });

  it('should throw an error if price is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 0,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Price must be greater than 0',
    );
  });

  it('should throw an error if quantity is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Quantity is required',
    );
  });

  it('should throw an error if quantity is less than 1', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 0,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Quantity must be greater than 0',
    );
  });

  it('should throw an error if seller_id is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Seller ID is required',
    );
  });

  it('should throw an error if name is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 123,
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Name must be a string',
    );
  });

  it('should throw an error if brand is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 123,
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Brand must be a string',
    );
  });

  it('should throw an error if size is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: 123,
      price: 100,
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Size must be a string',
    );
  });

  it('should throw an error if price is not a number', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: '100',
      quantity: 10,
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Price must be a number',
    );
  });

  it('should throw an error if quantity is not a number', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: '10',
      seller_id: 'valid_seller_id',
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Quantity must be a number',
    );
  });

  it('should throw an error if seller_id is not a string', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'Tire A',
      brand: 'Brand A',
      size: '205/55R16',
      price: 100,
      quantity: 10,
      seller_id: 123,
    };

    expect(() => schema.parse(invalidData)).toThrowError(
      'Seller ID must be a string',
    );
  });
});
