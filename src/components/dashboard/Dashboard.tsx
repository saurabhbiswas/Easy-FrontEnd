import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { state } = useAuthContext();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6"> {state.user ? state.user.name : 'User'}!</h1>
        <p className="text-gray-600">Welcome to the application.</p>
         <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
        Logout
      </button>
      </div>
    </div>
  );
};

export default Dashboard;


