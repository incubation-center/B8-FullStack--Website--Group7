import { useForm, SubmitHandler } from 'react-hook-form';

import { UserLoginInputs } from '@/types/auth';

import { AuthLogin } from '@/service/api/auth';

import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';
import { useState } from 'react';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export default function UserLoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginInputs>();

  const onSubmit: SubmitHandler<UserLoginInputs> = async ({
    email,
    password
  }) => {
    setIsLoggingIn(true);
    try {
      const res = await AuthLogin({ email, password });

      if (res.status !== 200) throw new Error('Login failed');

      const data = await res.data;

      const accessToken = data['access_token'];

      // set access token to cookies using next-cookies
      setCookie('accessToken', accessToken);
      router.push('/');
    } catch (errors) {
      console.log('====================================');
      console.log(errors);
      console.log('====================================');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className='space-y-8 text-center flex flex-col items-center'>
      <h1 className='text-4xl font-extrabold text-alt-secondary'>
        Welcome to Digital Library
      </h1>
      <p className='text-alt-secondary'>Please enter your details</p>

      <form onSubmit={handleSubmit(onSubmit)} className='w-5/6 space-y-4'>
        {/* email address */}

        <CustomInput
          label='Email Address'
          name='email'
          type='email'
          placeholder='Please enter your email'
          register={register('email', { required: 'Email is required' })}
          error={errors.email}
          labelClassName='text-alt-secondary ml-4 font-medium'
          errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
          disabled={isLoggingIn}
        />
        {/* password */}
        <PasswordInput
          label='Password'
          name='password'
          placeholder='Please enter your password'
          register={register('password', { required: 'Password is required' })}
          error={errors.password}
          labelClassName='text-alt-secondary ml-4 font-medium'
          errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
          disabled={isLoggingIn}
        />
        {/* remember me and forgot password */}
        <div className='flex justify-between items-center w-full px-4'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              className='
                w-4 h-4 rounded-full
                bg-alt-secondary 
                focus:outline-none
               
              '
            />
            <label
              htmlFor='remember'
              className=' text-sm text-alt-secondary ml-4 font-medium'
            >
              Remember me
            </label>
          </div>
          <a href='#' className=' text-sm text-alt-secondary font-medium'>
            Forgot password?
          </a>
        </div>
        {/* submit button */}
        <div>
          <button
            type='submit'
            className={`
              w-full px-4 py-2 mt-6 rounded-full
              bg-secondary text-white text-xl tracking-wide 
              focus:outline-none
              font-poppins
              ${isLoggingIn && 'cursor-not-allowed bg-opacity-50'}
            `}
            disabled={isLoggingIn}
          >
            {!isLoggingIn && 'Login'}
            {isLoggingIn && (
              <div className='flex justify-center items-center'>
                <h1>Logging in</h1>
                <SpinningLoadingSvg className='w-6 h-6 ml-2 text-white' />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
