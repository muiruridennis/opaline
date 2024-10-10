import React from 'react'
import { Card } from '@/components/card';
import { FaCalendarAlt, FaCalendarCheck, FaHistory, FaDollarSign } from 'react-icons/fa';

const summaryData = [
    {
        title: "Total Bookings",
        value: 150,
        description: "Total number of bookings received",
        icon: <FaCalendarAlt />,
        bgColor: "bg-green-100"
    },
    {
        title: "Upcoming Bookings",
        value: 20, 
        description: "Bookings scheduled for the upcoming week or month",
        icon: <FaCalendarAlt />,
        bgColor: "bg-blue-100"
    },
    {
        title: "Past Bookings",
        value: 130, 
        description: "Completed or canceled bookings in the past",
        icon: <FaCalendarCheck />,
        bgColor: "bg-yellow-100"
    },
    {
        title: "Average Booking Value",
        value: "$85", 
        description: "Average revenue per booking",
        icon: <FaDollarSign />,
        bgColor: "bg-pink-100"
    }
];

const SummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, idx) => (
            <Card
                key={idx}
                title={item.title}
                description={item.description}
                icon={item.icon}
                value={item.value}
                bgColor={item.bgColor}
            />
        ))}
    </div>
);


const BookingOverview = () => {
    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-sm">
            <SummaryCards />
        </div>
    )
}

export default BookingOverview