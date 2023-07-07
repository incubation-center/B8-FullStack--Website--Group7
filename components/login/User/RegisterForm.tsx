import { UserRegisterInputs } from '@/types/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';

import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';
import { AuthRegister } from '@/service/api/auth';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';

export default function UserRegisterForm({}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { showAlert, AlertModal } = useAlertModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserRegisterInputs>();

  const onSubmit: SubmitHandler<UserRegisterInputs> = async (data) => {
    setIsRegistering(true);

    try {
      const usernameWithNoSpace = data.username.trim().replace(' ', '+');

      // add default profile url
      const formData = {
        ...data,
        profileUrl: `https://ui-avatars.com/api/?name=${usernameWithNoSpace}&background=random&size=128`
      };

      const res = await AuthRegister(formData);

      if (res.status !== 200) throw new Error('Login failed');

      const result = await res.data;

      const accessToken = result['access_token'];
      const refreshToken = result['refresh-token'];

      // set access token to cookies using next-cookies
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
    } catch (errors) {
      let message;
      if (errors instanceof AxiosError) {
        message = errors.response?.data.error || 'An unknown error occurred';
      }
      showAlert({
        title: message,
        subtitle: 'Please try again',
        type: AlertType.ERROR
      });
    }

    setIsRegistering(false);
  };

  return (
    <>
      <AlertModal />
      <div className='lg:min-w-[500px] space-y-8 text-center flex flex-col items-center '>
        <h1 className='text-4xl font-extrabold text-alt-secondary'>
          Create an account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full space-y-4'
          autoComplete='off'
        >
          <CustomInput
            register={register('username', {
              required: 'Username is required'
            })}
            error={errors.username}
            name='username'
            type='text'
            placeholder='Enter your username'
            label='Username'
            labelClassName='text-alt-secondary ml-4 font-medium '
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <CustomInput
            register={register('email', { required: 'Email is required' })}
            error={errors.email}
            name='email'
            type='email'
            placeholder='Enter your email address'
            label='Email address'
            labelClassName='text-alt-secondary ml-4 font-medium '
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <PasswordInput
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
            error={errors.password}
            name='password'
            placeholder='Enter your password'
            label='Password'
            labelClassName='text-alt-secondary ml-4 font-medium'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <PasswordInput
            register={register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Confirm password do not match';
                }
              }
            })}
            error={errors.confirmPassword}
            name='confirmPassword'
            placeholder='Confirm your password'
            label='Confirm Password'
            labelClassName='text-alt-secondary ml-4 font-medium'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <CustomInput
            register={register('phoneNumber', {
              required: 'Phone number is required',
              minLength: {
                value: 9,
                message: 'Phone number must be at least 9 characters long'
              }
            })}
            error={errors.phoneNumber}
            name='phoneNumber'
            type='tel'
            placeholder='Enter your phone number'
            label='Phone Number'
            labelClassName='text-alt-secondary ml-4 font-medium '
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          {/* sign up button */}
          <div>
            <button
              type='submit'
              className={`
                w-full px-4 py-2 mt-6 rounded-full
                bg-secondary text-white font-medium tracking-wide 
                focus:outline-none
                ${isRegistering ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={isRegistering}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
