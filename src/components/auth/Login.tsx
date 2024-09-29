import React from 'react';
import AuthForm from './AuthForm';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { state: formState, handleFieldChange, validateForm,dispatch } = useAuthForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the location the user was trying to access before being redirected
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formState.email, formState.password);
      navigate(from, { replace: true });
    } catch (error: any) {
       console.log("setting server error--login",error);
      // Handle login error
      let errorMessage = 'Login failed. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      // Assuming dispatch is available from useAuthForm
      // If not, you can set server error state in a different way
      dispatch({ type: 'SET_SERVER_ERROR', error: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        onSubmit={handleLogin}
        email={formState.email}
        setEmail={handleFieldChange('email')}
        emailError={formState.emailError}
        password={formState.password}
        setPassword={handleFieldChange('password')}
        passwordErrors={formState.passwordErrors}
        buttonText="Signin"
        footerContent={
          <Link
            to="/signup"
            className="text-sm text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
          >
            Create account
          </Link>
        }
      />
    </div>
  );
};

export default Login;


