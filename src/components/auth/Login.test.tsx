// src/components/auth/Login.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../context/NotificationContext';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;
const mockLogin = jest.fn();

beforeEach(() => {
  mockNavigate.mockReset();

  (useAuth as jest.Mock).mockReturnValue({
    login: mockLogin,
    signup: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
  });

  // Add the notification-root to the document body for portal rendering
  const notificationRoot = document.createElement('div');
  notificationRoot.setAttribute('id', 'notification-root');
  document.body.appendChild(notificationRoot);
});

afterEach(() => {
  const notificationRoot = document.getElementById('notification-root');
  if (notificationRoot) {
    document.body.removeChild(notificationRoot);
  }
});

const renderWithProviders = () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Login Component', () => {
  it('renders login form with email, password fields, and Signin button', () => {
    renderWithProviders();

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Signin/i });
    const signupLink = screen.getByText(/Create account/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });


});
