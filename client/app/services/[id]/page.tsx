"use client";
import { providersData, servicesData } from '@/constants/dummyData';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaClock, FaDollarSign, FaTags } from 'react-icons/fa';
import Button from '@/components/button';


const ServiceDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();


  // Fetch service data by id
  const service = servicesData.find((service) => service.id === Number(id));

  if (!service) {
    return <div>Service not found</div>;
  }
  const provider = providersData.find((provider) => provider.id === service.providerId);

  if (!provider) {
    return <div>Provider not found</div>;
  }
  const handleBookings = () => {
    router.push(`/bookings/${service.id}`);
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] lg:h-screen bg-black">
        <Image
          src={service.image}
          alt={service.name}
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-bold">{service.name}</h1>
          <p className="italic mt-2">Provided by: {service.providerName}</p>
          <p className="font-bold text-3xl mt-4">${service.price}</p>
          <div className="flex gap-4 mt-6">
            <Button
              onClick={handleBookings }
              text="Book Now"
              size="large"
            />
            <button className="bg-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-400">Contact Provider</button>
          </div>
        </div>
      </div>


      <div className="container mx-auto p-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12  border border-gray-300 rounded-md shadow-sm">
        <Image
          src={service.image}
          alt={service.name}
          width={500}
          height={400}
          className="rounded-lg shadow-lg object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">About the Service</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-blue-600">
                <FaClock className="h-6 w-6" />
              </span>
              <p className="text-gray-900 text-lg font-medium">Duration: {service.duration}</p>
            </div>

            {/* Service Price */}
            <div className="flex items-center gap-4">
              <span className="text-gray-900">
                <FaDollarSign className="h-6 w-6" />
              </span>
              <p className="text-green-600 font-bold text-lg">Price: ${service.price}</p>
            </div>

            {/* Category or Type of Service */}
            <div className="flex items-center gap-4">
              <span className="text-yellow-500">
                <FaTags className="h-6 w-6" />
              </span>
              <p className="text-gray-900 font-medium">Category: service category</p>
            </div>

          </div>

          {/* Divider Line */}
          <div className="mt-8 border-t border-gray-300"></div>

          {/* Service Features */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose This Service?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Personalized treatment tailored to your needs.</li>
              <li>Experienced provider with over 10 years of expertise.</li>
              <li>Uses only the highest quality products and tools.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 border border-gray-300 rounded-md shadow-sm">
        <Image
          src="/assets/providers/provider-three.jpg"
          alt={service.providerName}
          width={300}
          height={300}
          className="rounded-full shadow-lg object-cover"
        />
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-semibold mb-4">About {provider?.name}</h2>
          <p className="text-gray-700 leading-relaxed">{provider?.bio}</p>

          {/* Qualifications */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Certifications & Qualifications</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {provider.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Provider's Approach</h3>
            <p className="text-gray-700">{provider.approach}</p>
          </div>

          {/* Contact Info */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-700">For personalized inquiries, feel free to reach out:</p>
            <p className="text-gray-700">
              Email: <a href={`mailto:${provider.contact.email}`} className="text-blue-600">{provider.contact.email}</a><br />
              Phone: <a href={`tel:${provider.contact.phone}`} className="text-blue-600">{provider.contact.phone}</a>
            </p>
          </div>

          {/* Client Reviews */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">What Clients Are Saying</h3>
            <div className="space-y-4">
              {provider.reviews.map((review, index) => (
                <blockquote key={index} className="text-gray-700 italic">
                  <p>"{review.reviewText}"</p>
                  <footer>- {review.clientName}</footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Follow {provider.name}</h3>
            <div className="flex gap-4">
              {provider.socialMedia.facebook && <a href={provider.socialMedia.facebook} className="text-blue-600">Facebook</a>}
              {provider.socialMedia.instagram && <a href={provider.socialMedia.instagram} className="text-pink-600">Instagram</a>}
              {provider.socialMedia.twitter && <a href={provider.socialMedia.twitter} className="text-blue-400">Twitter</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;

