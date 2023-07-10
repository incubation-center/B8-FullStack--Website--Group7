import { useEffect, useState } from 'react';
import Image from 'next/image';

import UserLoginForm from '@/components/login/User/loginForm';
import UserRegisterForm from '@/components/login/User/RegisterForm';
import LocaleSwitching from '@/components/LocaleSwitching';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

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
        h-full w-full bg-primary
        grid grid-cols-1 md:grid-cols-2
        p-4  
        md:space-x-4
        overflow-y-scroll
      '
    >
      <div className='flex flex-col justify-center items-center'>
        <div
          className='
          flex flex-col justify-center items-center
          h-fit w-fit
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

        <div className='w-2/3 max-w-[300px] mt-4'>
          <LocaleSwitching />
        </div>
      </div>

      {/* bookshelf image */}
      <div className='hidden md:flex justify-center items-center'>
        <div
          className='relative 
          w-[350px] h-[450px]
          lg:w-[500px] lg:h-[600px]
          overflow-clip rounded-[20px]
         '
        >
          <Image
            src='/asset/library.png'
            alt='bookshelf'
            fill
            quality={100}
            className='object-cover'
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
