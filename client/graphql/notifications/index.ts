import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      title
      description
      timestamp
      isRead
      category
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($id: Int!) {
    markNotificationAsRead(id: $id) {
      id
      isRead
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: Int!) {
    deleteNotification(id: $id)
  }
`;