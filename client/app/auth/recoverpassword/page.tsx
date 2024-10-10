"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Button from '@/components/button';
import { useMutation } from '@apollo/client'; // Import the useMutation hook
import { FORGOT_PASSWORD_MUTATION } from '@/graphql/auth'; // Adjust the path if needed

const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
});

interface RecoverPasswordForm {
  email: string;
}

const RecoverPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<RecoverPasswordForm>({
    resolver: zodResolver(schema),
  });

  // Use the useMutation hook
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: (data) => {
      if (data.forgotPassword.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.forgotPassword.message);
      }
    },
    onError: (error) => {
      setErrorMessage(`${error.message}`);
    },
  });

  const onSubmitHandler = (data: RecoverPasswordForm) => {
    console.log('Submitted email:', data.email);
    forgotPassword({ variables: { email: data.email } }); // Call the mutation
  };

  return (
    <div className="h-[60vh] flex flex-col justify-center items-center px-4 bg-gradient-to-r from-blue-200 to-green-200">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Recover Password
        </h2>
        {isSubmitted ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              If an account with that email exists, we've sent you an email with instructions to recover your password. Please check your inbox!
            </p>
            <Link href="/auth">
              <Button text="Go to Login" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p> 
            )}
            <div className="fex justify-center">
              <Button
                type="submit"
                text={loading ? "Sending..." : "Send Recovery Email"}
                fullWidth
                disabled={loading} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
