import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Dummy data for revenue growth
const revenueData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 800 },
  { month: 'Apr', revenue: 1600 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 1800 },
  { month: 'Jul', revenue: 2500 },
  { month: 'Aug', revenue: 2200 },
];

// Dummy data for booking trends
const bookingData = [
  { month: 'Jan', bookings: 20 },
  { month: 'Feb', bookings: 35 },
  { month: 'Mar', bookings: 12 },
  { month: 'Apr', bookings: 28 },
  { month: 'May', bookings: 45 },
  { month: 'Jun', bookings: 38 },
  { month: 'Jul', bookings: 50 },
  { month: 'Aug', bookings: 42 },
];

export const PerformanceAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Growth Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Booking Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
