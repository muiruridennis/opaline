// CertificationInput.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import Input from '@/components/input';
import Button from '../button';

interface CertificationInputProps {
    index: number;
    register: UseFormRegister<any>;
    remove: () => void;
    errors:any
}

const CertificationInput: React.FC<CertificationInputProps> = ({ index, register, remove, errors }) => {
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
            <Input
                type="date"
                name={`certifications[${index}].dateIssued`}
                register={register}
                className="w-full"
                error={certErrors?.dateIssued?.message?.toString()}

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
