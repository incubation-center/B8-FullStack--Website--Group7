import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import CustomInput from '@/components/login/CustomInput';
import { AuthForgotPassword } from '@/service/api/auth';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const router = useRouter();
  const { t } = useTranslation('forgot-password');
  const [sendingEmail, setSendingEmail] = useState(false);

  const { AlertModal, showAlert } = useAlertModal();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    email: string;
  }>();

  const onSubmit: SubmitHandler<{
    email: string;
  }> = async ({ email }: { email: string }) => {
    setSendingEmail(true);

    try {
      await AuthForgotPassword(email);
      showAlert({
        title: t('email-sent-modal.email-sent'),
        subtitle: t('email-sent-modal.check-email'),
        type: AlertType.SUCCESS
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        showAlert({
          title: t('email-send-fail.email-send-fail'),
          subtitle: err.response?.data?.error || t('email-send-fail.try-again'),
          type: AlertType.ERROR
        });
      }
      console.error(err);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <>
      <AlertModal />

      <div
        className='
          w-full min-h-full flex justify-center items-center bg-primary
          px-8
        '
      >
        <div
          className='
          flex flex-col justify-center items-center
          h-fit w-fit
          overflow-y-scroll
         
        '
        >
          <div className='space-y-4 text-center flex flex-col items-center'>
            <h1 className='text-2xl font-extrabold text-alt-secondary'>
              {t('forgot-pass-text')}
            </h1>
            <p className='text-alt-secondary text-base whitespace-pre-line'>
              {t('forgot-pass-p')}
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 min-w-[300px]'
            >
              <CustomInput
                label=''
                name='email'
                type='email'
                placeholder={t('email-placeholder')}
                register={register('email', { required: t('email-required') })}
                error={errors.email}
                labelClassName='hidden'
                errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
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
                disabled={sendingEmail}
              >
                {sendingEmail ? (
                  <div className='flex justify-center items-center'>
                    <SpinningLoadingSvg className='w-4 h-4 mr-2 inline-block' />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>{t('btns.send-btn')}</span>
                )}
              </button>
            </form>

            <Link href='/auth' locale={router.locale}>
              <span className='text-alt-secondary whitespace-nowrap'>
                {t('btns.go-back-to-login')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const locale = context.locale as string;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forgot-password']))
    }
  };
}
