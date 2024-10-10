"use client"
import React from 'react';
import ServicesLayout from './ServicesLayout';
import { FilterProvider } from '@/providers/FilterContext';

const ServicesPage: React.FC = () => {
    return (
        <FilterProvider>
            <ServicesLayout />
        </FilterProvider>
    );
};

export default ServicesPage;