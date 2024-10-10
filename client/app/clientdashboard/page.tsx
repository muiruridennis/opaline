"use client"
import Button from "@/components/button";
import { Card } from "@/components/card";
import { Referral } from "@/types/types";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, ClipboardCopyIcon, ClockIcon, UserIcon } from "lucide-react";
import ReferralProgram from "./ReferralProgram";

const summaryData = [
  {
    title: "Total Appointments",
    value: 30,
    description: "Total appointments booked",
    icon: <CalendarIcon className="h-8 w-8 text-green-600" />,
    bgColor: "bg-green-50",
  },
  {
    title: "Upcoming Appointments",
    value: 5,
    description: "Appointments scheduled",
    icon: <ClockIcon className="h-8 w-8 text-yellow-600" />,
    bgColor: "bg-yellow-50",
  },
  {
    title: "Past Appointments",
    value: 25,
    description: "Appointments completed",
    icon: <CheckCircleIcon className="h-8 w-8 text-gray-600" />,
    bgColor: "bg-gray-50",
  },
  {
    title: "Services Used",
    value: 7,
    description: "Different services consumed",
    icon: <ListBulletIcon className="h-8 w-8 text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Profile Completion",
    value: "80%",
    description: "Complete your profile for better service",
    icon: <UserIcon className="h-8 w-8 text-purple-600" />,
    bgColor: "bg-purple-50",
  },
];
interface Appointment {
  id: number;
  serviceProvider: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM AM/PM
  service: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
}

// Mock data for upcoming appointments
const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    serviceProvider: 'John Doe',
    date: '2024-09-10',
    time: '10:00 AM',
    service: 'Haircut',
    status: 'Scheduled',
  },
  {
    id: 2,
    serviceProvider: 'Jane Smith',
    date: '2024-09-12',
    time: '02:30 PM',
    service: 'Massage',
    status: 'Scheduled',
  },
  {
    id: 3,
    serviceProvider: 'Mike Johnson',
    date: '2024-09-15',
    time: '04:00 PM',
    service: 'Nail Treatment',
    status: 'Scheduled',
  },
];



export const mockReferralData: Referral = {
  referralLink: 'https://opaline.com/referral?code=ABC123XYZ',
  totalReferrals: 10,
  rewardsEarned: 250, // Total rewards earned
  referralHistory: [
    {
      referralCode: 'REF001',
      referredName: 'John Doe',
      status: 'Completed',
      date: '2024-01-15',
      reward: 50, // Reward earned for this referral
    },
    {
      referralCode: 'REF002',
      referredName: 'Jane Smith',
      status: 'Completed',
      date: '2024-02-20',
      reward: 100, // Reward earned for this referral
    },
    {
      referralCode: 'REF003',
      referredName: 'Alice Johnson',
      status: 'Pending',
      date: '2024-03-05',
      reward: 0, // No reward until completion
    },
    {
      referralCode: 'REF004',
      referredName: 'Bob Brown',
      status: 'Rejected',
      date: '2024-03-10',
      reward: 0, // No reward as the referral was rejected
    },
    {
      referralCode: 'REF005',
      referredName: 'Charlie White',
      status: 'Completed',
      date: '2024-04-01',
      reward: 100, // Reward earned for this referral
    },
  ],
};



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
export default function ClientDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-blue-300 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
            Welcome, Dennis
          </h1>
          <button className="py-2 px-4 bg-white text-indigo-600 rounded-md shadow-md hover:bg-gray-200 transition">
            New Booking
          </button>
        </div>
        <div className="p-4 border border-gray-300 rounded-md shadow-sm mt-1">
          <SummaryCards />
        </div>
        <div className="p-6 bg-gray-50">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {/* Upcoming Appointments Section */}
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Your Upcoming Appointments</h3>
      <ul className="space-y-6">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex justify-between items-center p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-indigo-600 mr-4" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {appointment.service}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Provider: {appointment.serviceProvider}
                  </p>
                </div>
              </div>
              <button className="py-2 px-5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                View Details
              </button>
            </li>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No upcoming appointments.</p>
            <button className="mt-6 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Book a New Appointment
            </button>
          </div>
        )}
      </ul>
    </div>

      <ReferralProgram referralData={mockReferralData} />
  </div>
</div>

      </div>
    </div>
  );
}
