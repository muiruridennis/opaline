"use client"
import Link from 'next/link';
import Image from 'next/image';
import { UsersIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation, Autoplay  } from 'swiper/modules';


export function TestimonialsSection() {
  const testimonials = [
    {
      image: '/assets/Abigail.jpg',
      alt: 'Jane Mwangi',
      quote: 'Opaline made booking my spa treatment a breeze. The whole process was seamless, and I loved the variety of options available.',
      name: 'Jane Mwangi',
      role: 'Happy Customer',
    },
    {
      image: '/assets/alice-spa.jpg',
      alt: 'Michael Otieno',
      quote: 'Booking my haircut through Opaline was so easy. I was able to find a top barber nearby and book in just a few clicks.',
      name: 'Lydia Rinaha',
      role: 'Satisfied Client',
    },
    {
      image: '/assets/Angle.jpg',
      alt: 'Alice Kinyua',
      quote: 'Opaline has transformed the way I manage my salon appointments. My clients love the convenience, and I can focus more on providing quality service.',
      name: 'Alice Kinyua',
      role: 'Salon Owner',
    },
    {
      image: '/assets/symorelax.jpg',
      alt: 'Peter Muriuki',
      quote: 'Since joining Opaline, my massage therapy business has seen a significant increase in bookings. The platform is user-friendly, and it makes managing appointments so much easier.',
      name: 'Peter Muriuki',
      role: 'Massage Therapist',
    },
    {
      image: '/assets/steph-parlar.jpg',
      alt: 'Grace Stephanie',
      quote: 'Opaline has made it so much easier for my beauty studio to attract new clients. The seamless booking system saves us time and helps us provide a better experience.',
      name: 'Grace Stephanie',
      role: 'Beauty Specialist',
    },
  ];
  return (
    <section className="bg-gray-100 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl lg:text-5xl">
          What People Are Saying About Opaline
        </h2>

        <Swiper
           spaceBetween={30}
           loop={true}
           pagination={{ clickable: true }}
           autoplay={{
             delay: 4500, 
             disableOnInteraction: false, 
           }}
           breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: { 
              slidesPerView: 3,
            },
          }}
           modules={[Pagination, Navigation, Autoplay]}
           className="mt-10 lg:mt-16"
         >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center transition transform hover:scale-105">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.alt} 
                  className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-600 shadow-md"
                />
                <p className="text-lg text-gray-600 font-medium text-center leading-relaxed">"{testimonial.quote}"</p>
                <p className="mt-6 text-sm font-semibold text-indigo-600">— {testimonial.name}, {testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
         </Swiper>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Easy steps to book your service
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Get the best services at your convenience in just a few simple steps.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {/* Step 1 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <MagnifyingGlassIcon className="w-6 h-6 " aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Search for Services</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Enter your location and browse through a variety of services available near you.
              </dd>
            </div>
            {/* Step 2 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <UsersIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Choose a Professional</p>
              </dt>
              <div className="mt-2 ml-16 text-base text-gray-500">
                Review profiles, ratings, and reviews to find the perfect professional for your needs.
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <CalendarIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Book & Enjoy</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Select a convenient time and date, confirm your booking, and enjoy exceptional service.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
export function FeaturedServices() {
  const services = [
    {
      title: 'Beauty',
      description: 'Find the best beauty services around you.',
      image: '/assets/beauty-service.jpg',
      link: '#',
    },
    {
      title: 'Massage',
      description: 'Relax with top-rated massage therapists.',
      image: '/assets/massage-service.jpg',
      link: '#',
    },
    {
      title: 'Haircare',
      description: 'Get a fresh look with professional haircare.',
      image: '/assets/haircare-service.jpg',
      link: '#',
    },
    // Add more services as needed
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore What We Offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            From beauty treatments to relaxing massages, Opaline connects you with top professionals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform transform hover:scale-105"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                <a
                  href={service.link}
                  className="mt-4 inline-block text-indigo-600 font-medium text-sm hover:text-indigo-500"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/beauty-salon.jpg"
            alt="Opaline hero background"
            fill
            className="opacity-30  object-cover "
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover & Book <br className="hidden lg:inline" />
            <span className="text-yellow-400">Top Professionals</span> Effortlessly
          </h1>
          <p className="mt-4 text-lg text-indigo-200 max-w-xl">
            Opaline connects you with the best in beauty, wellness, and more. Find and book services in just a few clicks.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3">
            <input
              type="text"
              id="hero-input"
              name="hero-input"
              className="py-3 px-4 block w-full sm:w-auto border-gray-200 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500 placeholder-gray-500"
              placeholder="Enter your location"
            />
            <a
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              href="#"
            >
              Find Providers
            </a>
          </div>
        </div>
      </div>
      <HowItWorks />
      <FeaturedServices />
      <TestimonialsSection />
    </>
  );
}
