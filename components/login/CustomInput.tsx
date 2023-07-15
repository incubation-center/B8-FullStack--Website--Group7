import { HTMLAttributes } from 'react';
import RequiredIcon from './RequiredIcon';

import { UseFormRegisterReturn } from 'react-hook-form';

export default function CustomInput({
  register,
  error,
  name,
  type,
  placeholder,
  defaultValue,
  label,
  labelClassName,
  errorClassName,
  disabled = false,
  showRequiredIcon = false
}: {
  register: UseFormRegisterReturn<any>;
  error: any;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  label: string;
  labelClassName: HTMLAttributes<HTMLLabelElement>['className'];
  errorClassName?: HTMLAttributes<HTMLParagraphElement>['className'];
  disabled?: boolean;
  showRequiredIcon?: boolean;
}) {
  return (
    <div className='flex flex-col items-start w-full z-0'>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {showRequiredIcon && <RequiredIcon />}
      </label>

      <input
        {...register}
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className='
          w-full px-4 py-2 mt-2 rounded-full
          bg-white
          placeholder-[#9D9C9C] 
          focus:outline-none
        '
        placeholder={placeholder}
        disabled={disabled}
      />

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
