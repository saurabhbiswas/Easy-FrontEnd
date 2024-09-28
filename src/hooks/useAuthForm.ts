// src/hooks/useAuthForm.ts

import { useReducer } from 'react';
import {
  validateEmail,
  validatePasswordForLogin,
  validatePasswordForSignup,
  validateName,
} from '../utils/validation';

type State = {
  email: string;
  password: string;
  name: string;
  emailError: string | null;
  passwordError: string | null;
  passwordErrors: string[];
  nameError: string | null;
  serverError: string | null;
};

type Action =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string | null }
  | { type: 'SET_PASSWORD_ERRORS'; errors: string[] }
  | { type: 'SET_SERVER_ERROR'; error: string | null }
  | { type: 'RESET_ERRORS' };

const initialState: State = {
  email: '',
  password: '',
  name: '',
  emailError: null,
  passwordError: null,
  passwordErrors: [],
  nameError: null,
  serverError: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERROR':
      return {
        ...state,
        [`${action.field}Error`]: action.error,
      };
    case 'SET_PASSWORD_ERRORS':
      return {
        ...state,
        passwordErrors: action.errors,
      };
    case 'SET_SERVER_ERROR':
      return {
        ...state,
        serverError: action.error,
      };
    case 'RESET_ERRORS':
      return {
        ...state,
        emailError: null,
        passwordError: null,
        passwordErrors: [],
        nameError: null,
        serverError: null,
      };
    default:
      return state;
  }
};

const useAuthForm = (isSignup: boolean = false) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFieldChange = (field: string) => (value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const validateForm = (): boolean => {
    dispatch({ type: 'RESET_ERRORS' });
    let hasError = false;

    // Validate email
    const emailError = validateEmail(state.email);
    dispatch({ type: 'SET_ERROR', field: 'email', error: emailError });
    if (emailError) {
      hasError = true;
    }

  
      const passwordErrors = validatePasswordForSignup(state.password);
      
      if (passwordErrors.length > 0) {
        dispatch({ type: 'SET_PASSWORD_ERRORS', errors: passwordErrors });
        hasError = true;
      }
    

    // Validate name (for signup)
    if (isSignup) {
      const nameError = validateName(state.name);
      dispatch({ type: 'SET_ERROR', field: 'name', error: nameError });
      if (nameError) {
        hasError = true;
      }
    }

    return !hasError;
  };

  return {
    state,
    dispatch, // Include dispatch if needed in components
    handleFieldChange,
    validateForm,
  };
};

export default useAuthForm;
