/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler } from 'react-hook-form';

import { UserLoginInputs } from '@/types/auth';

import { AuthLogin } from '@/service/api/auth';

import CustomInput from '../CustomInput';
import PasswordInput from '../PasswordInput';
import { useEffect, useState } from 'react';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { AxiosError } from 'axios';
import { processUserToken } from '@/service/token';
import { useRecoilState } from 'recoil';
import { AuthAtom } from '@/service/recoil';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function UserLoginForm() {
  const { t } = useTranslation('login');

  const [_, setAuthStore] = useRecoilState(AuthAtom);

  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const { showAlert, AlertModal } = useAlertModal();

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
      const refreshToken = data['refresh-token'];

      // set access token to cookies using next-cookies
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      const authObj = await processUserToken(accessToken);
      setAuthStore(authObj);

      router.reload();
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
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <AlertModal />

      <div className='space-y-4 text-center flex flex-col items-center overflow-auto'>
        <h1 className='text-2xl font-extrabold text-alt-secondary'>
          {t('welcome-text')}
        </h1>
        <p className='text-alt-secondary'>{t('p-details-login-tab')}</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-5/6 min-w-[300px] space-y-4'
        >
          {/* email address */}

          <CustomInput
            label={t('email')}
            name='email'
            type='email'
            placeholder={t('email-placeholder')}
            register={register('email', {
              required: t('email-required-alert')
            })}
            showRequiredIcon
            error={errors.email}
            labelClassName='text-alt-secondary ml-4 font-medium'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isLoggingIn}
          />
          {/* password */}
          <PasswordInput
            label={t('password')}
            name='password'
            placeholder={t('password-placeholder')}
            register={register('password', {
              required: t('password-required-alert')
            })}
            error={errors.password}
            labelClassName='text-alt-secondary ml-4 font-medium'
            errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
            disabled={isLoggingIn}
          />
          {/* remember me and forgot password */}
          <div className='flex flex-wrap gap-4 justify-end items-center w-full px-4 whitespace-nowrap'>
            <Link
              href='/forgot-password'
              className=' text-sm text-alt-secondary font-medium'
              locale={router.locale}
            >
              {t('forget-password')}
            </Link>
          </div>
          {/* submit button */}

          <button
            type='submit'
            className={`
              w-full px-4 py-2 mt-6 rounded-full
              bg-secondary text-white text-xl tracking-wide 
              focus:outline-none
              ${isLoggingIn && 'cursor-not-allowed bg-opacity-50'}
            `}
            disabled={isLoggingIn}
          >
            {!isLoggingIn && t('login-btn')}
            {isLoggingIn && (
              <div className='flex justify-center items-center'>
                <h1>{t('logging-in-btn')}</h1>
                <SpinningLoadingSvg className='w-6 h-6 ml-2 text-white' />
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
