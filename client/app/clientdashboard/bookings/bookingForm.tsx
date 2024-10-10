"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import Input from "../../../components/input"
import  Button  from '../../../components/button';

interface BookingFormData {
  service: string;
  provider: string;
  date: string;
  time: string;
  status: string;
}

const BookingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    defaultValues: {
      service: '',
      provider: '',
      date: '',
      time: '',
      status: ""
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
    // Handle form submission here, such as sending data to the backend or updating state
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <Input
          type="text"
          name="service"
          placeholder="Service name"
          register={register}
        />
        {errors.service && (
          <span className="text-red-600 text-sm">Service name is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Provider
        </label>
        <Input
          type="text"
          name="provider"
          placeholder="Provider name"
          register={register}
        />
        {errors.provider && (
          <span className="text-red-600 text-sm">Provider name is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <Input
          type="date"
          name="date"
          register={register}
        />
        {errors.date && (
          <span className="text-red-600 text-sm">Date is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <Input
          type="date"
          name="time"
          placeholder="time"
          register={register}
        />
        {errors.time && (
          <span className="text-red-600 text-sm">Time is required</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <Input
          type="text"
          name="status"
          placeholder="Status"
          register={register}
        />
        {errors.status && (
          <span className="text-red-600 text-sm">Status is required</span>
        )}
      </div>

      <div className="flex justify-end mt-8 gap-4 ">
        <Button
          type="submit"
          variant='primary'
          text=" Save Changes"
        />
         
        <Button 
        type="button" 
        variant='info'
        text="Cancel Booking"
        />
       
      </div>
    </form>
  );
};

export default BookingForm;
