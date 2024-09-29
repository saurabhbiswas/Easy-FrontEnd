// src/hooks/useAuth.ts

import { useAuthContext } from '../context/AuthContext';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext'; 
import { handleAuthError } from '../utils/handleAuthError';
interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface SignupResponse {
  message: string;
}

const useAuth = () => {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // Destructure the addNotification function

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data }: { data: LoginResponse } = await axios.post(
        '/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('accessToken', data.accessToken);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      // Optionally, navigate to the dashboard or intended page after login
      navigate('/dashboard', { replace: true });
      // Show success notification
      addNotification('Login successful!', 'success');
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Invalid credentials' });
      handleAuthError(error, addNotification);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data }: { data: SignupResponse } = await axios.post('/auth/signup', { email, password, name });
      // Replace alert with notification
      addNotification(data.message, 'success');
      // Optionally, log the user in after successful signup
      await login(email, password);
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Signup failed' });
      handleAuthError(error, addNotification);
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/login', { replace: true });
    // Show info notification
    addNotification('Logged out successfully.', 'info');
  };

  return { login, signup, logout, isAuthenticated: state.isAuthenticated };
};

export default useAuth;
