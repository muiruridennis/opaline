// "use client";

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { servicesData, providersData } from '@/constants/dummyData';
// import Button from '@/components/button';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Select } from '@/components/select';
// import ProviderMap from '@/components/maps/ProviderMap';
// import CustomTimePicker from '@/components/TimePicker';
// import { toast } from 'react-toastify'; // For user feedback
// import 'react-toastify/dist/ReactToastify.css';
// import Input from '@/components/input';
// import { CalendarClockIcon, Clock1Icon, CreditCard } from 'lucide-react';


// const bookingSchema = z.object({
//   selectedDate: z.string().min(1, "Date is required"),
//   selectedTime: z.string().min(1, "Time is required"),
//   paymentMethod: z.string().min(1, "Payment method is required"),
// });

// type BookingFormData = z.infer<typeof bookingSchema>;

// const BookingPage = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
//   const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);
//   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

//   const service = servicesData.find((s) => s.id === Number(id));
//   const provider = providersData.find((p) => p.id === service?.providerId);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue
//   } = useForm<BookingFormData>({
//     resolver: zodResolver(bookingSchema),
//   });

//   const onSubmit = async (data: BookingFormData) => {
//     setLoadingSubmit(true);
//     try {
//       // Replace this with your actual API call
//       console.log("Booking data", data);
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       toast.success("Booking confirmed successfully!");
//       // Redirect to confirmation page
//       router.push('/confirmation');
//     } catch (error) {
//       console.error("Booking error", error);
//       toast.error("Failed to confirm booking. Please try again.");
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   const selectedDate = watch("selectedDate");
//   const paymentMethod = watch("paymentMethod");

//   useEffect(() => {
//     if (selectedDate) {
//       const fetchUnavailableTimes = async () => {
//         setLoadingAvailability(true);
//         try {
//           // Replace with your actual API call to fetch unavailable times
//           // Example API response simulation
//           const response = await new Promise<string[]>((resolve) =>
//             setTimeout(() => resolve(["10:00 AM", "2:00 PM"]), 1000)
//           );
//           setUnavailableTimes(response);
//         } catch (error) {
//           console.error("Failed to fetch unavailable times", error);
//           toast.error("Failed to fetch availability. Please try again.");
//         } finally {
//           setLoadingAvailability(false);
//         }
//       };

//       fetchUnavailableTimes();
//     }
//   }, [selectedDate]);

//   return (
//     <div className="container mx-auto p-6 max-w-6xl bg-white rounded-lg shadow-md">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">Book Your Appointment</h1>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Selected Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 <CalendarClockIcon className="h-5 w-5 text-indigo-500 mr-2" />
//                 Select Date
//               </label>
//               <Input
//                 type="date"
//                 name="selectedDate"
//                 register={register}
//                 placeholder='Select Date'
//                 error={errors.selectedDate?.message as string}
//               />
//               <p className="mt-1 text-sm text-gray-500" id="date-helper-text">
//                 Choose a convenient date for your appointment.
//               </p>
//             </div>
//             <div>
//               <label htmlFor="selectedTime" className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                 <Clock1Icon className="h-5 w-5 text-indigo-500 mr-2" />
//                 Select Time
//               </label>
//               {loadingAvailability ? (
//                 <div className="mt-1 text-gray-500">Checking availability...</div>
//               ) : (
//                 <CustomTimePicker
//                   selectedDate={selectedDate}
//                   onChange={(value) => setValue('selectedTime', value)}
//                   unavailableTimes={unavailableTimes}
//                   error={errors.selectedTime?.message as string}
//                 />
//               )}
//             </div>

//             {/* Payment Method */}
//             <div>
//               <label htmlFor="paymentMethod" className="flex items-center text-sm font-medium text-gray-700 mb-1">
//                 <CreditCard className="h-5 w-5 text-indigo-500 mr-2" />
//                 Payment Method
//               </label>
//               <Select
//                 name="paymentMethod"
//                 value={paymentMethod || ""}
//                 onChange={(e) => setValue('paymentMethod', e.target.value)}
//                 options={[

//                   { label: "Choose Your Payment Method ", value: "", disabled: true },
//                   { label: "Cash Payment ", value: "Cash" },
//                   { label: 'Credit Card', value: 'credit' },
//                   { label: 'Debit Card', value: 'debit' },
//                   { label: 'PayPal', value: 'paypal' }
//                 ]}
//                 error={errors.paymentMethod?.message as string}
//                 className="w-full"
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               text={loadingSubmit ? "Confirming..." : "Confirm Booking"}
//               className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ${loadingSubmit ? 'cursor-not-allowed opacity-50' : ''
//                 }`}
//               disabled={loadingSubmit}
//             />
//           </form>
//         </div>

//         {/* Service Details and Provider Map */}
//         {service && provider ? (
//           <div className="bg-white border rounded-lg shadow-lg p-6 md:sticky top-24 md:col-span-1">
//             <h2 className="text-2xl font-bold mb-4 text-indigo-600">{service.name}</h2>
//             <p className="text-gray-700 text-lg">Provided by: <span className="font-medium">{provider.name}</span></p>
//             <p className="text-lg font-bold text-green-600 mt-4">Price: ${service.price}</p>

//             <div className="mt-6 space-y-2">
//               <p className="text-lg font-semibold text-gray-600">Service Duration:</p>
//               <p className="text-gray-800 text-lg">{service.duration}</p>
//             </div>

//             <div className="mt-6 space-y-2">
//               <p className="text-lg font-semibold text-gray-600">Service Description:</p>
//               <p className="text-gray-800">{service.description}</p>
//             </div>

//             {/* Provider Location Map */}
//             {service.latitude && service.longitude && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Provider Location</h3>
//                 <ProviderMap latitude={service.latitude} longitude={service.longitude} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <p>Loading service details...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { servicesData, providersData } from '@/constants/dummyData';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Select } from '@/components/select';
import ProviderMap from '@/components/maps/ProviderMap';
import CustomTimePicker from '@/components/TimePicker';
import { toast, ToastContainer } from 'react-toastify'; // For user feedback
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/input';
import { CalendarClockIcon, Clock1Icon, CreditCard } from 'lucide-react';

const bookingSchema = z.object({
  selectedDate: z.string().min(1, "Date is required"),
  selectedTime: z.string().min(1, "Time is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const service = servicesData.find((s) => s.id === Number(id));
  const provider = providersData.find((p) => p.id === service?.providerId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setLoadingSubmit(true);
    try {
      // Replace this with your actual API call
      console.log("Booking data", data);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Booking confirmed successfully!");
      // Redirect to confirmation page
      router.push('/confirmation');
    } catch (error) {
      console.error("Booking error", error);
      toast.error("Failed to confirm booking. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const selectedDate = watch("selectedDate");
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (selectedDate) {
      const fetchUnavailableTimes = async () => {
        setLoadingAvailability(true);
        try {
          // Replace with your actual API call to fetch unavailable times
          // Example API response simulation
          const response = await new Promise<string[]>((resolve) =>
            setTimeout(() => resolve(["10:00 AM", "2:00 PM"]), 1000)
          );
          setUnavailableTimes(response);
        } catch (error) {
          console.error("Failed to fetch unavailable times", error);
          toast.error("Failed to fetch availability. Please try again.");
        } finally {
          setLoadingAvailability(false);
        }
      };

      fetchUnavailableTimes();
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left Column - Booking Form */}
          <div className="w-full md:w-2/3 p-8">
            <h1 className="text-3xl font-extrabold text-indigo-600 mb-6">Book Your Appointment</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Selected Date */}
              <div className="flex items-center">
                <CalendarClockIcon className="h-5 w-5 text-indigo-500 mr-3" />
                <div className="w-full">
                  <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700">
                    Select Date
                  </label>
                  <Input
                    type="date"
                    name="selectedDate"
                    register={register}
                    placeholder='Select Date'
                    error={errors.selectedDate?.message as string}
                    className="mt-1 block w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a convenient date for your appointment.
                  </p>
                </div>
              </div>

              {/* Selected Time */}
              <div className="flex items-center">
                <Clock1Icon className="h-5 w-5 text-indigo-500 mr-3" />
                <div className="w-full">
                  <label htmlFor="selectedTime" className="block text-sm font-medium text-gray-700">
                    Select Time
                  </label>
                  {loadingAvailability ? (
                    <div className="mt-1 text-gray-500">Checking availability...</div>
                  ) : (
                    <CustomTimePicker
                      selectedDate={selectedDate}
                      onChange={(value) => setValue('selectedTime', value)}
                      unavailableTimes={unavailableTimes}
                      error={errors.selectedTime?.message as string}
                    />
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-indigo-500 mr-3" />
                <div className="w-full">
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <Select
                    name="paymentMethod"
                    value={paymentMethod || ""}
                    onChange={(e) => setValue('paymentMethod', e.target.value)}
                    options={[
                      { label: "Choose Your Payment Method", value: "", disabled: true },
                      { label: "Cash Payment", value: "Cash" },
                      { label: 'Credit Card', value: 'credit' },
                      { label: 'Debit Card', value: 'debit' },
                      { label: 'PayPal', value: 'paypal' }
                    ]}
                    error={errors.paymentMethod?.message as string}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  text={loadingSubmit ? "Confirming..." : "Confirm Booking"}
                  className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ${
                    loadingSubmit ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={loadingSubmit}
                />
              </div>
            </form>
          </div>

          {/* Right Column - Service Details & Provider Map */}
          {service && provider ? (
            <div className="w-full md:w-1/3 bg-indigo-50 p-8 border-l">
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">{service.name}</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Provided by:</span> {provider.name}
              </p>
              <p className="text-lg font-bold text-green-600 mb-4">Price: ${service.price}</p>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Service Duration:</h3>
                <p className="text-gray-800">{service.duration}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Service Description:</h3>
                <p className="text-gray-800">{service.description}</p>
              </div>

              {/* Provider Location Map */}
              {service.latitude && service.longitude && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Provider Location</h3>
                  <ProviderMap latitude={service.latitude} longitude={service.longitude} />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full md:w-1/3 bg-white p-8 border-l">
              <p>Loading service details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
