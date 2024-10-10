import React, { useState } from 'react';
import { useFilter } from '@/providers/FilterContext';


import ReactPaginate from 'react-paginate';
import { servicesData } from '@/constants/dummyData';
import ServiceCard from './ServiceCard';

interface ServicesListProps {
  sortBy: string;
}
const ServicesList: React.FC<ServicesListProps> = ({ sortBy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 6;
  const { minPrice, maxPrice, duration, providerName } = useFilter();
  const filteredServices = servicesData.filter((service) => {
    const isPriceInRange = service.price >= minPrice && service.price <= maxPrice;
    const isDurationMatch = duration === '' || service.duration === duration;
    const isProviderMatch = providerName === '' || service.providerName === providerName;
    const isSearchMatch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    return isPriceInRange && isDurationMatch && isProviderMatch && isSearchMatch;
  });
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });
  const offset = currentPage * servicesPerPage;
  const currentPageServices = sortedServices.slice(offset, offset + servicesPerPage);
  const pageCount = Math.ceil(sortedServices.length / servicesPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="space-y-8 p-4 border border-gray-300 rounded-md shadow-sm">

      <div className="relative">
        <input
          type="text"
          placeholder="Search for services"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        />
        <svg
          className="absolute inset-y-0 right-10 pl-3 flex items-center pointer-events-none text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          width="60"
          height="40"
        >
          <path
            fillRule="evenodd"
            d="M13.707 12.293a6.5 6.5 0 1 0-1.414 1.414l3.5 3.5a1 1 0 0 0 1.414-1.414l-3.5-3.5zm-1.207-2.207a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Available Services</h1>
      <p className="text-gray-600">{sortedServices.length} services found</p>

      {/* Service Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPageServices.length > 0 ? (
          currentPageServices.map((service) => (
            <ServiceCard service={service} />
          ))

        ) : (
          <p>No services match your filters.</p>
        )}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center mt-6 space-x-2'}
        pageClassName={'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition'}
        activeClassName={'bg-blue-600 text-white'}
        previousClassName={'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition'}
        nextClassName={'bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
};

export default ServicesList;
