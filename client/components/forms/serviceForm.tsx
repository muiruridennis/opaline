import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Input from '@/components/input';
import Button from '../button';
import TextArea from '../textArea';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface ServiceFormProps {
    selectedService: Service | null;
    onSubmit: (data: ServiceFormValues) => void;
}

const serviceFormSchema = z.object({
    name: z.string()
        .min(2, 'Service name must be at least 2 characters')
        .max(100, 'Service name cannot exceed 100 characters'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description cannot exceed 500 characters'),
    price: z
        .string()
        .min(1, 'Price must be provided')
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0, { message: 'Price must be greater than 0' }),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const ServiceForm: React.FC<ServiceFormProps> = ({ selectedService, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: selectedService || {
            name: '',
            description: '',
            price: 0,
        },
    });

    const handleFormSubmit = (data: ServiceFormValues) => {
        onSubmit(data); // Use the onSubmit prop to pass form data back
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <Input
                    register={register}
                    type="text"
                    name="name"
                    placeholder="Service Name"
                    error={errors.name?.message}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Service Description</label>
                <TextArea
                    register={register}
                    name="description"
                    placeholder="Enter a description..."
                    rows={3}
                    className="mb-4"
                    error={errors.description?.message} // Correct error reference
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Service Price</label>
                <Input
                    register={register}
                    name="price"
                    type="number"
                    placeholder="Service Price"
                    error={errors.price?.message} // Correct error reference
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    type="submit"
                    text={selectedService ? 'Save Changes' : 'Add Service'}
                />
            </div>
        </form>
    );
};

export default ServiceForm;
