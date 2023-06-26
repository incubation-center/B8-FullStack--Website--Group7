import { HTMLAttributes, useState } from 'react';
import Image from 'next/image';

import { UseFormRegisterReturn } from 'react-hook-form';

import RequiredIcon from './RequiredIcon';

export default function PasswordInput({
  register,
  error,
  name,
  placeholder,
  label,
  labelClassName,
  errorClassName,
  autoComplete
}: {
  register: UseFormRegisterReturn<any>;
  error: any;
  name: string;
  placeholder: string;
  label: string;
  labelClassName: HTMLAttributes<HTMLLabelElement>['className'];
  errorClassName?: HTMLAttributes<HTMLParagraphElement>['className'];
  autoComplete?: string;
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const iconPath = isShowPassword ? '/icon/cross-eye.png' : '/icon/eye.png';

  return (
    <div className='flex flex-col items-start w-full'>
      <label htmlFor={name} className={labelClassName}>
        {label}
        <RequiredIcon />
      </label>
      <div className='relative w-full flex flex-row items-center justify-center'>
        <input
          {...register}
          name={name}
          type={isShowPassword ? 'text' : 'password'}
          className='
          w-full px-4 py-2 mt-2 rounded-full
          bg-white
          placeholder-[#9D9C9C] 
          focus:outline-none
        '
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        <Image
          src={iconPath}
          alt='show password'
          width={20}
          height={20}
          onClick={toggleShowPassword}
          className='absolute right-4 mt-2 cursor-pointer'
        />
      </div>

      {error && (
        <p
          className={
            errorClassName ? errorClassName : 'pl-4 text-red-500 text-sm'
          }
        >
          {error?.message}
        </p>
      )}
    </div>
  );
}
