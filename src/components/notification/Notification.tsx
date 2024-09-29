// src/components/Notification.tsx

import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Trigger the fade-in effect
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Trigger the fade-out effect
    setIsVisible(false);
    // Remove the notification after the transition duration
    setTimeout(onClose, 300); // Duration should match the CSS transition
  };

  const typeStyles: Record<NotificationProps['type'], string> = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div
      className={`max-w-md w-full ${typeStyles[type]} border-l-4 p-4 mb-4 rounded shadow-md flex justify-between items-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-lg font-bold leading-none text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close Notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
