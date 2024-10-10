import { Injectable } from '@nestjs/common';
import { Notification } from './entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
      ) {}
  private notifications: Notification[] = [
    {
      id: 1,
      title: 'New Appointment Request',
      description: 'You have a new massage appointment request from John Doe.',
      timestamp: '2 hours ago',
      isRead: false,
      category: 'Appointment',
    },
    {
      id: 2,
      title: 'Service Review',
      description: 'Your service has been rated 5 stars by Sarah!',
      timestamp: '1 day ago',
      isRead: true,
      category: 'Review',
    },
    {
      id: 3,
      title: 'Upcoming Appointment Reminder',
      description: 'You have an appointment with Jane Smith tomorrow at 2 PM.',
      timestamp: '3 days ago',
      isRead: false,
      category: 'Reminder',
    },
  ];

  getNotifications(): Notification[] {
    return this.notifications;
  }

  markAsRead(id: number): Notification | null {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.isRead = true;
      return notification;
    }
    return null;
  }

  deleteNotification(id: number): boolean {
    const initialLength = this.notifications.length;
    this.notifications = this.notifications.filter((n) => n.id !== id);
    return this.notifications.length < initialLength;
  }

//   async getNotifications(): Promise<Notification[]> {
//     return this.notificationRepository.find();
//   }

//   async markAsRead(id: number): Promise<Notification> {
//     const notification = await this.notificationRepository.findOne({ where: { id } });
//     if (notification) {
//       notification.isRead = true;
//       return this.notificationRepository.save(notification);
//     }
//     throw new Error('Notification not found');
//   }

//   async deleteNotification(id: number): Promise<boolean> {
//     const result = await this.notificationRepository.delete(id);
//     return result.affected > 0;
//   }
}
