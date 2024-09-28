// src/components/auth/AuthForm.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  emailError?: string | null;
  password: string;
  setPassword: (value: string) => void;
  passwordErrors?: string[]; 
  name?: string;
  setName?: (value: string) => void;
  nameError?: string | null;
  serverError?: string | null;
  buttonText: string;
  footerContent?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  
  passwordErrors,
  name,
  setName,
  nameError,
  serverError,
  buttonText,
  footerContent,
}) => (
  <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={onSubmit}>
    {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
    {setName && (
      <>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName?.(e.target.value)}
          className="w-full p-2 mb-1 border border-gray-300 rounded"
        />
        {nameError && <p className="text-red-500 mb-2 font-custom text-tiny">{nameError}</p>}
      </>
    )}
    <input
      type="text"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 mb-1 border border-gray-300 rounded"
    />
    {emailError && <p className="text-red-500 mb-2 font-custom text-tiny">{emailError}</p>}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 mb-1 border border-gray-300 rounded"
    />
    {/* Display password errors for Signup */}
    {passwordErrors && passwordErrors.length > 0 && (
      <ul className="text-red-500 mb-2 list-none list-inside font-custom text-tiny">
        {passwordErrors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )}
    
    <button type="submit" className="bg-green-500 text-white w-full p-2 rounded">
      {buttonText}
    </button>

    {/* Render footerContent inside the form */}
    {footerContent && <div className="mt-4 text-center">{footerContent}</div>}
  </form>
);

export default AuthForm;
