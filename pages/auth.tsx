import { useState } from 'react';
import Image from 'next/image';

import UserLoginForm from '@/components/Modals/login/User/loginForm';
import UserRegisterForm from '@/components/Modals/login/User/RegisterForm';

export default function UserAuthentication({}) {
  const [formState, setFormState] = useState<'login' | 'register'>('login');

  return (
    <div
      className='
        h-full w-full bg-secondary
        grid grid-cols-2

      '
    >
      <div
        className='
          flex flex-col justify-center items-center
        '
      >
        {formState === 'login' && <UserLoginForm />}
        {formState === 'register' && <UserRegisterForm />}

        <div className='mt-6'>
          {(formState === 'login' && (
            <div className='flex flex-row items-center'>
              <p className='text-primary'>Don{"'"}t have an account?</p>
              <button
                className='
                  ml-2 
                  text-primary font-bold
                  hover:underline
                '
                onClick={() => setFormState('register')}
              >
                Sign Up
              </button>
            </div>
          )) || (
            <div className='flex flex-row items-center'>
              <p className='text-primary'>Already have an account?</p>
              <button
                className='
                  ml-2 
                  text-primary font-bold
                  hover:underline
                '
                onClick={() => setFormState('login')}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* bookshelf image */}
      <div className='flex justify-center items-center'>
        <div className='relative w-[500px] h-[600px] overflow-clip rounded-[20px]'>
          <Image
            src='/asset/library.png'
            alt='bookshelf'
            fill
            quality={100}
            className='object-cover'
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 100vw'
          />
        </div>
      </div>
    </div>
  );
}
