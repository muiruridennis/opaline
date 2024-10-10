"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircleIcon, ClockIcon, TrashIcon, EyeIcon, DownloadIcon, XCircleIcon } from 'lucide-react';
import ReusableAlertDialog from '@/components/alertDialogue';
import { getStatusStyle } from '@/utils/getStatusStyle';
import BookingCard from './bookingCard';
import { BookingStatus } from '@/utils/statusStyles';

// Mock data (Replace with actual data fetching logic)
interface Booking {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  status: BookingStatus;
}
const upcomingBookings: Booking[] = [
  // ... existing bookings
  {
    id: 'OPL-323456789',
    service: 'Manicure',
    provider: 'Sarah Lee',
    date: 'Sep 15, 2024',
    time: '3:00 PM',
    status: 'Confirmed',
  },
  {
    id: 'OPL-423456789',
    service: 'Pedicure',
    provider: 'David Kim',
    date: 'Sep 17, 2024',
    time: '11:00 AM',
    status: 'Pending',
  },
  {
    id: 'OPL-523456789',
    service: 'Haircut',
    provider: 'Emily Clark',
    date: 'Sep 18, 2024',
    time: '2:00 PM',
    status: 'Confirmed',
  },
  {
    id: 'OPL-623456789',
    service: 'Hair Coloring',
    provider: 'John Doe',
    date: 'Sep 20, 2024',
    time: '10:00 AM',
    status: 'Pending',
  },
  {
    id: 'OPL-723456789',
    service: 'Waxing',
    provider: 'Sarah Lee',
    date: 'Sep 22, 2024',
    time: '1:00 PM',
    status: 'Canceled',
  },
];

const pastBookings: Booking[] = [
  {
    id: 'OPL-777654321',
    service: 'Haircut',
    provider: 'Emily Clark',
    date: 'Aug 18, 2024',
    time: '12:00 PM',
    status: 'Completed',
  },
  {
    id: 'OPL-667654321',
    service: 'Hair Coloring',
    provider: 'Mark Johnson',
    date: 'Aug 20, 2024',
    time: '3:00 PM',
    status: 'Completed',
  },
  {
    id: 'OPL-557654321',
    service: 'Manicure',
    provider: 'Jane Smith',
    date: 'Aug 22, 2024',
    time: '11:00 AM',
    status: 'Completed',
  },
  {
    id: 'OPL-447654321',
    service: 'Pedicure',
    provider: 'John Doe',
    date: 'Aug 25, 2024',
    time: '2:00 PM',
    status: 'Completed',
  },
  {
    id: 'OPL-337654321',
    service: 'Waxing',
    provider: 'Emily Clark',
    date: 'Aug 27, 2024',
    time: '10:00 AM',
    status: 'Completed',
  },
];
const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<any>(null); // Replace with actual booking type
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Confirmed' | 'Pending' | 'Canceled'>('All');

  // Filter bookings based on search and status
  const filteredUpcomingBookings = upcomingBookings.filter((booking) => {
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const matchesSearch =
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCancelBooking = (bookingId: string) => {
    // Implement cancellation logic here
    toast.info(`Booking ${bookingId} has been canceled.`);
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };



  const handleCancelDelete = () => {
    console.log('Account deletion canceled');
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">My Bookings</h1>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`px-4 py-2 -mb-px text-lg font-medium ${activeTab === 'upcoming'
            ? 'border-indigo-600 text-indigo-600'
            : 'border-transparent text-gray-600 hover:text-gray-800'
            } border-b-2`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Bookings
        </button>
        <button
          className={`px-4 py-2 -mb-px text-lg font-medium ${activeTab === 'past'
            ? 'border-indigo-600 text-indigo-600'
            : 'border-transparent text-gray-600 hover:text-gray-800'
            } border-b-2`}
          onClick={() => setActiveTab('past')}
        >
          Past Bookings
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by service or provider"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/4"
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Canceled</option>
        </select>
      </div>

      {/* Bookings List */}
      <div>
        {activeTab === 'upcoming' ? (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredUpcomingBookings.length > 0 ? (
              filteredUpcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                  onCancelBooking={handleCancelBooking}
                  onCancelDelete={handleCancelDelete}
                />
              ))
            ) : (
              <p className="text-gray-600">No upcoming bookings found.</p>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={handleViewDetails}
                  onCancelBooking={handleCancelBooking}
                  onCancelDelete={handleCancelDelete}
                />
              ))
            ) : (
              <p className="text-gray-600">No past bookings found.</p>
            )}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {/* <BookingDetailsModal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      /> */}
    </div>
  );
};

export default BookingsPage;
