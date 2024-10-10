import React, { useState } from 'react';

interface TabsProps {
  tabs: { label: string; content: React.ReactNode; icon?: React.ReactNode }[];
  orientation?: 'horizontal' | 'vertical';
}

export const Tabs: React.FC<TabsProps> = ({ tabs, orientation = 'horizontal' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const orientationClasses = {
    horizontal: 'flex',
    vertical: 'flex flex-col',
  };

  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'}`}>
      <div className={orientationClasses[orientation]}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-center ${
              activeIndex === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'border-b-2 border-transparent text-gray-600'
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};
