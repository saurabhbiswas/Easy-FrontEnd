// src/utils/validation.ts

// Validate Email
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === '') {
    return 'Email cannot be blank.';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return null;
};

// Validate Password (for Signup)
export const validatePasswordForSignup = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Minimum length of 8 characters.');
  }
  if (!/[A-Za-z]/.test(password)) {
    errors.push('Contains at least 1 letter.');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Contains at least one number.');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Contains at least one special character.');
  }

  if (errors.length > 0) {
    errors.unshift('Password requirements:');
  }
  return errors;
};

// Validate Password (for Login)
export const validatePasswordForLogin = (password: string): string | null => {
  if (password.trim() === '') {
    return 'Password cannot be blank.';
  }
  return null;
};

// Validate Name
export const validateName = (name: string): string | null => {
  if (name.trim() === '') {
    return 'Name cannot be blank.';
  }
  return null;
};
