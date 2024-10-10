import React, { useState } from 'react';
import ServiceFilter from './ServiceFilter';
import ServicesList from './ServicesList';
import ReusableDialog from '@/components/dialog';
import { servicesData } from '@/constants/dummyData';


const ServicesLayout: React.FC = () => {
  const [sortBy, setSortBy] = useState('price-asc');
  const providerNames = Array.from(new Set(servicesData.map((service) => service.providerName)));

  return (
    <div className="container mx-auto py-8 px-4">
    <div className="hidden lg:grid grid-cols-4 gap-8">
      {/* Left Sidebar */}
      <div className="col-span-1">
        <ServiceFilter providers={providerNames} setSortBy={setSortBy} /> {/* Pass setSortBy */}
      </div>

      <div className="col-span-3">
        <ServicesList sortBy={sortBy} /> 
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="lg:hidden">
      <ReusableDialog
        triggerText="Filter Services"
        title="Filter Services"
        description="Select your desired filters to narrow down the services."
      >
        <ServiceFilter providers={providerNames} setSortBy={setSortBy} /> 
      </ReusableDialog>
      <div className="mb-4"></div>

      {/* Mobile Service Listings */}
      <div className="grid grid-cols-1 gap-6">
        <ServicesList sortBy={sortBy} /> 
      </div>
    </div>
  </div>
  );
};

export default ServicesLayout;
