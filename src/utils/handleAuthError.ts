// src/utils/handleAuthError.ts

import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  // Add other fields based on your API's error structure
}

/**
 * Centralized error handler for authentication-related API calls.
 * @param error - The error thrown by an Axios request.
 * @param addNotification - Function to display notifications to the user.
 */
export const handleAuthError = (
  error: unknown,
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void
): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      // Server responded with a status code outside the 2xx range
      const status = axiosError.response.status;
      const responseData = axiosError.response.data;
     

      switch (status) {
        case 102:
         addNotification('Connection refused', 'error');
          break;

        case 400:
          // Bad Request - likely validation errors
          addNotification(responseData.message || 'Invalid request.', 'error');
          break;
        case 401:
          // Unauthorized - invalid credentials
          addNotification('Invalid email or password.', 'error');
          break;
        case 409:
          // Conflict - e.g., user already exists
          addNotification('User already exists. Please log in.', 'error');
          break;
        case 500:
          // Internal Server Error
          addNotification('Server error. Please try again later.', 'error');
          break;
        default:
          // Other client or server errors
          addNotification('An unexpected error occurred.', 'error');
          break;
      }
    } else if (axiosError.request) {
      
      // Request was made but no response received
      addNotification('Network error. Please check your internet connection.', 'error');
    } else {
      // Something happened in setting up the request
      addNotification('An error occurred. Please try again.', 'error');
    }
  } else {
    // Non-Axios error (e.g., programming error)
    addNotification('An unexpected error occurred.', 'error');
  }
};
