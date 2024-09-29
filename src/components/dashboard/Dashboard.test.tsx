// src/components/dashboard/Dashboard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import useAuth from '../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth');

describe('Dashboard Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  it('renders welcome message and logout button', () => {
    render(<Dashboard />);

    // Check if the welcome message is present
    expect(screen.getByText(/Welcome to the application/i)).toBeInTheDocument();

    // Check if the logout button is present
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
  });

  it('calls logout when the Logout button is clicked', () => {
    render(<Dashboard />);

    const logoutButton = screen.getByRole('button', { name: /Logout/i });

    // Simulate clicking the logout button
    fireEvent.click(logoutButton);

    // Check that logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
