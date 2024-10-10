"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon, ClipboardCopyIcon, ArrowRightIcon, EyeIcon, DownloadIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/button';

const ConfirmationPage = () => {
  // Generate a random booking ID (In real applications, this should come from the backend)
  const bookingId = `OPL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Function to copy booking ID to clipboard
  const copyBookingId = () => {
    // navigator.clipboard.writeText(bookingId)
    //   .then(() => {
    //     toast.success("Booking ID copied to clipboard!");
    //   })
    //   .catch(() => {
    //     toast.error("Failed to copy Booking ID.");
    //   });
  };

  // Function to handle viewing booking details (Placeholder for actual functionality)
  const viewBookingDetails = () => {
    // Redirect or open booking details modal
    // For now, we'll just toast a message
    toast.info("Redirecting to booking details...");
    // Example: router.push(`/booking/${bookingId}`);
  };

  // Function to handle downloading confirmation (Placeholder for actual functionality)
  const downloadConfirmation = () => {
    // Trigger download of confirmation PDF
    // For now, we'll just toast a message
    toast.info("Downloading confirmation...");
    // Example: generate and download PDF
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-green-200">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Success Icon */}
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4 animate-bounce" />

          {/* Confirmation Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-center mb-6">
            Thank you for your booking. Your appointment has been successfully scheduled.
          </p>

          {/* Booking ID Display */}
          <div className="w-full bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-6">
            <span className="text-gray-700 font-medium">Booking ID:</span>
            <div className="flex items-center">
              <span className="text-indigo-600 font-semibold mr-2">{bookingId}</span>
              <button onClick={copyBookingId} className="text-indigo-500 hover:text-indigo-600">
                <ClipboardCopyIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-gray-600 text-center mb-6">
            Please save your Booking ID for future reference.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full space-y-4">
            {/* View Booking Details */}
            <button
              onClick={viewBookingDetails}
              className="flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              View Booking Details
            </button>

            {/* Download Confirmation */}
            <button
              onClick={downloadConfirmation}
              className="flex items-center justify-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download Confirmation
            </button>

            {/* Return to Home */}
            <Link href="/"
              className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
