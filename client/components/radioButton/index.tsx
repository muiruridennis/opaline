import React from 'react';

interface RadioButtonProps {
  name: string;
  options: string[];
  selectedValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inline?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ name, options, selectedValue, onChange, inline = false }) => {
  return (
    <div className={`flex ${inline ? 'space-x-4' : 'flex-col space-y-2'}`}>
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2">
          <input 
            type="radio" 
            name={name} 
            value={option} 
            checked={selectedValue === option} 
            onChange={onChange} 
            className="form-radio"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};
