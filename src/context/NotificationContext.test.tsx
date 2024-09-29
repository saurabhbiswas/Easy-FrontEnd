// src/context/NotificationContext.test.tsx

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { NotificationProvider, useNotification } from './NotificationContext';
import Notification from '../components/notification/Notification';

// Mock the Notification component to simplify the test and check if it's rendered correctly
jest.mock('../components/notification/Notification', () => ({ message, onClose }: any) => (
  <div>
    <span>{message}</span>
    <button onClick={onClose}>Close</button>
  </div>
));

// Test component to use the Notification context
const TestComponent = () => {
  const { addNotification } = useNotification();

  return (
    <div>
      <button onClick={() => addNotification('Test Notification', 'info')}>Add Notification</button>
    </div>
  );
};

describe('NotificationContext', () => {
  beforeEach(() => {
    // Create a div to use as the portal root
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'notification-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Cleanup the portal root after each test
    const portalRoot = document.getElementById('notification-root');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  it('should render notifications correctly when added', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Click the button to add a notification
    act(() => {
      screen.getByText('Add Notification').click();
    });

    // Check if the notification is rendered
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
  });

  it('should remove notification after timeout', () => {
    jest.useFakeTimers(); // Use fake timers to control the timeout

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add a notification
    act(() => {
      screen.getByText('Add Notification').click();
    });

    // The notification should be present
    expect(screen.getByText('Test Notification')).toBeInTheDocument();

    // Fast-forward the timers to trigger the automatic removal (5 seconds)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Now the notification should be gone
    expect(screen.queryByText('Test Notification')).toBeNull();
  });

  it('should manually remove notification when the close button is clicked', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    // Add a notification
    act(() => {
      screen.getByText('Add Notification').click();
    });

    // The notification should be present
    expect(screen.getByText('Test Notification')).toBeInTheDocument();

    // Click the close button to manually remove the notification
    act(() => {
      screen.getByText('Close').click();
    });

    // The notification should be gone
    expect(screen.queryByText('Test Notification')).toBeNull();
  });
});
