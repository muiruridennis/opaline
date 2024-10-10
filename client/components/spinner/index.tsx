import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'circular' | 'dots';
  className?: string;  // New prop for custom styling
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', type = 'circular', className }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const renderSpinner = () => {
    if (type === 'dots') {
      return (
        <div className={`flex space-x-1 ${className}`}>
          <div className={`animate-bounce ${sizeClasses[size]} bg-gray-500 rounded-full`}></div>
          <div className={`animate-bounce ${sizeClasses[size]} bg-gray-500 rounded-full delay-200`}></div>
          <div className={`animate-bounce ${sizeClasses[size]} bg-gray-500 rounded-full delay-400`}></div>
        </div>
      );
    }
    // Circular spinner
    return (
      <div className={`border-t-4 border-blue-500 border-solid rounded-full ${sizeClasses[size]} animate-spin ${className}`}></div>
    );
  };

  return <div className="flex justify-center items-center">{renderSpinner()}</div>;
};
