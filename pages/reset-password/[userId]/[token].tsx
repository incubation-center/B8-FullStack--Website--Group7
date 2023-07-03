import useAlertModal from '@/components/Modals/Alert';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import PasswordInput from '@/components/login/PasswordInput';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId, token } = context.params as {
    userId: string;
    token: string;
  };

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
  const [isResettingPassword, setIsResettingPassword] = useState(false);

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
  }> = async (data) => {};

  const { AlertModal, showAlert } = useAlertModal();

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
                  required: 'Please enter your password'
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
