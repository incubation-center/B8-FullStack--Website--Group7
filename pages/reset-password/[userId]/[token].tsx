import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import PasswordInput from '@/components/login/PasswordInput';
import {
  AuthResetPassword,
  AuthValidateResetPasswordToken
} from '@/service/api/auth';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId, token } = context.params as {
    userId: string;
    token: string;
  };

  // validate if token is valid
  // if not valid, redirect to -> /link-expired
  // if valid, render this page

  return {
    props: {
      userId,
      token
    }
  };
}

export default function ResetPassword({
  userId,
  token
}: {
  userId: string;
  token: string;
}) {
  const router = useRouter();

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
        title: 'Success',
        subtitle: 'Your password has been reset',
        type: AlertType.SUCCESS,
        onModalClose: () => {
          router.push('/auth');
        }
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
              Reset Your Password
            </h1>
            <p className='text-alt-secondary text-base'>
              Please enter new password
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='min-w-[300px] space-y-4'
            >
              {/* password */}
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
                label='Password'
                placeholder='Enter your new password'
                labelClassName='text-alt-secondary ml-4 font-medium'
                errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
                disabled={isResettingPassword}
              />

              {/* confirm password */}
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
                label='Confirm Password'
                placeholder='Confirm your new password'
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
                    <span className='ml-2'>Resetting Password</span>
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
