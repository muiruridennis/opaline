import { UseFormRegister } from 'react-hook-form';
import React from 'react';

interface TextBoxProps {
    name: string;
    value?: string;
    placeholder?: string;
    register?: UseFormRegister<any>;
    rows?: number;
    className?: string;
    error?: string;

}

const TextArea: React.FC<TextBoxProps> = ({
    name,
    value,
    placeholder = '',
    register,
    rows = 4,
    className = '',
    error
}) => {
    return (
        <>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                {...(register && register(name))}
                rows={rows}
                className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

        </>
    );
};

export default TextArea;
