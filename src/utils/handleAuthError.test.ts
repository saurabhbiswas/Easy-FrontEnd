import { handleAuthError } from './handleAuthError';
import { AxiosError } from 'axios';

describe('handleAuthError', () => {
  let mockAddNotification: jest.Mock;

  beforeEach(() => {
    mockAddNotification = jest.fn();
  });

  it('should handle 400 Bad Request error', () => {
    const error = {
      response: {
        status: 400,
        data: { message: 'Invalid request data' },
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('Invalid request data', 'error');
  });

  it('should handle 401 Unauthorized error', () => {
    const error = {
      response: {
        status: 401,
        data: { message: 'Unauthorized' },
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('Invalid email or password.', 'error');
  });

  it('should handle 409 Conflict error', () => {
    const error = {
      response: {
        status: 409,
        data: { message: 'User already exists' },
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('User already exists. Please log in.', 'error');
  });

  it('should handle 500 Internal Server Error', () => {
    const error = {
      response: {
        status: 500,
        data: { message: 'Server error' },
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('Server error. Please try again later.', 'error');
  });

  it('should handle unknown status codes', () => {
    const error = {
      response: {
        status: 418,
        data: { message: 'Unknown error' },
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('An unexpected error occurred.', 'error');
  });

  it('should handle network error', () => {
    const error = {
      request: {},
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('Network error. Please check your internet connection.', 'error');
  });

  it('should handle errors during request setup', () => {
    const error = {
      message: 'Error setting up request',
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('An error occurred. Please try again.', 'error');
  });

  it('should handle non-Axios errors', () => {
    const error = new Error('Non-Axios error');

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('An unexpected error occurred.', 'error');
  });

  it('should handle 102 Connection Refused error', () => {
    const error = {
      response: {
        status: 102,
      },
      isAxiosError: true,
    } as AxiosError;

    handleAuthError(error, mockAddNotification);

    expect(mockAddNotification).toHaveBeenCalledWith('Connection refused', 'error');
  });
});
