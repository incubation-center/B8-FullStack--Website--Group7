import { useForm, SubmitHandler } from 'react-hook-form';

import { motion } from 'framer-motion';

import { AlertType, AlertModalTextType } from './Alert';
import { User } from '@/types';
import CustomInput from '../login/CustomInput';

interface EditUserInfoInputs {
  username: string;
  email: string;
  phoneNumber: string;
}

export default function EditUserInfo({
  userInfo,
  close,
  showAlert
}: {
  userInfo: User;
  close: () => void;
  showAlert: (alert: AlertModalTextType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserInfoInputs>();

  const onSubmit: SubmitHandler<EditUserInfoInputs> = (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    close();

    showAlert({
      title: 'Your Information have been updated!',
      subtitle: 'Thank you!',
      type: AlertType.SUCCESS
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        animate={{
          height: 'auto'
        }}
        transition={{
          duration: 0.5
        }}
        className='w-full h-full p-8 rounded-lg text-center bg-alt-secondary space-y-10'
      >
        <h1 className='text-2xl font-bold text-primary'>
          Personal Information
        </h1>

        {/* User Information */}
        <div className='w-full text-left space-y-4'>
          <CustomInput
            label='Username'
            name='username'
            type='text'
            defaultValue={userInfo.username}
            register={register('username', {
              required: 'Username cannot be empty'
            })}
            error={errors.username}
            labelClassName='text-primary ml-4 font-medium'
          />

          <CustomInput
            label='Email'
            name='email'
            type='email'
            defaultValue={userInfo.email}
            register={register('email', {
              required: 'Email cannot be empty'
            })}
            error={errors.email}
            labelClassName='text-primary ml-4 font-medium'
          />

          <CustomInput
            label='Phone Number'
            name='phoneNumber'
            type='tel'
            defaultValue={userInfo.phoneNumber}
            register={register('phoneNumber', {
              required: 'Phone Number cannot be empty'
            })}
            error={errors.phoneNumber}
            labelClassName='text-primary ml-4 font-medium'
          />
        </div>

        {/* actions */}
        <div className='w-full flex justify-evenly gap-4'>
          {/* cancel button */}
          <button
            onClick={close}
            className='
            bg-danger rounded-full text-white py-2 px-4 w-full md:w-40
          '
          >
            Cancel
          </button>

          {/* submit button */}
          <button
            className='
            bg-primary rounded-full text-white py-2 px-4 w-full md:w-40
          '
            type='submit'
          >
            Save
          </button>
        </div>
      </motion.div>
    </form>
  );
}
