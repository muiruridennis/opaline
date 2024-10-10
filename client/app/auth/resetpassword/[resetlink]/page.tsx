"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Input from '@/components/input'; // Import the reusable Input component
import Button from '@/components/button';
import { useParams, useRouter } from 'next/navigation';
import { RESET_PASSWORD_MUTATION } from '@/graphql/auth';
import { useMutation } from '@apollo/client';

const schema = z.object({
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .nonempty('Password is required'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof schema>;

const ResetPasswordPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const { resetlink } = useParams();
    const router = useRouter();
    const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsSubmitting(true);
        setMessage(null);
        console.log('Submitted data:', data);

        try {
            const response = await resetPassword({
                variables: {
                    resetPasswordData: {
                        resetLink: resetlink,
                        password: data.newPassword,
                    },
                },
            });

            if (response.data.resetPassword.success) {
                setMessage(response.data.resetPassword.message);
                setIsSuccess(true);
                setTimeout(() => {
                    router.push('/auth'); 
                }, 3000);
            } else {
                setMessage(response.data.resetPassword.error);
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('An error occurred while resetting your password.');
            setIsSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-[60vh] flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg bg-gradient-to-r from-blue-200 to-green-200">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/auth" className="font-medium text-indigo-600 hover:text-indigo-500">
                            return to login
                        </Link>
                    </p>
                </div>
                <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            register={register}
                            error={errors.newPassword?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>

                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            register={register}
                            error={errors.confirmPassword?.message}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            text={isSubmitting ? 'Submitting...' : 'Reset Password'}
                            className='w-full relative'
                        />
                    </div>
                </form>
                {message && (
                    <div className={`mt-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
