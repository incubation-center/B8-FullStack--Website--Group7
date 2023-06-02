import RequiredIcon from './RequiredIcon';

import { UseFormRegisterReturn } from 'react-hook-form';

export default function CustomInput({
  register,
  error,
  name,
  type,
  placeholder,
  label
}: {
  register: UseFormRegisterReturn<any>;
  error: any;
  name: string;
  type: string;
  placeholder: string;
  label: string;
}) {
  return (
    <div className='flex flex-col items-start w-full'>
      <label htmlFor={name} className='text-primary ml-4 font-medium'>
        {label}
        <RequiredIcon />
      </label>
      <input
        {...register}
        id={name}
        name={name}
        type={type}
        className='
          w-full px-4 py-2 mt-2 rounded-full
          bg-alt-secondary 
          placeholder-black placeholder-opacity-50
          focus:outline-none
        '
        placeholder={placeholder}
      />

      {error && <p className='pl-4 text-red-500 text-sm'>{error?.message}</p>}
    </div>
  );
}
