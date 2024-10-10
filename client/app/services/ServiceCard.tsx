import Button from '@/components/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {Service } from "../../types/types"

const ServiceCard: React.FC<{ service: Service }>= ({ service }) => {
  const router = useRouter();

  const handleLearnMore = () => {
    router.push(`/services/${service.id}`);
  };
  const maxDescriptionLength = 150;

  const truncatedDescription = service.description.length > maxDescriptionLength
    ? service.description.slice(0, maxDescriptionLength) + '...'
    : service.description;
  return (
    <div
    key={service.id}
    className="bg-white p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out flex flex-col"
  >
    <Image
      src={service.image}
      alt={service.name}
      width={400}
      height={300}
      className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-200 ease-in-out hover:scale-105"
    />
    <div className="flex-grow space-y-2">
      <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
      <p className="text-gray-600">{truncatedDescription}</p>
      <p className="text-green-600 font-bold text-lg">${service.price}</p>
      <p className="text-gray-500">{service.duration}</p>
      <p className="text-gray-600 italic">Provider: {service.providerName}</p>
    </div>
    <div className="flex justify-end gap-3 mt-3">
      <Button text="Book Now" />
      <Button text="Learn More" variant="warning"  onClick={handleLearnMore}/>
    </div>
  </div>
  );
};
export default ServiceCard
