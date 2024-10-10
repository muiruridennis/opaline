export interface Booking {
    id: number;
    clientName: string;
    service: string;
    dateTime: string;
    status: 'Upcoming' | 'Completed' | 'Canceled';
  }
  


export interface Service {
  id: number
  name: string;
  description: string;
  price: number;
  duration: string;
  isActive: boolean;
  image?: string;
  serviceCategory: string;
  tags:  string [];
  benefits: { benefit?: string }[];
  faqs?: { question: string; answer: string }[];
}
export interface Provider {
  id: number;
  name: string;
  bio: string;
  certifications: string[];
  approach: string;
  contact: {
    email: string;
    phone: string;
  };
  reviews: {
    clientName: string;
    reviewText: string;
  }[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
// types/notification.ts
export interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  category: NotificationCategory;
}

export type NotificationCategory = 'Appointment' | 'Review' | 'Reminder';
// src/types/referral.ts

export interface Referral {
  referralLink: string;
  totalReferrals: number; // Total number of successful referrals
  rewardsEarned: number; // Total rewards earned from referrals
  referralHistory: ReferralHistory[]; // List of referral activities
}

export interface ReferralHistory {
  referralCode: string; // Unique code for each referral
  referredName: string; // Name of the person referred
  status: 'Pending' | 'Completed' | 'Rejected'; // Status of the referral
  date: string; // Date when the referral was made
  reward: number; // Reward earned from this referral
}
