"use client"
import React from 'react';
import Button from '../../../components/button';
import { recurringBookings } from "@/constants/dummyData";
import ReusableDialog from '@/components/dialog';
import Input from '@/components/input';
import { Select } from '@/components/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


interface RecurringBookingFormProps {
  onSubmit: (data: any) => void;
}

const recurringBookingSchema = z.object({
  clientName: z.string().min(1, 'Client Name is required'),
  service: z.string().min(1, 'Service is required'),
  recurrence: z.enum(['weekly', 'biweekly', 'monthly'],),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().min(1, 'End Date is required'),
});

interface RecurringBookingFormProps {
  onSubmit: (data: any) => void;
}

const RecurringBookingForm: React.FC<RecurringBookingFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(recurringBookingSchema),
  });
  const recurrence = watch('recurrence');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Client Name</label>
        <Input
          type="text"
          name="clientName"
          placeholder="Enter client name"
          register={register}
          error={errors.clientName?.message?.toString()}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <Input
          type="text"
          name="service"
          placeholder="Enter service"
          register={register}
          error={errors.service?.message?.toString()}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Recurrence</label>
        <Select
          name="recurrence"
          options={[
            { label: 'Weekly', value: 'weekly' },
            { label: 'Bi-weekly', value: 'biweekly' },
            { label: 'Monthly', value: 'monthly' },
          ]}
          value={recurrence|| ""}
          onChange={(e) => setValue('recurrence', e.target.value)}
          error={errors.recurrence?.message?.toString()}
          className='w-full'
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <Input
          type="date"
          name="startDate"
          register={register}
          error={errors.startDate?.message?.toString()}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <Input
          type="date"
          name="endDate"
          register={register}
          error={errors.endDate?.message?.toString()}
        />
      </div>
      <div>
        <Button
          type="submit"
          text="Submit"
        />
      </div>
    </form>
  );
};


interface RecurringBooking {
  id: number;
  clientName: string;
  service: string;
  recurrence: string;
  nextBooking: string;
  endDate: string;
  occurrences: number;
  status: string;
}

interface RecurringBookingListProps {
  bookings: RecurringBooking[];
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
}

const RecurringBookingList: React.FC<RecurringBookingListProps> = ({
  bookings,
  onEdit,
  onCancel,
}) => {
  const handleRecurringBookingSubmit = (data: any) => {
    console.log("Recurring booking created:", data);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Recurring Bookings</h2>
        <ReusableDialog
          triggerText="Create Recurring Booking"
          title="New Recurring Booking"
          confirmButtonText="Close"
          onConfirm={() => handleRecurringBookingSubmit}

        >
          <RecurringBookingForm onSubmit={handleRecurringBookingSubmit} />
        </ReusableDialog>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Client</th>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Recurrence</th>
            <th className="px-4 py-2">Next Booking</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t">
              <td className="px-4 py-2">{booking.clientName}</td>
              <td className="px-4 py-2">{booking.service}</td>
              <td className="px-4 py-2">{booking.recurrence}</td>
              <td className="px-4 py-2">{new Date(booking.nextBooking).toLocaleString()}</td>
              <td className="px-4 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button
                  onClick={() => onEdit(booking.id)}
                  text="Edit"
                  size='small'
                />
                <Button
                  onClick={() => onCancel(booking.id)}
                  variant="info"
                  text="Cancel"
                  size='small'
                 
                
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

const handleEditRecurringBooking = (id: number) => {
  console.log(`Edit recurring booking with ID: ${id}`);
};

const handleCancelRecurringBooking = (id: number) => {
  console.log(`Cancel recurring booking with ID: ${id}`);
};

const ProviderRecurringBookings = () => {
  return (
    <div className="">
      <RecurringBookingList
        bookings={recurringBookings}
        onEdit={handleEditRecurringBooking}
        onCancel={handleCancelRecurringBooking}
      />
    </div>
  );
};

export default ProviderRecurringBookings;
