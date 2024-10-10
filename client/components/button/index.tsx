import React, { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled' | 'info' | 'warning'| "text"| "oceanBlue";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  text?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled,
  fullWidth = false,
  className = '',
  type = 'button',
  text,
  icon,
  size = 'medium'
}) => {
  const baseStyle = 'rounded focus:outline-none transition-all flex items-center justify-center';

  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const styles = {
    primary: 'bg-indigo-600 text-white',
    secondary: 'bg-gray-500 text-white',
    outline: 'border border-blue-500 text-blue-500',
    info: 'bg-red-600 text-white',
    warning: ' bg-red-400 text-black',
    text:"text-black",
    disabled: 'bg-gray-200 text-gray-500 cursor-not-allowed',
    oceanBlue: 'bg-[#227B94] text-white',
  }

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
      type={type}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
