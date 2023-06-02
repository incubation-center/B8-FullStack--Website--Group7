import { useForm, SubmitHandler } from 'react-hook-form';

import { UserLoginInputs } from '@/types/auth';

import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';

export default function UserLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginInputs>();

  const onSubmit: SubmitHandler<UserLoginInputs> = (data) => console.log(data);

  return (
    <div className='space-y-8 text-center flex flex-col items-center'>
      <h1 className='text-4xl font-extrabold tracking-wide text-primary'>
        Welcome to Digital Library
      </h1>
      <p className='text-primary'>Please enter your details</p>

      <form onSubmit={handleSubmit(onSubmit)} className='w-5/6 space-y-4'>
        {/* email address */}

        <CustomInput
          label='Email Address'
          name='email'
          type='email'
          placeholder='Please enter your email'
          register={register('email', { required: 'Email is required' })}
          error={errors.email}
        />
        {/* password */}
        <PasswordInput
          label='Password'
          name='password'
          placeholder='Please enter your password'
          register={register('password', { required: 'Password is required' })}
          error={errors.password}
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
              className=' text-sm text-primary ml-4 font-medium'
            >
              Remember me
            </label>
          </div>
          <a href='#' className=' text-sm text-primary font-medium'>
            Forgot password?
          </a>
        </div>
        {/* submit button */}
        <div>
          <button
            type='submit'
            className='
            w-full px-4 py-2 mt-6 rounded-full
            bg-primary text-white font-medium tracking-wide 
            focus:outline-none
          '
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
