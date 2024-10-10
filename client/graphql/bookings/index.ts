import { gql } from '@apollo/client';

export const CREATE_FEATURE_FLAG_MUTATION = gql`
    query GetBookingsByUser {
        bookings(where: { userId: $userId }) {
        id
        bookingDate
        bookingTime
        status
        price
        provider {
            id
            name
        }
        client {
            id
            name
        }
        }
    },
  `;
  export const CANCEL_BOOKING_MUTATION = gql`
  mutation CancelBooking($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      id
      status
    }
  }
`;

export const CONFIRM_BOOKING_MUTATION = gql`
  mutation ConfirmBooking($input: ConfirmBookingInput!) {
    confirmBooking(input: $input) {
      id
      bookingDateTime
      status
    }
  }
`;

export const GET_CLIENT_BOOKINGS = gql`
  query {
    getBookings {
      id
      bookingDateTime
      status
      service {
        id
        name
      }
      provider {
        id
        businessName
        bio
        description
        approach
      }
    }
  }
`;

export const GET_PROVIDER_BOOKINGS = gql`
  query {
    getBookings {
      id
      bookingDateTime
      status
      service {
        id
        name
      }
      client {
        id
        
      }
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation deleteBooking($bookingId: Int!) {
    deleteBooking(bookingId: $bookingId)
  }
`;