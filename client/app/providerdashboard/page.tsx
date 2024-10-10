"use client"
import { CalendarIcon, BriefcaseIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import Button from '@/components/button';
import { Card } from '@/components/card';
import { Avatar } from '@/components/avatar';
import { useAuth } from '@/providers/AuthProvider'; // Importing auth context
import { Spinner } from '@/components/spinner';
import { ClockIcon, Star, UsersIcon } from 'lucide-react';
import { PerformanceAnalytics } from './performanceAnalysis';
import Link from 'next/link';

const summaryData = [
    {
        title: "Total Revenue",
        value: "$12,500",
        description: "Overall earnings",
        icon: <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />,
        bgColor: "bg-blue-50",
    },
    {
        title: "Total Bookings",
        value: 125,
        description: "Completed appointments",
        icon: <CalendarIcon className="h-8 w-8 text-green-600" />,
        bgColor: "bg-green-50",
    },
    {
        title: "Appointments",
        value: "$100",
        description: "Completed Appointments",
        icon: <BriefcaseIcon className="h-8 w-8 text-yellow-600" />,
        bgColor: "bg-yellow-50",
    },
    {
        title: "Top Service",
        value: "Full Body Massage",
        description: "Highest-earning service",
        icon: <StarIcon className="h-8 w-8 text-purple-600" />,
        bgColor: "bg-purple-50",
    },
    {
        title: "Customer Satisfaction",
        value: "4.8/5",
        description: "Based on client feedback",
        icon: <Star />,
        bgColor: "bg-yellow-100"
    },
    {
        title: "Repeat Customers",
        value: "45",
        description: "Clients who booked again",
        icon: <UsersIcon />,
        bgColor: "bg-green-100"
    },
    {
        title: "Average Session Duration",
        value: "1h 30m",
        description: "Per session",
        icon: <ClockIcon />,
        bgColor: "bg-purple-100"
    }
];

export const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, idx) => (
            <Card
                key={idx}
                title={item.title}
                description={item.description}
                icon={item.icon}
                value={item.value}
                bgColor={item.bgColor}
            // className="p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            />
        ))}
    </div>
);

const ProviderOverview: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <div>No user found. Please log in.</div>;
    }

    const { name, email } = user;
    const initials = name
        ? name.split(' ').map((word: string) => word[0]).join('').toUpperCase()
        : '';

    return (
        <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {name}!</h1>
                    <p className="mt-2">Here’s a quick overview of your performance and upcoming appointments.</p>
                </div>
                <Avatar placeholder={initials} size="large" />
            </div>
            <div className="flex space-x-4 mt-2">
                <Link href="/providerdashboard/calendar">
                    <Button text="View Calendar" variant="primary" />
                </Link>
                <Button text="Add New Service" variant="secondary" />
                <Button text="Manage Bookings" variant="secondary" />
                <Button text="Update Profile" variant="secondary" />
            </div>

            <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                <SummaryCards />
            </div>

            <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                <PerformanceAnalytics />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
                    <div className="space-y-4">
                        {[
                            { client: 'Jane Doe', date: 'Sep 15, 2024 - 3:00 PM' },
                            { client: 'Michael Green', date: 'Sep 18, 2024 - 1:00 PM' },
                        ].map((appointment, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div>
                                    <p className="text-sm font-medium">{appointment.client}</p>
                                    <p className="text-sm text-gray-500">{appointment.date}</p>
                                </div>
                                <Button text="View" variant="primary" size='small' />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Feedback */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Sarah Johnson', feedback: 'Amazing service!', rating: 5 },
                            { name: 'John Doe', feedback: 'Very relaxing.', rating: 4 },
                        ].map((review, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div>
                                    <p className="text-sm font-medium">{review.name}</p>
                                    <p className="text-sm text-gray-500">{`Rating: ${review.rating}/5`}</p>
                                    <p className="text-sm">{review.feedback}</p>
                                </div>
                                <Button text="Respond" variant="secondary" size='small' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderOverview;

