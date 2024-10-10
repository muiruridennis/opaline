"use client"
import React from 'react';
import { Checkbox } from '@/components/checkbox';
import Input from '@/components/input';
import { Select } from '@/components/select';
import Switch from '@/components/switch';
import TextArea from '@/components/textArea';

import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/button';




type BookingSettingsFormValues = {
  slotDuration: string;
  breakTime: string;
  cancellationPolicy: string;
  reschedulePolicy: string;
  maxBookingsPerDay: number;
  notifications: boolean;
  bufferTime: string;
  clientRestrictions: boolean;
};

const BookingSettings: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingSettingsFormValues>();

  const onSubmit: SubmitHandler<BookingSettingsFormValues> = (data) => {
    console.log(data);
  };

  const notificationsEnabled = watch('notifications', false);
  const clientRestrictionsEnabled = watch('clientRestrictions', false);

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-lg font-semibold">Booking Settings</h2>

        <div>
          <label>Slot Duration</label>
          <Select
            name="slotDuration"
            options={[
              { label: '15 minutes', value: '15' },
              { label: '30 minutes', value: '30' },
              { label: '1 hour', value: '60' },
            ]}
            value=""
            onChange={() => { }}
            error={errors.slotDuration?.message}
          />
        </div>

        <div>
          <label>Break Time Between Slots</label>
          <Input
            type="text"
            name="breakTime"
            register={register}
            placeholder="E.g. 15 minutes"
            error={errors.breakTime?.message}
          />
        </div>

        <div>
          <label>Cancellation Policy</label>
          <TextArea
            name="cancellationPolicy"
            placeholder="Specify your cancellation policy..."
            register={register}
            error={errors.cancellationPolicy?.message}
          />
        </div>

        <div>
          <label>Reschedule Policy</label>
          <TextArea
            name="reschedulePolicy"
            placeholder="Specify your reschedule policy..."
            register={register}
            error={errors.reschedulePolicy?.message}
          />
        </div>

        <div>
          <label>Max Bookings Per Day</label>
          <Input
            type="number"
            name="maxBookingsPerDay"
            register={register}
            placeholder="E.g. 5"
            error={errors.maxBookingsPerDay?.message}
          />
        </div>

        <div>
          <Switch
            label="Enable Notifications"
            checked={notificationsEnabled}
            onChange={() => setValue('notifications', !notificationsEnabled)}
          />
        </div>

        {notificationsEnabled && (
          <div>
            <label>Buffer Time Between Bookings</label>
            <Input
              type="text"
              name="bufferTime"
              register={register}
              placeholder="E.g. 10 minutes"
              error={errors.bufferTime?.message}
            />
          </div>
        )}

        <div>
          <Switch
            label="Enable Client Restrictions"
            checked={clientRestrictionsEnabled}
            onChange={() => setValue('clientRestrictions', !clientRestrictionsEnabled)}
          />
        </div>

        {clientRestrictionsEnabled && (
          <div>
            <Checkbox
              label="Limit repeat bookings"
              checked={false}
              onChange={() => { }}
            />
          </div>
        )}

        <Button
        type="submit" 
        text="Save Settings"
        />
      </form>
    </div>
  );
};

export default BookingSettings;