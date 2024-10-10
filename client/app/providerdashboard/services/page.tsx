"use client"
import React, { useState } from 'react';
import ServiceList from './ServiceList';
import { Service } from '../../../types/types'; 

const mockServices: Service[] = [
  // Mock data for development
  { id: '1', name: 'Massage Therapy', description: 'Relaxing massage', price: 50, duration: '1 hour' },
  { id: '2', name: 'Facial Treatment', description: 'Skin rejuvenation', price: 80, duration: '1.5 hours' },
];

const ProviderServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);

  return (
    <div className="p-6">
      <ServiceList services={services} />
    </div>
  );
};

export default ProviderServicesPage;
