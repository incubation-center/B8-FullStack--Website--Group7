import { motion } from 'framer-motion';
import PasswordInput from '../login/PasswordInput';
import { AlertModalTextType, AlertType } from './Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../login/CustomInput';
import { User } from '@/types';
import { changePassword } from '@/service/api/user';
import { useState } from 'react';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword({
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ChangePasswordInputs>();

  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
    setIsUpdating(true);
    try {
      const formData = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      };

      const res = await changePassword(userInfo.userId as string, formData);

      close();
      showAlert({
        title: t('information-update.info-update-text'),
        subtitle: t('information-update.thank-you'),
        type: AlertType.SUCCESS
      });
    } catch (err) {
      let message = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        message = err.response?.data.error;
      }
      close();
      showAlert({
        title: message,
        subtitle: 'Please try again',
        type: AlertType.ERROR
      });
    }

    setIsUpdating(false);
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
        className='w-full h-full p-8 rounded-lg text-center bg-modal space-y-10'
      >
        <h1 className='text-2xl font-bold text-t-primary'>
          {t('change-password-modal.label')}
        </h1>

        <div className='w-full text-left space-y-4'>
          <PasswordInput
            register={register('currentPassword', {
              required: 'Current password is required'
            })}
            error={errors.currentPassword}
            name='currentPassword'
            placeholder={t('change-password-modal.password-placeholder')}
            label={t('change-password-modal.password')}
            labelClassName='text-t-primary ml-4 font-medium text-lg'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
          />

          <PasswordInput
            register={register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              validate: (val: string) => {
                if (watch('currentPassword') === val) {
                  return 'new password must be different from current password';
                }
              }
            })}
            error={errors.newPassword}
            name='newPassword'
            placeholder={t('change-password-modal.new-password-placeholder')}
            label={t('change-password-modal.new-password')}
            labelClassName='text-t-primary ml-4 font-medium text-lg'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
          />

          <PasswordInput
            register={register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (val: string) => {
                if (watch('newPassword') !== val) {
                  return 'Confirm password do not match';
                }
              }
            })}
            error={errors.confirmPassword}
            name='confirmPassword'
            placeholder={t(
              'change-password-modal.confirm-password-placeholder'
            )}
            label={t('change-password-modal.confirm-password')}
            labelClassName='text-t-primary ml-4 font-medium text-lg'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center '
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
              {t('change-password-modal.cancel-btn')}
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
              <div>
                <span>{t('change-password-modal.save-btn')}</span>
              </div>
            ) : (
              <div className='flex justify-center items-center'>
                <SpinningLoadingSvg className='inline-block w-6 h-6 ml-2' />
                <span>{t('change-password-modal.updating-password')}</span>
              </div>
            )}
          </button>
        </div>
      </motion.div>
    </form>
  );
}
