"use client"
import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../../schemas';
import Button from '../../components/button';
import Input from '../../components/input';
import { Select } from '../../components/select';
import { z } from 'zod';
import Image from 'next/image';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@/graphql/auth';
import { Spinner } from '@/components/spinner';
import { toast } from 'react-toastify';
type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const schema = isLogin ? loginSchema : signupSchema;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<LoginForm | SignupForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(isLogin ? {} : { name: '', confirmPassword: '', phoneNumber: "", role: '' }),
    }
  });
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION);
  const [signup, { loading: signupLoading, error: signupError }] = useMutation(SIGNUP_MUTATION);
  const onSubmit = useCallback(async (data: any) => {
    if (isLogin) {
      try {
        const response = await login({ variables: { email: data.email, password: data.password } });
        const userRole = response.data?.login?.user?.role;

        toast.success('Login successful! Redirecting...');
        setTimeout(() => {
          if (userRole === 'PROVIDER') {
            router.push('/providerdashboard');
          } else if (userRole === 'CLIENT') {
            router.push('/services');
          }
        }, 3000);
      } catch (err) {
        console.error('Login Error:', err);
        toast.error('Login failed! Please try again.');
      }
    } else {
      try {
        const response = await signup({
          variables: {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role: data.role
          }
        });

        const userRole = response.data?.registerUser?.role;

        toast.success('Signup successful! Redirecting...');
        setTimeout(() => {
          if (userRole === 'PROVIDER') {
            router.push('/providerdashboard');
          } else if (userRole === 'CLIENT') {
            router.push('/services');
          }
        }, 3000);
      } catch (err) {
        console.error('Signup Error:', err);
        toast.error('Signup failed! Please try again.');
      }
    }
  }, [isLogin, login, signup, router]); // Dependencies

  const toggleAuthMode = useCallback(() => {
    setIsLogin(prevState => !prevState);
  }, []);


  const isLoading = loginLoading || signupLoading
  const formErrors = isLogin
    ? (errors as FieldErrors<LoginForm>)
    : (errors as FieldErrors<SignupForm>);
  const role = watch('role')
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center lg:items-center lg:justify-center">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black opacity-25"></div>          <div className="relative h-full w-full">
            <Image
              src="/icons/welcome.svg"
              alt="Welcome Image"
              fill
              className="opacity-30 object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="text-white">
                <h2 className="text-4xl font-bold">Welcome to Opaline</h2>
                <p className="mt-4 text-lg">Connect with top professionals in beauty, massage, and more.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-12 mt-12 lg:mt-0 flex items-start justify-center">
          {isLoading ?
            <Spinner size="large" className="text-indigo-500" /> : (
              <div className="w-full">
                <div className="flex justify-between mb-8">
                  <h3
                    onClick={toggleAuthMode}
                    className={`text-2xl font-bold cursor-pointer ${isLogin ? 'text-indigo-600' : 'text-gray-600'}`}
                  >
                    Login
                  </h3>
                  <h3
                    onClick={toggleAuthMode}
                    className={`text-2xl font-bold cursor-pointer ${!isLogin ? 'text-indigo-600' : 'text-gray-600'}`}
                  >
                    Sign Up
                  </h3>
                </div>
                <div className='mt-6 text-center center'>
                  {loginError && <p className="text-red-500">{loginError.message}</p>}
                  {signupError && <p className="text-red-500">{signupError.message}</p>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='false'>
                  {!isLogin && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          register={register}
                          error={(formErrors as FieldErrors<SignupForm>).name?.message}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          placeholder="Your phone number"
                          register={register}
                          error={formErrors.phoneNumber?.message}
                        />
                      </div>
                    </>

                  )}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      register={register}
                      error={formErrors.email?.message}
                    />
                  </div>


                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      register={register}
                      error={formErrors.password?.message}
                    />
                  </div>
                  {!isLogin && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          register={register}
                          error={(formErrors as FieldErrors<SignupForm>).confirmPassword?.message} />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <Select
                          name="role"
                          options={[
                            { label: "Select your role", value: "", disabled: true },
                            { label: "Provider", value: "provider" },
                            { label: "Client", value: "client" }
                          ]}
                          value={role || "client"}
                          onChange={(e) => setValue('role', e.target.value as "client" | "provider")}
                          error={(formErrors as FieldErrors<SignupForm>).role?.message}
                          className="w-full"
                        />

                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    text={isLogin ? 'Login' : 'Sign Up'}
                  />

                  <p className="mt-6 text-center text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <span
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-indigo-600 cursor-pointer"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </span>
                  </p>
                </form>

              </div>
            )}
        </div>
      </div>
    </div>
  );
}
