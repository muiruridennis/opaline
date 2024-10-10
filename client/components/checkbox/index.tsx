// components/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        className="form-checkbox"
      />
      {label && <span>{label}</span>}
    </label>
  );
};
