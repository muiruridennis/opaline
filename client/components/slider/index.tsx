import * as RadixSlider from '@radix-ui/react-slider';
import React from 'react';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, onValueChange, max , step = 1 }) => {
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      aria-label="Price Range"
    >
      <RadixSlider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-blue-500 rounded-full h-full"  />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-gray-500 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <RadixSlider.Thumb
        className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-gray-500 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </RadixSlider.Root>
  );
};

export default Slider;
