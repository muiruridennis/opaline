"use client"
import React, { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@/components/avatar';
import Input from '@/components/input';
import Button from '../../../components/button';
import ReusableAlertDialog from '@/components/alertDialogue';


export default function AccountSettings() {
  const [profileImage, setProfileImage] = useState('/assets/default-profile.jpg');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const handleCancelDelete = () => {
    console.log('Account deletion canceled');
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h1>

        {/* Profile Information */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className='mb-5'>
              <Avatar
                src='/assets/Angle.jpg'
                alt='Profile Photo'
                size='medium'
                placeholder='Profile Photo'
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer">
              <ArrowUpTrayIcon className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">Change Profile Picture</h2>
            <p className="text-sm text-gray-600">Click the image to upload a new profile picture.</p>
          </div>
        </div>

        <form>
          {/* Personal Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Personal Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  type="email"
                  name='email'
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name='email'
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Change Password</h2>
            <button
              type="button"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-indigo-600 hover:underline"
            >
              {showPasswordChange ? 'Cancel' : 'Change Password'}
            </button>
            {showPasswordChange && (
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>

                  <Input
                    type="password"
                    name='currentPassword'
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                  <Input
                    type="password"
                    name='newPassword'
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 text-sm text-gray-600">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">Privacy Settings</label>
              </div>
            </div>
          </div>

          {/* Account Deletion */}

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Account</h2>
            <ReusableAlertDialog
              triggerText="Delete account"
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              cancelText="Cancel"
              confirmText="Yes, delete account"
              onConfirm={handleDeleteAccount}
              onCancel={handleCancelDelete}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              text="Save Changes"
            />
           
          </div>
        </form>
      </div>
    </div>
  );
}
