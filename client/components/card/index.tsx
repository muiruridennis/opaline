import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  value: string | number;  
  bgColor?: string;  
}

export const Card: React.FC<CardProps> = ({ title, description, icon, value, bgColor = 'bg-white' }) => {
  return (
    <div className={`${bgColor} border rounded-lg p-4 shadow-lg flex items-center`}>
      <div className="flex-shrink-0">
        {icon && <div className="text-3xl text-gray-600">{icon}</div>}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};
