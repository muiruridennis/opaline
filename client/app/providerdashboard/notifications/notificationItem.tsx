import React from 'react';
import { CheckIcon, TrashIcon, CalendarIcon, StarIcon, BellIcon } from '@heroicons/react/24/solid';

interface NotificationItemProps {
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  category : 'Appointment' | 'Review' | 'Reminder';  
  onMarkAsRead: () => void;
  onDelete: () => void;
}

const categoryIcons = {
  Appointment: <CalendarIcon className="w-6 h-6 text-blue-500" />,
  Review: <StarIcon className="w-6 h-6 text-yellow-500" />,
  Reminder: <BellIcon className="w-6 h-6 text-green-500" />,
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  timestamp,
  isRead,
  category,
  onMarkAsRead,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-start justify-between p-4 rounded-lg shadow-md transition-colors ${isRead ? 'bg-gray-100' : 'bg-white border-l-4 border-blue-500'
        } hover:bg-gray-50`}
    >
      <div className="flex-1 flex items-center">
        <div className="mr-4">
          {categoryIcons[category] || <BellIcon className="w-6 h-6 text-gray-500" />}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isRead ? 'text-gray-800' : 'text-blue-600'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        {!isRead && (
          <button
            onClick={onMarkAsRead}
            className="p-2 text-green-500 hover:bg-green-100 rounded-full transition"
            aria-label="Mark as Read"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
          aria-label="Delete Notification"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;

