
import { CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';

export type BookingStatus = 'Confirmed' | 'Pending' | 'Canceled' | 'Completed';

interface StatusStyles {
    textColor: string;
    bg: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const statusStyles: Record<BookingStatus, StatusStyles> = {
    Confirmed: {
        textColor: 'text-green-500',
        bg: 'bg-green-100',
        icon: CheckCircleIcon,
    },
    Pending: {
        textColor: 'text-yellow-500',
        bg: 'bg-yellow-100',
        icon: ClockIcon,
    },
    Canceled: {
        textColor: 'text-red-500',
        bg: 'bg-red-100',
        icon: XCircleIcon,
    },
    Completed: {
        textColor: 'text-blue-500',
        bg: 'bg-blue-100',
        icon: CheckCircleIcon,
    },
};
