import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  register,
  onChange,
  error,
  className
}) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...(register
          ? register(name) // When using register, pass register props only
          : { name, onChange, value })} // When not using register, handle manually      
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;

