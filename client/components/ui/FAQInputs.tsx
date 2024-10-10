// CertificationInput.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input from '@/components/input';
import Button from '../button';

interface faqInputProps {
    index: number;
    register: UseFormRegister<any>;
    remove: () => void;
    errors:any
}

const CertificationInput: React.FC<faqInputProps> = ({ index, register, remove, errors }) => {
    const certErrors = errors.certifications?.[index];
    return (
        <div className="flex space-x-4 mb-4 items-center">
            <Input
                type="text"
                name={`certifications[${index}].title`}
                placeholder="Certification Title"
                register={register}
                className="w-full"
                error={certErrors?.title?.message?.toString()}

            />
            <Input
                type="text"
                name={`certifications[${index}].issuingOrganization`}
                placeholder="Issuing Organization"
                register={register}
                error={certErrors?.issuingOrganization?.message?.toString()}

                className="w-full"
            />
          
            <Button
                type="button"
                onClick={remove}
                variant='info'
                text="Remove Certificate"
            />
        </div>
    );
};

export default CertificationInput;
