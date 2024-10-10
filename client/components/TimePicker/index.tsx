import React from 'react';
import { Select } from '@/components/select';

interface TimePickerProps {
  selectedDate: string;
  onChange: (value: string) => void;
  unavailableTimes: string[];
  error?: string;
}

const availableTimes = [
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM"
];

const CustomTimePicker: React.FC<TimePickerProps> = ({ selectedDate, onChange, unavailableTimes, error }) => {
  if (!selectedDate) {
    return (
      <div className="m-3 md:m-2 sm:m-1 text-red-500">
        <h2 >Please select a date first.</h2>
      </div>
    )
  }

  // Prepare options with disabled states
  const timeOptions = availableTimes.map(time => ({
    label: time,
    value: time,
    disabled: unavailableTimes.includes(time)
  }));

  return (
    <div>
      <Select
        name="selectedTime"
        options={timeOptions}
        value={unavailableTimes.includes(timeOptions.find(opt => opt.disabled)?.value || "") ? "" : ""}
        onChange={(e) => onChange(e.target.value)}
        showUnavailable={true} // Pass this to show unavailable times
        error={error}
        className="w-full"
      />
      {/* Display a helper text if needed */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTimePicker;
