
import React from 'react';

interface SelectProps {
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string;
  showUnavailable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  error,
  className = '',
  showUnavailable = false,
}) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:ring-indigo-500 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label} {option.disabled && showUnavailable ? "(Unavailable)" : ""}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
