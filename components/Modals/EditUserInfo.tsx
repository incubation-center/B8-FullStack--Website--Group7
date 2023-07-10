import { useForm, SubmitHandler } from 'react-hook-form';

import { motion } from 'framer-motion';

import { AlertType, AlertModalTextType } from './Alert';
import { User } from '@/types';
import CustomInput from '../login/CustomInput';
import { updateUserInfo } from '@/service/api/user';
import { useState } from 'react';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useRecoilState } from 'recoil';
import { AuthAtom } from '@/service/recoil';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('homepage');

  const [isUpdating, setIsUpdating] = useState(false);
  const [authStore, setAuthStore] = useRecoilState(AuthAtom);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUserInfoInputs>();

  const onSubmit: SubmitHandler<EditUserInfoInputs> = async (data) => {
    setIsUpdating(true);
    try {
      const res = await updateUserInfo(userInfo.userId as string, data);

      setAuthStore({
        ...authStore,
        user: res.data
      });

      close();
      showAlert({
        title: t('information-update.info-update-text'),
        subtitle: t('information-update.thank-you'),
        type: AlertType.SUCCESS
      });
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      setIsUpdating(false);
    }
  };

  return (
    <>
      {/* hack for preventing dismiss modal by click outside */}
      {isUpdating && (
        <div className='fixed top-0 left-0 h-screen w-screen'></div>
      )}

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
            {t('edit-modal.personal-info')}
          </h1>

          {/* User Information */}
          <div className='w-full text-left space-y-4'>
            <CustomInput
              label={t('edit-modal.username')}
              name='username'
              type='text'
              defaultValue={userInfo.username}
              register={register('username', {
                required: 'Username cannot be empty'
              })}
              error={errors.username}
              labelClassName='text-primary ml-4 font-medium'
              disabled={isUpdating}
            />

            <CustomInput
              label={t('edit-modal.email')}
              name='email'
              type='email'
              defaultValue={userInfo.email}
              register={register('email', {
                required: 'Email cannot be empty'
              })}
              error={errors.email}
              labelClassName='text-primary ml-4 font-medium'
              disabled={isUpdating}
            />

            <CustomInput
              label={t('edit-modal.phone-number')}
              name='phoneNumber'
              type='tel'
              defaultValue={userInfo.phoneNumber}
              register={register('phoneNumber', {
                required: 'Phone Number cannot be empty'
              })}
              error={errors.phoneNumber}
              labelClassName='text-primary ml-4 font-medium'
              disabled={isUpdating}
            />
          </div>

          {/* actions */}
          <div className='w-full flex justify-evenly gap-4'>
            {/* cancel button */}
            {!isUpdating && (
              <button
                onClick={close}
                className='
              bg-danger rounded-full text-white py-2 px-4 w-full md:w-40
            '
              >
                {t('edit-modal.cancel-btn')}
              </button>
            )}

            {/* submit button */}
            <button
              className={`
            bg-primary rounded-full text-white py-2 px-4 w-full 
            ${!isUpdating ? 'md:w-40' : 'md:w-80 bg-opacity-80'}
         `}
              type='submit'
              disabled={isUpdating}
            >
              {!isUpdating ? (
                <div> {t('edit-modal.save-btn')}</div>
              ) : (
                <div className='flex gap-2 justify-center items-center'>
                  <SpinningLoadingSvg className='inline-block w-6 h-6 mr-2' />
                  <span>{t('edit-modal.updating-info')}</span>
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </form>
    </>
  );
}
