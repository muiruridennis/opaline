
import React, { useEffect, useState } from 'react';
import { Service } from '../../../types/types';
import ServiceForm from './serviceForm';
import ReusableAlertDialog from '@/components/alertDialogue';
import { Trash2 } from 'lucide-react';
import useGetMe from "@/lib/hooks/useGetMe";
import { Spinner } from '@/components/spinner';
import { DELETE_PROVIDER_SERVICE } from '@/graphql/provider';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { loading: fetchingProfileLoading, error: fetchingProfileError, data: profileData } = useGetMe();
  console.log(services)
  // Define the mutation and pass the serviceId explicitly when calling it
  const [deleteProviderService] = useMutation(DELETE_PROVIDER_SERVICE);

  useEffect(() => {
    if (profileData?.getUserById?.provider?.services) {
      setServices(profileData.getUserById.provider.services); // Populate local state on profileData change
    }
  }, [profileData]);

  if (fetchingProfileLoading) return < Spinner />;
  if (fetchingProfileError) return <div>Error loading services</div>;

  const handleDeleteService = (serviceId: number) => {
    deleteProviderService({
      variables: { id: serviceId },
      onCompleted: (data) => {
        if (data.deleteProviderService.success) {
          toast.success(data.deleteProviderService.message);
          // Remove deleted service from the services list
          setServices((prevServices) => prevServices.filter(service => service.id !== serviceId));
        }
      },
      onError: (error) => {
        toast.error("Failed to delete service");
        console.error(error);
      }
    });
  };

  const handleCancelDelete = () => {
    toast.info("Service deletion canceled");
  };

  // Callback to add new service
  const handleNewService = (newService: Service) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className='flex justify-between mb-4'>
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <ServiceForm onNewService={handleNewService} /> {/* Pass down the handler */}
      </div>
      {services.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">No services available at the moment.</p>
          <p className="mt-2">Start by adding a new service.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: Service) => (
            <div key={service.id} className="bg-gray-50 border rounded-lg shadow-sm flex flex-col justify-between h-full">
              <img
                src={`data:image/jpeg;base64,${service.image}`}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-gray-800 font-bold">${service.price.toFixed(2)}</p>
              </div>
              <div className="mt-2 flex gap-4 justify-end p-4">
                <ServiceForm service={service} />
                <ReusableAlertDialog
                  triggerText={<Trash2 size={16} className="text-red-500 cursor-pointer" />}
                  description={`Are you sure you want to delete the service "${service?.name}"?`}
                  confirmText="Yes, delete"
                  cancelText="Cancel"
                  onConfirm={() => handleDeleteService(service.id)}
                  onCancel={handleCancelDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
