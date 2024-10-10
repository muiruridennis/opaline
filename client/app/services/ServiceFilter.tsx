import React, { useState } from 'react';
import { useFilter } from '@/providers/FilterContext';
import { LuListFilter } from 'react-icons/lu';
import Slider from '../../components/slider';

interface ServiceFilterProps {
  providers: string[];
  setSortBy: (value: string) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({ providers, setSortBy }) => {
  const { minPrice, maxPrice, duration, providerName, setFilters, resetFilters } = useFilter();
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    setFilters({ minPrice: value[0], maxPrice: value[1], duration, providerName });
  };

  const handleFilterChange = () => {
    setFilters({ minPrice: priceRange[0], maxPrice: priceRange[1], duration, providerName });
  };

  const handleClearFilters = () => {
    resetFilters();
    setPriceRange([0, 500]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <LuListFilter className="text-3xl text-blue-600 " />
        <h3 className="text-xl font-semibold text-gray-800">Filter Services</h3>
      </div>

      <div className="space-y-4">
        <label className=" text-gray-700 font-medium flex items-center">
          <span className="mr-2">Price Range</span>
          <span className="text-sm text-gray-500">
            (${priceRange[0]} - ${priceRange[1]})
          </span>
        </label>
        <Slider value={priceRange} onValueChange={handlePriceChange} max={500} step={1} />
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Duration</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={duration}
          onChange={(e) => setFilters({ duration: e.target.value, minPrice: priceRange[0], maxPrice: priceRange[1], providerName })}
        >
          <option value="">All</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="1.5 hours">1.5 hours</option>
          <option value="2 hours">2 hours</option>
        </select>
      </div>

      {/* Provider Filter */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Provider</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={providerName}
          onChange={(e) => setFilters({ providerName: e.target.value, minPrice: priceRange[0], maxPrice: priceRange[1], duration })}
        >
          <option value="">All</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Sort By</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setSortBy(e.target.value)} // Call setSortBy on change
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Filter & Clear Button */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ServiceFilter;
