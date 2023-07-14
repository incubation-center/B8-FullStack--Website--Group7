/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Image from 'next/image';

import UserLoginForm from '@/components/login/User/loginForm';
import UserRegisterForm from '@/components/login/User/RegisterForm';
import LocaleSwitching from '@/components/LocaleSwitching';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ThemeSwitching from '@/components/ThemeSwitching';

export default function UserAuthentication({}) {
  const router = useRouter();
  const [formState, setFormState] = useState<'login' | 'register'>('login');

  const { t } = useTranslation(['common', 'signup', 'login']);

  useEffect(() => {
    router.prefetch('/', undefined, {
      locale: router.locale
    });
  }, []);

  return (
    <div
      className='
        min-h-screen w-full bg-primary
        grid grid-cols-1 lg:grid-cols-2
        p-4 py-8 md:space-x-4
        overflow-y-scroll

        relative
      '
    >
      <div className='flex flex-col justify-center items-center'>
        <div
          className='relative 
          h-32 w-56 mb-4
          overflow-clip rounded-[20px]
          block lg:hidden
         '
        >
          <Image
            src='/bootcamp-logo.png'
            alt='bookshelf'
            fill
            quality={100}
            className='object-contain'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 100vw'
            priority
          />
        </div>
        <div
          className='
          flex flex-col justify-center items-center
          h-fit w-full
          overflow-y-scroll
        '
        >
          {formState === 'login' && <UserLoginForm />}
          {formState === 'register' && <UserRegisterForm />}

          <div className='mt-6 tracking-wider'>
            {(formState === 'login' && (
              <div className='flex flex-row'>
                <p className='text-alt-secondary'>
                  {t('auth.no-account-text')}
                </p>
                <button
                  className='
                  ml-2 
                  text-alt-secondary font-bold
                  hover:underline
                '
                  onClick={() => setFormState('register')}
                >
                  {t('auth.Sign-up-btn')}
                </button>
              </div>
            )) || (
              <div className='flex flex-row'>
                <p className='text-alt-secondary'>
                  {t('auth.already-got-account')}
                </p>
                <button
                  className='
                  ml-2 
                  text-alt-secondary font-bold
                  hover:underline
                '
                  onClick={() => setFormState('login')}
                >
                  {t('auth.login-btn')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col md:flex-row w-2/3 max-w-[400px] gap-2 mt-6 lg:absolute right-4 bottom-4'>
          <ThemeSwitching className='bg-opacity-10 fill-alt-secondary' />

          <LocaleSwitching className='bg-opacity-10 fill-alt-secondary' />
        </div>
      </div>

      {/* bookshelf image */}
      <div className='hidden lg:flex justify-center items-center'>
        <div
          className='relative 
          w-[350px] h-[450px]
          overflow-clip rounded-[20px]
          z-0
         '
        >
          <Image
            src='/bootcamp-logo.png'
            alt='bookshelf'
            fill
            quality={100}
            className='object-contain'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 100vw'
            priority
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const locale = context.locale as string;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['login', 'signup', 'common']))
    }
  };
}
