import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../context/NotificationContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth');

const mockSignup = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    login: jest.fn(),
    signup: mockSignup,
    logout: jest.fn(),
    isAuthenticated: false,
  });

  // Ensure there's a notification root element for the NotificationProvider
  const notificationRoot = document.createElement('div');
  notificationRoot.setAttribute('id', 'notification-root');
  document.body.appendChild(notificationRoot);
});

afterEach(() => {
  // Clean up notification root after each test
  const notificationRoot = document.getElementById('notification-root');
  if (notificationRoot) {
    document.body.removeChild(notificationRoot);
  }
});

const renderWithProviders = () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Signup Component', () => {
  it('renders signup form with name, email, and password fields', () => {
    renderWithProviders();
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });





  it('calls signup on valid form submission', async () => {
    renderWithProviders();
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('john@example.com', 'Password123!', 'John Doe');
    });
  });

  it('navigates to dashboard on successful signup', async () => {
    mockSignup.mockImplementation(() => Promise.resolve());

    renderWithProviders();
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });

  it('displays server error on signup failure', async () => {
    mockSignup.mockImplementation(() =>
      Promise.reject({ response: { data: { message: 'User already exists' } } })
    );

    renderWithProviders();
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign up/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const serverError = screen.getByText(/User already exists/i);
      expect(serverError).toBeInTheDocument();
    });
  });

  it('renders footer content with login link', () => {
    renderWithProviders();
    const loginLink = screen.getByText(/Already have an account\? Sign in/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });
});
