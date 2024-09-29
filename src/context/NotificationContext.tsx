// src/context/NotificationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Notification from '../components/notification/Notification';

interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationContextProps {
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Function to add a new notification
  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, type },
    ]);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => removeNotification(id), 5000);
  };

  // Function to remove a notification by ID
  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2">
          {notifications.map((notif) => (
            <Notification
              key={notif.id}
              message={notif.message}
              type={notif.type}
              onClose={() => removeNotification(notif.id)}
            />
          ))}
        </div>,
        document.getElementById('notification-root') as HTMLElement
      )}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the Notification context
export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
