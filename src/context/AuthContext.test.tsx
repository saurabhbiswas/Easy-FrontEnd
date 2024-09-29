// src/context/AuthContext.test.tsx
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuthContext, authReducer } from './AuthContext'; // Import authReducer

// Mock `localStorage` for the tests
beforeEach(() => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'accessToken') return 'dummy-token'; // Mock the token
    return null;
  });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
});

describe('authReducer', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('should handle START_LOADING', () => {
    const { result } = renderHook(() =>
      React.useReducer(authReducer, initialState) // authReducer is now recognized
    );

    act(() => {
      result.current[1]({ type: 'START_LOADING' });
    });

    expect(result.current[0]).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const { result } = renderHook(() =>
      React.useReducer(authReducer, initialState)
    );

    act(() => {
      result.current[1]({
        type: 'LOGIN_SUCCESS',
        payload: { id: '1', name: 'John Doe', email: 'john@example.com' },
      });
    });

    expect(result.current[0]).toEqual({
      user: { id: '1', name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  });

  it('should handle AUTH_ERROR', () => {
    const { result } = renderHook(() =>
      React.useReducer(authReducer, initialState)
    );

    act(() => {
      result.current[1]({ type: 'AUTH_ERROR', payload: 'Invalid credentials' });
    });

    expect(result.current[0]).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: 'Invalid credentials',
    });
  });

  it('should handle LOGOUT', () => {
    const { result } = renderHook(() =>
      React.useReducer(authReducer, initialState)
    );

    act(() => {
      result.current[1]({ type: 'LOGOUT' });
    });

    expect(result.current[0]).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });
});

describe('AuthProvider and useAuthContext', () => {


  it('should update state when dispatching an action', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuthContext(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { id: '1', name: 'John Doe', email: 'john@example.com' },
      });
    });

    expect(result.current.state).toEqual({
      user: { id: '1', name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  });

 
});
