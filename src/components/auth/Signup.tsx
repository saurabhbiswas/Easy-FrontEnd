import React from 'react';
import AuthForm from './AuthForm';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const { state: formState, handleFieldChange, validateForm,dispatch } = useAuthForm(true);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signup(formState.email, formState.password, formState.name);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
       
       let errorMessage = 'Signup failed. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({ type: 'SET_SERVER_ERROR', error: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm
        onSubmit={handleSignup}
        email={formState.email}
        setEmail={handleFieldChange('email')}
        emailError={formState.emailError}
        password={formState.password}
        setPassword={handleFieldChange('password')}
        passwordErrors={formState.passwordErrors}
        name={formState.name}
        setName={handleFieldChange('name')}
        nameError={formState.nameError}
        serverError={formState.serverError}
        buttonText="Sign up"
        footerContent={
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
          >
            Already have an account? Sign in
          </Link>
        }
      />
    </div>
  );
};

export default Signup;




