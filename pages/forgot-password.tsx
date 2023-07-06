import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import CustomInput from '@/components/login/CustomInput';
import { AuthForgotPassword } from '@/service/api/auth';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function ForgotPassword() {
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
        title: 'Email sent!!!',
        subtitle: 'Check your email to reset your password',
        type: AlertType.SUCCESS
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        showAlert({
          title: 'Error',
          subtitle: err.response?.data?.error || 'An unknown error occurred',
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
              Forgot Your Password?
            </h1>
            <p className='text-alt-secondary text-base'>
              Please enter your email to <br />
              reset your password
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 min-w-[300px]'
            >
              <CustomInput
                label=''
                name='email'
                type='email'
                placeholder='email'
                register={register('email', { required: 'Email is required' })}
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
                  <span>Send</span>
                )}
              </button>
            </form>

            <Link href='/auth'>
              <span className='text-alt-secondary'>Go back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
