"use client"
import React, { useState, useMemo } from 'react';
import { dummyBookings } from '@/constants/dummyData';
import Button from '@/components/button';
import Dialog from '@/components/dialog';

const bookings = dummyBookings;

import { FaEye, FaPencilAlt, FaTimes, FaCheck } from 'react-icons/fa'; // Importing icons
import ReusableAlertDialog from '@/components/alertDialogue';

const BookingTable: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<'Upcoming' | 'Completed' | 'Canceled' | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredBookings = useMemo(() => {
    if (filterStatus === 'All') return bookings;
    return bookings.filter(booking => booking.status === filterStatus);
  }, [filterStatus, bookings]);

  const sortedBookings = useMemo(() => {
    return filteredBookings.slice().sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [filteredBookings, sortOrder]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleReschedule = (booking: Booking) => {
    alert(`Reschedule ${booking.clientName}`);
  };

  const handleCancel = (booking: Booking) => {
    alert(`Cancel ${booking.clientName}`);
  };

  const handleMarkAsCompleted = (booking: Booking) => {
    alert(`Mark ${booking.clientName} as Completed`);
  };
  const handleCancelDelete = () => {
    console.log('Booking deletion canceled');
  };
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
       <h2 className="text-2xl font-semibold mb-4 ">Booking Overview</h2>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'Upcoming' | 'Completed' | 'Canceled' | 'All')}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
        <label className="text-sm font-medium text-gray-700">Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.dateTime).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Upcoming' ? 'bg-green-100 text-green-800' : booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <div className="flex items-center space-x-4">
                  <Dialog
                    triggerText={<FaEye className="cursor-pointer text-gray-600 hover:text-black" title="View" />}
                    title="Booking Details"
                    description="View the details of this booking."
                    confirmButtonText="Close"
                    onConfirm={() => handleViewDetails(booking)}
                  >
                    {selectedBooking && (
                      <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white">
                              {selectedBooking.clientName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">{selectedBooking.clientName}</h2>
                            <p className="text-sm text-gray-500">{selectedBooking.service}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Service</p>
                            <p className="text-base font-semibold text-gray-900">{selectedBooking.service}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date & Time</p>
                            <p className="text-base font-semibold text-gray-900">
                              {new Date(selectedBooking.dateTime).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200"></div>

                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-500">Status</p>
                          <span className={`px-3 py-1 text-sm rounded-full font-semibold ${selectedBooking.status === 'Upcoming' ? 'bg-green-100 text-green-800' : selectedBooking.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>

                    )}
                  </Dialog>
                  {booking.status === 'Upcoming' && (
                    <>
                      <Dialog
                        triggerText={<FaPencilAlt className="cursor-pointer text-blue-600 hover:text-black h-8 " title="Reschedule" />}
                        title="Decline Booking"
                        description="Are you sure you want to decline this booking? You can suggest an alternative time or provide a reason."
                        confirmButtonText="Decline"
                        onConfirm={() => handleReschedule(booking)}
                      >
                        <textarea
                          placeholder="Optional: Provide a reason for declining"
                          className="p-2 border border-gray-300 rounded-md w-full"
                        />
                      </Dialog>
                      <ReusableAlertDialog
                        triggerText={ <FaTimes className="cursor-pointer text-red-600 hover:text-black"  title="Cancel" />}
                        title="Are you absolutely sure?"
                        description="Canceling this booking will remove it from your schedule. Are you sure you want to proceed?"
                        cancelText="Cancel"
                        confirmText="Yes, Cancel this booking"
                        onConfirm={() => handleCancel(booking)}
                        onCancel={handleCancelDelete}
                        variant="text"
                      />

                      <FaCheck className="cursor-pointer text-green-600 hover:text-black" onClick={() => handleMarkAsCompleted(booking)} title="Mark as Completed" />
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookingTable