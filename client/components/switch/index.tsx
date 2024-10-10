import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`flex items-center space-x-2 ${className}`}>
      <span>{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only" // Hide default checkbox
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`block w-11 h-6 rounded-full transition-colors duration-300 ease-in-out content-center ${
            checked ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
        <div
          className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ease-in-out transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );
};

export default Switch;
