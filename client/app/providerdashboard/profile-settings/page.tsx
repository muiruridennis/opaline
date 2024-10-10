"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/components/avatar";
import Input from "@/components/input";
import Button from "@/components/button";
import TextArea from "@/components/textArea";
import { useFieldArray, useForm } from "react-hook-form";
import CertificationInput from "@/components/ui/CertificationInput";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROVIDER_PROFILE_MUTATION, GET_USER_BY_ID } from "@/graphql/provider";
import { useAuth } from "@/providers/AuthProvider";
import { Spinner } from "@/components/spinner";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerProfileSchema } from "@/schemas";
import { z } from "zod";
import useGetMe from "@/lib/hooks/useGetMe";


interface Certification {
  title?: string;
  issuingOrganization?: string;
  dateIssued?: string;
}
interface ProviderProfileSettingsForm {
  businessName: string;
  description: string;
  bio: string;
  approach: string;
  facebook: string;
  instagram: string;
  twitter: string;
  certifications: Certification[];
}

type ProviderProfileSchema = z.infer<typeof providerProfileSchema>;

const ProviderProfileSettings: React.FC = () => {
  const [createProviderProfile] = useMutation(CREATE_PROVIDER_PROFILE_MUTATION);
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState("/assets/provider-one.jpg");
  const userId = user?.id ? parseInt(user.id, 10) : null;

  const { loading: fetchingProfileLoading, error: fetchingProfileError, data: profileData } = useGetMe();


  const { register, handleSubmit, control, setValue, formState: { errors }, } = useForm<ProviderProfileSchema>({
    defaultValues: {
      businessName: "",
      description: "",
      bio: "",
      approach: "",
      facebook: "",
      instagram: "",
      twitter: "",
      certifications: [{ title: "", issuingOrganization: "", dateIssued: "" }],
    },
    resolver: zodResolver(providerProfileSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  useEffect(() => {
    if (profileData?.getUserById?.provider) {
      const { businessName, description, bio, approach, socialMedia, certifications } = profileData.getUserById?.provider;
      setValue("businessName", businessName || "");
      setValue("description", description || "");
      setValue("bio", bio || "");
      setValue("approach", approach || "");
      setValue("facebook", socialMedia?.facebook || "");
      setValue("instagram", socialMedia?.instagram || "");
      setValue("twitter", socialMedia?.twitter || "");
      if (certifications && certifications.length > 0) {
        append(certifications.filter((cert: Certification) => cert.title || cert.issuingOrganization || cert.dateIssued));
      }
    }
  }, [profileData, setValue, append]);


  const onSubmit = async (data: ProviderProfileSchema) => {
    try {
       await createProviderProfile({
        variables: {
          input: {
            businessName: data.businessName,
            description: data.description,
            bio: data.bio,
            approach: data.approach,
            socialMedia: {
              facebook: data.facebook,
              instagram: data.instagram,
              twitter: data.twitter,
            },
            certifications: data.certifications,
          },
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("There was an issue updating your profile.");

      console.error("Error creating profile:", error);
    }
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (fetchingProfileLoading) {
    return < Spinner />;
  }

  if (fetchingProfileError) {
    return toast.error(`${fetchingProfileError.message}`)
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h1>

        {/* Profile Information */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <Avatar src={profileImage} alt="Profile Photo" size="medium" placeholder="Profile Photo" />
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer">
              <ArrowUpTrayIcon className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">Change Profile Picture</h2>
            <p className="text-sm text-gray-600">Click the image to upload a new profile picture.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Business Details */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Business Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <Input
                  type="text"
                  name="businessName"
                  placeholder="Your business name"
                  className="mt-1 block w-full"
                  register={register}
                  error={errors.businessName?.message?.toString()}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <TextArea
                  name="description"
                  register={register}
                  placeholder="Enter a description..."
                  rows={4}
                  error={errors.description?.message?.toString()}
                  className="mb-4"

                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <TextArea
                  name="bio"
                  register={register}
                  placeholder="Enter a bio..."
                  rows={4}
                  error={errors.bio?.message?.toString()}

                  className="mb-4"
                />
              </div>
              <div>
                <label htmlFor="approach" className="block text-sm font-medium text-gray-700">
                  Approach
                </label>
                <TextArea
                  name="approach"
                  register={register}
                  placeholder="Describe your approach..."
                  rows={4}
                  error={errors.approach?.message?.toString()}
                  className="mb-4"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Social Media Links</h2>
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL"
                    className="mt-1 block w-full"
                    register={register}
                  />
                  <Input
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                    className="mt-1 block w-full"
                    register={register}
                  />
                  <Input
                    type="text"
                    name="twitter"
                    placeholder="Twitter URL"
                    className="mt-1 block w-full"
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h2>
            {fields.length === 0 && (
              <p className="  p-8">No certifications found. Click 'Add Certification' to create one.</p>
            )}
            {fields.map((item, index) => (
              <CertificationInput
                key={item.id}
                index={index}
                register={register}
                remove={() => remove(index)}
                errors={errors}

              />
            ))}
            <Button type="button" onClick={() => append({ title: "", issuingOrganization: "", dateIssued: "" })} text="Add Certification" variant="oceanBlue" />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" text="Save Changes" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderProfileSettings;
