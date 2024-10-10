import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import { serviceCategories } from '@/constants/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/input';
import { Select } from '@/components/select';
import Switch from '@/components/switch';
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import Button from '@/components/button';
import TextArea from '@/components/textArea';
import { useMutation } from '@apollo/client';
import { CREATE_PROVIDER_SERVICE, UPDATE_PROVIDER_SERVICE } from '@/graphql/provider';
import { toast } from 'react-toastify';
import { providerServiceSchema } from '@/schemas';
import { z } from 'zod';
import { Service } from '@/types/types';

type ProviderServiceSchema = z.infer<typeof providerServiceSchema>;
interface ServiceFormProps {
  service?: Service;
  onNewService?: (newService: Service) => void;
}
const ServiceForm: React.FC<ServiceFormProps> = ({ service, onNewService }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null); 

  const [createProviderService, { loading, error }] = useMutation(CREATE_PROVIDER_SERVICE);
  const [updateProviderService] = useMutation(UPDATE_PROVIDER_SERVICE); // Mutation for updating a service

  const { register, handleSubmit, control, formState: { errors }, setValue, watch, reset } = useForm<ProviderServiceSchema>({
    defaultValues: {
      name: '',
      description: '',
      serviceCategory: "",
      price: 0,
      duration: '',
      isActive: false,
      tags: [],
      benefits: [{ benefit: '' }],
      faqs: [{ question: '', answer: '' }],
      file: null,
    },
    resolver: zodResolver(providerServiceSchema),
  });

  const { fields: benefitsFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: 'benefits',
  });



  const { fields: faqFields, append: appendFAQ, remove: removeFAQ } = useFieldArray({
    control,
    name: 'faqs',
  });

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
    setValue('tags', tags);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null; // Allow null
    if (selectedFile) {
      setFile(selectedFile);
      setValue('file', selectedFile); // Store file in the form state
    } else {
      setValue('file', null); // Clear file from form state if no file is selected
    }
  };


  const onSubmitHandler = async (data: ProviderServiceSchema) => {
    console.log("tis is the file", data )

    try {
      let newServiceData;
      if (service) {
        // Updating an existing service
        const { data: updateData } = await updateProviderService({
          variables: {
            id: service.id,
            updateServiceInput: {
              name: data.name,
              description: data.description,
              price: data.price,
              duration: data.duration,
              serviceCategory: data.serviceCategory,
              benefits: data.benefits || [],
              tags,
              faqs: data.faqs || [],
              file: data.file,
            },
          },
        });
        newServiceData = updateData.updateProviderService;
      } else {
        // Creating a new service
        const { data: createData } = await createProviderService({
          variables: {
            createServiceInput: {
              name: data.name,
              description: data.description,
              price: data.price,
              duration: data.duration,
              serviceCategory: data.serviceCategory,
              benefits: data.benefits || [],
              tags,
              faqs: data.faqs || [],
              file:data.file,
            },
          },
        });
        newServiceData = createData.createProviderService;
      }

      if (onNewService) {
        onNewService(newServiceData);
      }
      toast.success(service ? "Successfully updated the service" : "Successfully created a service");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit");
      console.error(error);
    }
  };
  // const onSubmitHandler = async (data: ProviderServiceSchema) => {
  //   try {
  //     let heroId = null;
  //     if (file) {
  //       // Upload the hero image first and get the id
  //       const formData = new FormData();
  //       formData.append('file', file);
  
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/provider-services/hero`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  
  //       if (!response.ok) {
  //         throw new Error('Failed to upload hero image');
  //       }
  
  //       const heroData = await response.json();
  //       heroId = heroData.id; // Assuming the response contains an id for the uploaded file
  //     }
  
  //     let newServiceData;
  //     if (service) {
  //       // Updating an existing service
  //       const { data: updateData } = await updateProviderService({
  //         variables: {
  //           id: service.id,
  //           updateServiceInput: {
  //             name: data.name,
  //             description: data.description,
  //             price: data.price,
  //             duration: data.duration,
  //             serviceCategory: data.serviceCategory,
  //             benefits: data.benefits || [],
  //             tags,
  //             faqs: data.faqs || [],
  //             heroId, // Pass the hero image id
  //           },
  //         },
  //       });
  //       newServiceData = updateData.updateProviderService;
  //     } else {
  //       // Creating a new service
  //       const { data: createData } = await createProviderService({
  //         variables: {
  //           createServiceInput: {
  //             name: data.name,
  //             description: data.description,
  //             price: data.price,
  //             duration: data.duration,
  //             serviceCategory: data.serviceCategory,
  //             benefits: data.benefits || [],
  //             tags,
  //             faqs: data.faqs || [],
  //             heroId, // Pass the hero image id
  //           },
  //         },
  //       });
  //       newServiceData = createData.createProviderService;
  //     }
  
  //     if (onNewService) {
  //       onNewService(newServiceData);
  //     }
  //     toast.success(service ? "Successfully updated the service" : "Successfully created a service");
  //     setIsOpen(false);
  //   } catch (error) {
  //     toast.error("Failed to submit");
  //     console.error(error);
  //   }
  // };
  
  useEffect(() => {
    if (service) {
      reset({
        name: service.name || '',
        description: service.description || '',
        serviceCategory: service.serviceCategory || "",
        price: service.price || 0,
        duration: service.duration || '',
        isActive: service.isActive || false,
        tags: service.tags || [],
        benefits: service.benefits || [{ benefit: '' }],
        faqs: service.faqs || [{ question: '', answer: '' }]
      });
      setTags(service.tags || []);
    } else {
      reset(); // Reset to default values if no service
    }
  }, [service, reset]);

  const duration = watch('duration');
  const serviceCategoryValue = watch('serviceCategory');
  const isEditing = !!service;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size='small'
          text={isEditing ? <Pencil size={14} /> : "Add New Service"}
          variant={isEditing ? "outline" : "oceanBlue"}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new service.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Service Name"
              register={register}
              error={errors.name?.message?.toString()}  // Show validation error
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Service Description</label>
            <TextArea
              name="description"
              placeholder="Service description"
              register={register}
              rows={8}
              error={errors.description?.message?.toString()}  // Fix typo: 'errors.description'
            />
          </div>
          <div>
            <label htmlFor="service-category" className="block text-sm font-medium text-gray-700">Service Category</label>
            <Select
              name='serviceCategory'
              options={serviceCategories}
              value={serviceCategoryValue}
              onChange={(e) => setValue('serviceCategory', e.target.value)}
              className="w-full"
            />
            {errors.serviceCategory && <p className="text-red-500 text-xs mt-1">{errors.serviceCategory.message?.toString()}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <Input
              type="number"
              name="price"
              placeholder="Price"
              register={register}
              error={errors.price?.message?.toString()}  // Show validation error
            />
          </div>

          {/* Duration Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <Select
              name="duration"
              options={[
                { label: "Choose Duration", value: "", disabled: true },
                { label: "15 minutes", value: "15 minutes" },
                { label: "30 minutes", value: "30 minutes" },
                { label: "1 hour", value: "1 hour" },
                { label: "2 hours", value: "2 hours" }
              ]}
              value={duration || ""}
              onChange={(e) => setValue('duration', e.target.value)}
              error={errors.duration?.message?.toString()}
              className='w-full'
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">Service Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Benefits</label>
            {benefitsFields.map((item, index) => {
              const benefitsError = errors.benefits?.[index]
              return (
                <div key={item.id} className="flex space-x-4 mb-2">
                  <Input
                    type="text"
                    register={register}
                    name={`benefits.${index}.benefit` as const} // Use 'benefit' as the key for each string
                    placeholder="Benefit"
                    className="w-full"
                    error={benefitsError?.benefit?.message}
                  />
                  <Button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    text="Remove"
                    variant="info"
                  />
                </div>
              )
            })}
            <Button
              type="button"
              onClick={() => appendBenefit({ benefit: '' })} // Append object with 'benefit' key
              text="Add Benefit"
              variant="oceanBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <TagsInput
              value={tags}
              onChange={handleTagsChange}
              maxTags={5}
            />
            <p className="text-gray-500 text-sm mt-1">Press "Enter" to add a tag</p>

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequently Asked Questions</label>
            {faqFields.map((item, index) => {
              const faqsError = errors.faqs?.[index]
              return (
                <div key={item.id} className="flex flex-col space-y-2 mb-4">
                  <Input
                    type="text"
                    name={`faqs[${index}].question`}
                    register={register}
                    placeholder="Question"
                    error={faqsError?.question?.message}
                  />
                  <TextArea
                    register={register}
                    name={`faqs.${index}.answer`}
                    placeholder="Answer"
                    error={faqsError?.answer?.message}

                    className="w-full"
                  />
                  <Button type="button" onClick={() => removeFAQ(index)} text="Remove FAQ" variant="info" />
                </div>
              )
            })}
            <Button
              type="button"
              onClick={() => appendFAQ({ question: '', answer: '' })}
              text="Add FAQ"
              variant="oceanBlue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mr-2">Active</label>
            <Controller
              control={control}
              name="isActive"
              render={({ field: { onChange, value } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
            />
          </div>            
          <DialogFooter>
            <DialogClose>
              <Button
                text="Cancel"
                variant='secondary'
              />
            </DialogClose>
            <Button
              type="submit"
              text={isEditing ? "Update Service" : "Create Service"}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
