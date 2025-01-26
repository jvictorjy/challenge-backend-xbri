import { CreateUserSchemaValidation } from '@app/users/validations/create-user.schema.validation';

describe('CreateUserSchemaValidation', () => {
  let schemaValidation: CreateUserSchemaValidation;

  beforeEach(() => {
    schemaValidation = new CreateUserSchemaValidation();
  });

  it('should validate a valid user schema', () => {
    const schema = schemaValidation.createSchema();
    const validData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      type: 'SELLER',
    };

    expect(() => schema.parse(validData)).not.toThrow();
  });

  it('should throw an error if name is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      email: 'john.doe@example.com',
      password: 'password123',
      type: 'SELLER',
    };

    expect(() => schema.parse(invalidData)).toThrow('Name is required');
  });

  it('should throw an error if email is invalid', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      type: 'SELLER',
    };

    expect(() => schema.parse(invalidData)).toThrow(
      'This is not a valid email.',
    );
  });

  it('should throw an error if password is too short', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'short',
      type: 'SELLER',
    };

    expect(() => schema.parse(invalidData)).toThrow(
      'Password must be at least 8 character',
    );
  });

  it('should throw an error if type is invalid', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      type: 'INVALID_TYPE',
    };

    expect(() => schema.parse(invalidData)).toThrow();
  });
});
