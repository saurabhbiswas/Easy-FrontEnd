import { useAuthContext } from '../context/AuthContext';

import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

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

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data }: { data: LoginResponse } = await axios.post('/auth/login', { email, password },
        {
  headers: {
    'Content-Type': 'application/json'
  } }

        );
      localStorage.setItem('accessToken', data.accessToken);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      // Optionally, navigate to the dashboard or intended page after login
      navigate('/dashboard', { replace: true });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Invalid credentials' });
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { data }: { data: SignupResponse } = await axios.post('/auth/signup', { email, password, name });
      alert(data.message);
      // Optionally, log the user in after successful signup
      await login(email, password);
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Signup failed' });
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/login', { replace: true });
  };

  return { login, signup, logout, isAuthenticated: state.isAuthenticated };
};

export default useAuth;
