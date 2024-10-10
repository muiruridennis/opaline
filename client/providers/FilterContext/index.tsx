import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextProps {
  minPrice: number;
  maxPrice: number;
  duration: string;
  providerName: string;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
}

interface FilterState {
  minPrice: number;
  maxPrice: number;
  duration: string;
  providerName: string;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFiltersState] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 150,
    duration: '',
    providerName: '',
  });

  const setFilters = (newFilters: FilterState) => {
    setFiltersState(newFilters);
  };

  const resetFilters = () => {
    setFiltersState({
      minPrice: 0,
      maxPrice: 150,
      duration: '',
      providerName: '',
    });
  };

  return (
    <FilterContext.Provider value={{ ...filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
