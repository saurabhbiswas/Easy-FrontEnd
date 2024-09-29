import React from 'react';


import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { RouterProvider } from 'react-router-dom'; 
import router from './router';

const App: React.FC = () => {
  
    return (
   <NotificationProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </NotificationProvider>
  );
  
};

export default App;


