import { UserRegisterInputs } from '@/types/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';

export default function UserRegisterForm({}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserRegisterInputs>();

  const onSubmit: SubmitHandler<UserRegisterInputs> = (data) => {
    const usernameWithNoSpace = data.username.trim().replace(' ', '+');

    // add default profile url
    const formData = {
      ...data,
      profileUrl: `https://ui-avatars.com/api/?name=${usernameWithNoSpace}&background=random&size=128`
    };

    console.log(formData);
  };

  return (
    <div className='lg:min-w-[500px] space-y-8 text-center flex flex-col items-center'>
      <h1 className='text-4xl font-extrabold text-alt-secondary'>
        Create an account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='w-5/6 space-y-4'>
        <CustomInput
          register={register('username', { required: 'Username is required' })}
          error={errors.username}
          name='username'
          type='text'
          placeholder='Enter your username'
          label='Username'
        />

        <CustomInput
          register={register('email', { required: 'Email is required' })}
          error={errors.email}
          name='email'
          type='email'
          placeholder='Enter your email address'
          label='Email address'
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
        />

        {/* sign up button */}
        <div>
          <button
            type='submit'
            className='
            w-full px-4 py-2 mt-6 rounded-full
            bg-secondary text-white font-medium tracking-wide 
            focus:outline-none
          '
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
