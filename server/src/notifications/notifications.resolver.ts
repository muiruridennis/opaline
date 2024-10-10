import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entity/notification.entity';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationService: NotificationsService) {}

  @Query(() => [Notification])
  async notifications() {
    return this.notificationService.getNotifications();
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.notificationService.deleteNotification(id);
  }
}
