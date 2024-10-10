import React from 'react';
import BookingOverview from './BookingOverview';
import BookingActions from './BookingActions';
import BookingDetails from './BookingDetails';
import RecurringBookingsManager from './RecurringBookingsManager';
import ClientCommunication from './ClientCommunication';
import BookingSettings from './BookingSettings';
import PaymentsManager from './PaymentsManager';
import FiltersAndSearch from './FiltersAndSearch';
import AnalyticsDashboard from './AnalyticsDashboard';

const ProviderDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bookings</h1>
      <BookingOverview />
        <BookingActions />
        <RecurringBookingsManager />
        <BookingSettings />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      </div>
    </div>
  );
};

export default ProviderDashboard;
