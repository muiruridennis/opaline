import { Card } from '@/components/card';
import { FaDollarSign, FaCalendarAlt, FaChartLine, FaStar } from 'react-icons/fa';

const summaryData = [
  {
    title: "Total Revenue",
    value: "$12,500",
    description: "Overall earnings",
    icon: <FaDollarSign />,
    bgColor: "bg-blue-100"
  },
  {
    title: "Total Bookings",
    value: 125,
    description: "Completed appointments",
    icon: <FaCalendarAlt />,
    bgColor: "bg-green-100"
  },
  {
    title: "Avg Earnings per Booking",
    value: "$100",
    description: "Average per appointment",
    icon: <FaChartLine />,
    bgColor: "bg-yellow-100"
  },
  {
    title: "Top Service",
    value: "Full Body Massage",
    description: "Highest-earning service",
    icon: <FaStar />,
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
      />
    ))}
  </div>
);
