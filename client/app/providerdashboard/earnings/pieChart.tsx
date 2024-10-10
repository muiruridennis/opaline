import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  earningsData: { service: string; amount: number }[];
  height: number; 
}

const earningsData = [
    { service: 'Massage', amount: 500 },
    { service: 'Facial', amount: 300 },
    { service: 'Manicure', amount: 200 },
    { service: 'Pedicure', amount: 150 },
    { service: 'Haircut', amount: 100 },
    { service: 'Makeup', amount: 50 },
  ];
export const PieChart: React.FC = () => {
  // Group smaller earnings into "Other"
  const limit = 5; // Show top 5 services
  const sortedData = [...earningsData].sort((a, b) => b.amount - a.amount);
  const topServices = sortedData.slice(0, limit);
  const otherServices = sortedData.slice(limit);

  const totalOtherEarnings = otherServices.reduce((sum, service) => sum + service.amount, 0);

  const pieData = {
    labels: [...topServices.map(service => service.service), 'Other'],
    datasets: [
      {
        data: [...topServices.map(service => service.amount), totalOtherEarnings],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <Pie data={pieData} />
    </div>
  );
};
