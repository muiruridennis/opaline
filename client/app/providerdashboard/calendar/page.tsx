"use client"
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '@/components/button';

const localizer = momentLocalizer(moment);

const dummyAppointments = [
  {
    id: 1,
    title: 'Full Body Massage - Jane Doe',
    start: new Date(2024, 8, 15, 15, 0), // Sep 15, 2024, 3:00 PM
    end: new Date(2024, 8, 15, 16, 0),
  },
  {
    id: 2,
    title: 'Facial Treatment - Michael Green',
    start: new Date(2024, 8, 18, 13, 0), // Sep 18, 2024, 1:00 PM
    end: new Date(2024, 8, 18, 14, 0),
  },
  // Add more appointments here
];

const ProviderCalendar: React.FC = () => {
  const [events, setEvents] = useState(dummyAppointments);

  // Function to handle booking details (could open a modal with more details)
  const handleSelectEvent = (event: any) => {
    alert(`Event: ${event.title}`);
    // Add logic to view event details or make changes
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Provider Calendar</h1>
        <p className="text-gray-600">Manage and view your upcoming appointments on the calendar.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <Button text="Add New Appointment" variant="primary" />
        <Button text="Manage Appointments" variant="secondary" />
      </div>
    </div>
  );
};

export default ProviderCalendar;
