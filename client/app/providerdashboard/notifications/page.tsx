'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import NotificationItem from './notificationItem';
import { DELETE_NOTIFICATION, GET_NOTIFICATIONS, MARK_AS_READ } from '@/graphql/notifications';
import { Notification } from '@/types/types';

const NotificationsPage: React.FC = () => {
  const { data, loading, error, refetch } = useQuery<{ notifications: Notification[] }>(GET_NOTIFICATIONS);
  const [markAsRead] = useMutation(MARK_AS_READ);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');


  const notifications = data?.notifications || [];

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'read':
        return notifications.filter(n => n.isRead);
      case 'unread':
        return notifications.filter(n => !n.isRead);
      default:
        return notifications;
    }
  }, [filter, notifications]);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotification({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };
  if (loading) return <p className="text-center text-gray-500">Loading notifications...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">Notifications</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-md ${
            filter === 'unread' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-md ${
            filter === 'read' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Read
        </button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              category={notification.category}
              title={notification.title}
              description={notification.description}
              timestamp={notification.timestamp}
              isRead={notification.isRead}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications to show.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
