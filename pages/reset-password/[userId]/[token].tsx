import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import PasswordInput from '@/components/login/PasswordInput';
import {
  AuthResetPassword,
  AuthValidateResetPasswordToken
} from '@/service/api/auth';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId, token } = context.params as {
    userId: string;
    token: string;
  };

  const locale = context.locale as string;

  try {
    await AuthValidateResetPasswordToken(token);

    return {
      props: {
        userId,
        token,
        ...(await serverSideTranslations(locale, ['common', 'reset-password']))
      }
    };
  } catch (err) {
    return {
      redirect: {
        destination: `/${locale}/reset-password/expired`,
        permanent: true
      }
    };
  }
}

export default function ResetPassword({
  userId,
  token
}: {
  userId: string;
  token: string;
}) {
  const router = useRouter();

  const { t } = useTranslation('reset-password');

  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const { AlertModal, showAlert } = useAlertModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>();

  const onSubmit: SubmitHandler<{
    password: string;
    confirmPassword: string;
  }> = async (data) => {
    setIsResettingPassword(true);

    try {
      const formData = {
        userId,
        newPassword: data.password,
        resetPwdToken: token
      };

      const res = await AuthResetPassword(formData);

      if (res.status !== 200) throw new Error('An unknown error occurred');

      showAlert({
        title: t('success-tap.success'),
        subtitle: t('success-tap.pass-been-reset'),
        type: AlertType.SUCCESS,
        onModalClose: () => {
          router.push('/auth', undefined, { locale: router.locale });
        }
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        showAlert({
          title: t('error-tap.error'),
          subtitle: err.response?.data?.error || t('error-tap.pass-reset-fail'),
          type: AlertType.ERROR
        });
      }
      console.error(err);
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <>
      <AlertModal />

      <div className='w-full h-full flex justify-center items-center bg-primary'>
        <div
          className='
          flex flex-col justify-center items-center
          h-fit w-fit
          overflow-y-scroll
         
        '
        >
          <div className='space-y-4 text-center flex flex-col items-center'>
            <h1 className='text-2xl font-extrabold text-alt-secondary'>
              {t('reset-password-text')}
            </h1>
            <p className='text-alt-secondary text-base'>
              {t('enter-new-pass')}
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='min-w-[300px] space-y-4'
            >
              {/* password */}
              <PasswordInput
                register={register('password', {
                  required: t('pass-is-required'),
                  minLength: {
                    value: 8,
                    message: t('pass-must-be-at-least')
                  }
                })}
                error={errors.password}
                name='password'
                label={t('password')}
                placeholder={t('password-placeholder')}
                labelClassName='text-alt-secondary ml-4 font-medium'
                errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
                disabled={isResettingPassword}
              />

              {/* confirm password */}
              <PasswordInput
                register={register('confirmPassword', {
                  required: t('confirm-pass-is-required'),
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return t('pass-must-match');
                    }
                  }
                })}
                error={errors.confirmPassword}
                name='confirmPassword'
                label={t('conf-pass')}
                placeholder={t('conf-pass-placeholder')}
                labelClassName='text-alt-secondary ml-4 font-medium'
                errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
                disabled={isResettingPassword}
              />

              <button
                type='submit'
                className='
                  bg-secondary
                  text-white
                  rounded-full
                  px-4
                  py-2
                  font-medium
                  text-sm
                  w-56
                '
                disabled={isResettingPassword}
              >
                {isResettingPassword ? (
                  <div className='flex justify-center items-center'>
                    <SpinningLoadingSvg className='w-5 h-5 text-white' />
                    <span className='ml-2'>{t('reset-password')}</span>
                  </div>
                ) : (
                  t('reset-pass-btn')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
