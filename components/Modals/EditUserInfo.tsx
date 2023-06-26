import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { motion } from 'framer-motion';

import { Book } from '@/types';
import useAlertModal, { AlertType, AlertModalTextType } from './Alert';

export default function EditUserInfo({
  book,
  close,
  showAlert
}: {
  book: Book;
  close: () => void;
  showAlert: (alert: AlertModalTextType) => void;
}) {

  const handleSaveInfo = () => {
    close();

    showAlert({
      title: 'Your Information have been updated!',
      subtitle:
        'Thank you!',
      type: AlertType.SUCCESS
    });
  };

  return (
    <motion.div
      animate={{
        height: 'auto'
      }}
      transition={{
        duration: 0.5
      }}
      className='w-full h-full p-8 rounded-lg text-center bg-alt-secondary space-y-10'
    >
      <h1 className='text-2xl font-bold text-primary'>Personal Information</h1>

      {/* User Information */}
      <div className='w-full text-left space-y-4'>
        <div>
          <label htmlFor='bookTitle' className='ml-4 font-medium text-primary'>
            Username
          </label>
          <input
            id='username'
            name='username'
            type='text'
            className='
            w-full px-4 py-2 mt-2 rounded-full
            bg-white
            placeholder-[#9D9C9C] 
            focus:outline-none
          '
          />
        </div>
        <div>
          <label htmlFor='bookTitle' className='ml-4 font-medium text-primary'>
            Email
          </label>
          <input
            id='emailUser'
            name='emailUser'
            type='text'
            className='
            w-full px-4 py-2 mt-2 rounded-full
            bg-white
            placeholder-[#9D9C9C] 
            focus:outline-none
          '
          />
        </div>
        <div>
          <label htmlFor='bookTitle' className='ml-4 font-medium text-primary'>
            Phone Number
          </label>
          <input
            id='phoneNum'
            name='phoneNum'
            type='text'
            className='
            w-full px-4 py-2 mt-2 rounded-full
            bg-white
            placeholder-[#9D9C9C] 
            focus:outline-none
          '
          />
        </div>
      </div>

      {/* actions */}
      <div className='w-full flex justify-evenly gap-4'>
        {/* cancel button */}
        <button
          onClick={close}
          className='
            bg-danger rounded-lg text-white py-2 px-4 w-full md:w-40
          '
        >
          Cancel
        </button>

        {/* submit button */}
        <button
          className='
            bg-primary rounded-lg text-white py-2 px-4 w-full md:w-40
          '
          onClick={handleSaveInfo}
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}
