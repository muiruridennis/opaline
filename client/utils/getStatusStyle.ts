import { BookingStatus, statusStyles } from './statusStyles';

export const getStatusStyle = (status: BookingStatus) => {
  return statusStyles[status] || statusStyles['Pending']; 
};
