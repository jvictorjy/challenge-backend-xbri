import { SignInSchemaValidation } from '@app/auth/validations/sign-in.schema.validation';

describe('SignInSchemaValidation', () => {
  let schemaValidation: SignInSchemaValidation;

  beforeEach(() => {
    schemaValidation = new SignInSchemaValidation();
  });

  it('should validate a valid sign-in schema', () => {
    const schema = schemaValidation.createSchema();
    const validData = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    expect(() => schema.parse(validData)).not.toThrow();
  });

  it('should throw an error if email is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      password: 'password123',
    };

    expect(() => schema.parse(invalidData)).toThrow('Email is required');
  });

  it('should throw an error if email is invalid', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      email: 'invalid-email',
      password: 'password123',
    };

    expect(() => schema.parse(invalidData)).toThrow(
      'This is not a valid email.',
    );
  });

  it('should throw an error if password is missing', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      email: 'john.doe@example.com',
    };

    expect(() => schema.parse(invalidData)).toThrow('Password is required');
  });

  it('should throw an error if password is too short', () => {
    const schema = schemaValidation.createSchema();
    const invalidData = {
      email: 'john.doe@example.com',
      password: 'short',
    };

    expect(() => schema.parse(invalidData)).toThrow(
      'Password must be at least 8 character',
    );
  });
});
