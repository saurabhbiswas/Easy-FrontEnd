// src/components/Notification.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notification from './Notification';

describe('Notification Component', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (type: 'success' | 'error' | 'info', message: string) => {
    render(
      <Notification
        message={message}
        type={type}
        onClose={mockOnClose}
      />
    );
  };

  it('renders the notification message with the correct type', () => {
    renderComponent('success', 'Success message');

    // Check if the message is rendered
    expect(screen.getByText('Success message')).toBeInTheDocument();

    // Check if the notification has the correct success style
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100 border-green-500 text-green-700');
  });

  it('renders the error notification with the correct styles', () => {
    renderComponent('error', 'Error message');

    // Check if the error message is rendered
    expect(screen.getByText('Error message')).toBeInTheDocument();

    // Check if the notification has the correct error style
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100 border-red-500 text-red-700');
  });

  it('renders the info notification with the correct styles', () => {
    renderComponent('info', 'Info message');

    // Check if the info message is rendered
    expect(screen.getByText('Info message')).toBeInTheDocument();

    // Check if the notification has the correct info style
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100 border-blue-500 text-blue-700');
  });

 

  it('automatically fades out and calls onClose after 300ms when closed', async () => {
    renderComponent('success', 'Success message');

    const closeButton = screen.getByRole('button', { name: /close notification/i });

    // Simulate clicking the close button
    fireEvent.click(closeButton);

    // Wait for the timeout and check if onClose was called
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }, { timeout: 400 });
  });

  it('notification should be visible when initially rendered', () => {
    renderComponent('info', 'Info message');

    const notification = screen.getByRole('alert');

    // Check if the notification is visible
    expect(notification).toHaveClass('opacity-100');
  });
});
