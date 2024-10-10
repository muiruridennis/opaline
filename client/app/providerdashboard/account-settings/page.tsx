"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/input';
import Button from '@/components/button';
import ReusableAlertDialog from '@/components/alertDialogue';
import Switch from '@/components/switch';

const accountSettingsSchema = z.object({
  email: z.string().email('Invalid email address'),
  currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Please confirm your new password')
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });


type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;

const AccountSettings: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AccountSettingsFormValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const onSubmit: SubmitHandler<AccountSettingsFormValues> = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };
  const handleDeleteAccount = () => {
    console.log('Account deleted');
  };

  const handleCancelDelete = () => {
    console.log('Account deletion canceled');
  };
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
      <p className="mt-1 text-gray-600">Manage your account information and preferences.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-medium text-gray-800">Email Address</h2>
          <p className="text-gray-600 mb-4">Update your email address for account notifications.</p>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            register={register}
            error={errors.email?.message}
            className="mb-4"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-medium text-gray-800">Password Management</h2>
          <p className="text-gray-600 mb-4">Change your password and manage security settings.</p>
          <Input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            register={register}
            error={errors.currentPassword?.message}
            className="mb-4"
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            register={register}
            error={errors.newPassword?.message}
            className="mb-4"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            register={register}
            error={errors.confirmPassword?.message}
            className="mb-4"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-medium text-gray-800">Notification Preferences</h2>
          <p className="text-gray-600 mb-4">Choose how you want to receive notifications.</p>

          <div>
            <Switch
              label="Enable Notifications"
            // checked={""}
            // onChange={() => setValue('notifications', !notificationsEnabled)}
            />
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-medium text-gray-800">Account Deactivation</h2>
          <p className="text-gray-600 mb-4">Deactivate your account if you no longer wish to use our services.</p>
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

        <div className="flex justify-end space-x-2">
          <Button type="submit"
            text="Save Changes"
          />
          <Button
            type="button"
            text="Cancel"
            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
          />
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
