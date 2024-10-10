import React from 'react';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, position = 'top', children }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:block`}>
        <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-no-wrap">
          {text}
          <div className={`absolute w-0 h-0 border-8 border-transparent ${position === 'top' ? 'border-t-black' : ''} ${position === 'bottom' ? 'border-b-black' : ''} ${position === 'left' ? 'border-l-black' : ''} ${position === 'right' ? 'border-r-black' : ''}`}>
          </div>
        </div>
      </div>
    </div>
  );
};
