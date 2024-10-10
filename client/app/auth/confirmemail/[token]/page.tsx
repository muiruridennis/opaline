"use client";
import { useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/button';
import { CONFIRM_EMAIL_MUTATION, RESEND_CONFIRM_EMAIL_MUTATION } from '@/graphql/auth';

const EmailConfirmation: React.FC = () => {
    const [confirmationStatus, setConfirmationStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { token } = useParams();
    const [confirmEmail, { loading }] = useMutation(CONFIRM_EMAIL_MUTATION, {
        onCompleted: (data) => {
            if (data.confirmEmail.success) {
                setConfirmationStatus('success');
            } else {
                setConfirmationStatus('error');
                setErrorMessage(data.confirmEmail.message);
            }
        },
        onError: (error) => {
            setConfirmationStatus('error');
            setErrorMessage(error.message);
        },
    });

    const [resendConfirmationEmail] = useMutation(RESEND_CONFIRM_EMAIL_MUTATION, {
        onCompleted: (data) => {
            if (data.resendConfirmationEmail.success) {
                setErrorMessage('Confirmation email resent successfully!');
                setConfirmationStatus('success');
            } else {
                setErrorMessage(data.resendConfirmationEmail.message);
                setConfirmationStatus('error');
            }
        },
        onError: (error) => {
            setErrorMessage(`Failed to resend confirmation email: ${error.message}`);
            setConfirmationStatus('error');
        },
    });

    useEffect(() => {
        if (token) {
            confirmEmail({ variables: { token: token as string } });
        } else {
            setConfirmationStatus('error');
            setErrorMessage('No confirmation token provided.');
        }
    }, [token, confirmEmail]);

    const handleResendEmail = () => {
        resendConfirmationEmail();
    };

    return (
        <div className="h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-200 to-green-200">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                {loading || confirmationStatus === 'loading' ? (
                    <p className="text-lg font-semibold text-gray-800 text-center animate-pulse">Confirming your email...</p>
                ) : confirmationStatus === 'success' ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-600">🎉 Email Confirmed!</h2>
                        <p className="text-gray-700 my-4">Your email has been successfully confirmed. You can now log in.</p>
                        <div className="flex justify-center">
                        <Button text="Go to Login" onClick={() => router.push('/auth')} className="mt-4" />
                    </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-red-600">⚠️ Error Confirming Email</h2>
                        <p className="text-gray-700 my-4">{errorMessage || 'There was an issue confirming your email.'}</p>
                        <div className="flex justify-center">
                            <Button text="Resend Confirmation Email" onClick={handleResendEmail} className="mt-4" />
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default EmailConfirmation;
