// src/components/auth/AuthForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('AuthForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetName = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <AuthForm
        onSubmit={mockOnSubmit}
        email="test@example.com"
        setEmail={mockSetEmail}
        emailError={null}
        password="password123"
        setPassword={mockSetPassword}
        passwordErrors={[]}
        name="John Doe"
        setName={mockSetName}
        nameError={null}
        serverError={null}
        buttonText="Sign up"
        footerContent={<div>Footer Content</div>}
        {...props}
      />
    );
  };

  it('renders all form fields and submit button', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('calls setEmail and setPassword when inputs change', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'newemail@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'newpassword' } });

    expect(mockSetEmail).toHaveBeenCalledWith('newemail@example.com');
    expect(mockSetPassword).toHaveBeenCalledWith('newpassword');
  });

  it('calls setName when the name input changes', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Jane Doe' } });

    expect(mockSetName).toHaveBeenCalledWith('Jane Doe');
  });

  it('displays email and password error messages if present', () => {
    renderComponent({
      emailError: 'Invalid email',
      passwordErrors: ['Password must be at least 8 characters'],
    });

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('displays name error message if present', () => {
    renderComponent({
      nameError: 'Name cannot be blank',
    });

    expect(screen.getByText(/name cannot be blank/i)).toBeInTheDocument();
  });

  it('displays server error message if present', () => {
    renderComponent({
      serverError: 'Server is down',
    });

    expect(screen.getByText(/server is down/i)).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', () => {
    renderComponent();

    fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('renders footer content if provided', () => {
    renderComponent();

    expect(screen.getByText(/footer content/i)).toBeInTheDocument();
  });
});
