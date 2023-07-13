import { UserRegisterInputs } from '@/types/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';

import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';
import { AuthRegister } from '@/service/api/auth';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { useTranslation } from 'next-i18next';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';

export default function UserRegisterForm({}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const { showAlert, AlertModal } = useAlertModal();

  const { t } = useTranslation('signup');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegisterInputs>();

  const onSubmit: SubmitHandler<UserRegisterInputs> = async (data) => {
    setIsRegistering(true);

    try {
      const usernameWithNoSpace = data.username.trim().replace(' ', '+');

      // add default profile url
      const formData = {
        ...data,
        profileUrl: `https://ui-avatars.com/api/?name=${usernameWithNoSpace}&background=random&size=128`,
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
        message =
          errors.response?.data.error || t('error-tap.error-occur-text');
      }
      showAlert({
        title: message,
        subtitle: t('error-tap.try-again'),
        type: AlertType.ERROR,
      });
    }

    setIsRegistering(false);
  };

  return (
    <>
      <AlertModal />
      <div className=' space-y-8 text-center flex flex-col items-center '>
        <h1 className='text-2xl font-extrabold text-alt-secondary'>
          {t('title')}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='min-w-[300px] lg:min-w-[500px] max-w[600px] space-y-1 lg:space-y-4
          
          '
          autoComplete='off'
        >
          <CustomInput
            register={register('username', {
              required: t('user-required-alert'),
            })}
            error={errors.username}
            name='username'
            type='text'
            placeholder={t('username-placeholder')}
            label={t('username')}
            labelClassName='text-alt-secondary ml-4 font-medium '
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <CustomInput
            register={register('email', {
              required: t('email-required-alert'),
            })}
            error={errors.email}
            name='email'
            type='email'
            placeholder={t('email-placeholder')}
            label={t('email')}
            labelClassName='text-alt-secondary ml-4 font-medium '
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isRegistering}
          />

          <div className='flex flex-col md:flex-row gap-2'>
            <PasswordInput
              register={register('password', {
                required: t('password-required-alert'),
                minLength: {
                  value: 8,
                  message: t('invalid-password-alert'),
                },
              })}
              error={errors.password}
              name='password'
              placeholder={t('password-placeholder')}
              label={t('password')}
              labelClassName='text-alt-secondary ml-4 font-medium'
              errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
              disabled={isRegistering}
            />

            <PasswordInput
              register={register('confirmPassword', {
                required: t('cfm-password-required-alert'),
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return t('password-not-matched');
                  }
                },
              })}
              error={errors.confirmPassword}
              name='confirmPassword'
              placeholder={t('cfm-password-placeholder')}
              label={t('cfm-password')}
              labelClassName='text-alt-secondary ml-4 font-medium'
              errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
              disabled={isRegistering}
            />
          </div>

          <CustomInput
            register={register('phoneNumber', {
              required: t('phone-required-alert'),
              minLength: {
                value: 9,
                message: t('invalid-phone-alert'),
              },
            })}
            error={errors.phoneNumber}
            name='phoneNumber'
            type='tel'
            placeholder={t('phone-placeholder')}
            label={t('phone')}
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
              {/* {t('sign-up')} */}
              {!isRegistering && t('sign-up')}
              {isRegistering && (
                <div className='flex justify-center items-center'>
                  <h1>{t('signing-up-btn')}</h1>
                  <SpinningLoadingSvg className='w-6 h-6 ml-2 text-white' />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
