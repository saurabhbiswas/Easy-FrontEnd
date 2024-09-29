import {
  validateEmail,
  validatePasswordForSignup,
  validatePasswordForLogin,
  validateName,
} from './validation';

describe('validateEmail', () => {
  it('should return an error if email is blank', () => {
    const result = validateEmail('');
    expect(result).toBe('Email cannot be blank.');
  });

  it('should return an error if email format is invalid', () => {
    const result = validateEmail('invalid-email');
    expect(result).toBe('Please enter a valid email address.');
  });

  it('should return null if email is valid', () => {
    const result = validateEmail('test@example.com');
    expect(result).toBeNull();
  });
});

describe('validatePasswordForSignup', () => {
  it('should return errors if password is too short', () => {
    const result = validatePasswordForSignup('abc123');
    expect(result).toEqual([
      'Password requirements:',
      'Minimum length of 8 characters.',
      'Contains at least one special character.',
    ]);
  });

  it('should return errors if password lacks a letter', () => {
    const result = validatePasswordForSignup('12345678!');
    expect(result).toEqual([
      'Password requirements:',
      'Contains at least 1 letter.',
    ]);
  });

  it('should return errors if password lacks a number', () => {
    const result = validatePasswordForSignup('password!');
    expect(result).toEqual([
      'Password requirements:',
      'Contains at least one number.',
    ]);
  });

  it('should return errors if password lacks a special character', () => {
    const result = validatePasswordForSignup('password123');
    expect(result).toEqual([
      'Password requirements:',
      'Contains at least one special character.',
    ]);
  });

  it('should return null if password meets all requirements', () => {
    const result = validatePasswordForSignup('Password123!');
    expect(result).toEqual([]);
  });
});

describe('validatePasswordForLogin', () => {
  it('should return an error if password is blank', () => {
    const result = validatePasswordForLogin('');
    expect(result).toBe('Password cannot be blank.');
  });

  it('should return null if password is provided', () => {
    const result = validatePasswordForLogin('Password123!');
    expect(result).toBeNull();
  });
});

describe('validateName', () => {
  it('should return an error if name is blank', () => {
    const result = validateName('');
    expect(result).toBe('Name cannot be blank.');
  });

  it('should return null if name is provided', () => {
    const result = validateName('John Doe');
    expect(result).toBeNull();
  });
});
