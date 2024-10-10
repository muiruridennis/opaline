import React from 'react';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ type = 'info', message, onClose }) => {
  const typeClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${typeClasses[type]} relative`}>
      {message}
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 text-lg text-gray-500">&times;</button>
      )}
    </div>
  );
};
