import { useState } from 'react';

import { Listbox } from '@headlessui/react';
import { motion } from 'framer-motion';

import { Book } from '@/types';
import useAlertModal, { AlertType, AlertModalTextType } from './Alert';

const durations = [
  { value: 7, label: '1 week' },
  { value: 14, label: '2 weeks' },
  { value: 21, label: '3 weeks' }
];

export default function BorrowBook({
  book,
  close,
  showAlert
}: {
  book: Book;
  close: () => void;
  showAlert: (alert: AlertModalTextType) => void;
}) {
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  const handleBorrowBook = () => {
    console.log('====================================');
    console.log('borrow book');
    console.log('title: ', book.title);
    console.log('duration: ', selectedDuration.label);
    console.log('====================================');

    close();

    showAlert({
      title: 'You successfully requesting!',
      subtitle:
        'Please wait for confirmation form Admin!\nStay Tune! Thank you!',
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
      <h1 className='text-2xl font-bold text-primary'>Book Rental Form</h1>

      {/* book details */}
      <div className='w-full text-left space-y-4'>
        <div>
          <label htmlFor='bookTitle' className='ml-4 font-medium text-primary'>
            Book title
          </label>
          <input
            id='bookTitle'
            name='bookTitle'
            type='text'
            readOnly
            className='
            w-full px-4 py-2 mt-2 rounded-full
            bg-white
            placeholder-[#9D9C9C] 
            focus:outline-none
          '
            value={book.title}
          />
        </div>

        <div>
          <h1 className='ml-4 font-medium text-primary '>Duration</h1>
          <Listbox value={selectedDuration} onChange={setSelectedDuration}>
            <Listbox.Button
              className='
                w-full px-4 py-2 mt-2 rounded-full
                bg-white
                placeholder-[#9D9C9C] 
                focus:outline-none text-left
                flex justify-between items-center
              '
            >
              <h1>{selectedDuration.label}</h1>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/icon/expand.png'
                alt='expand'
                className='w-6 h-auto -mr-2'
              />
            </Listbox.Button>

            <motion.div layout>
              <Listbox.Options
                className='
                  w-full mt-2 rounded-2xl overflow-clip
                  bg-white
                  placeholder-[#9D9C9C] 
                  focus:outline-none
                '
              >
                <motion.div
                  key={selectedDuration.label}
                  initial={{ height: 0 }}
                  animate={{
                    height: 'auto'
                  }}
                  exit={{ height: 0 }}
                >
                  {durations.map((duration) => (
                    <Listbox.Option
                      className={`
                        w-full px-2 py-2 cursor-pointer
                        hover:bg-secondary hover:text-white
                        focus:bg-secondary focus:text-white
                        flex space-x-2
                      `}
                      key={duration.label}
                      value={duration}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src='/icon/selected.png'
                        alt='selected'
                        className={`
                          w-6 h-auto
                          ${
                            selectedDuration.value === duration.value
                              ? 'block'
                              : 'invisible'
                          }
                        `}
                      />
                      <h1>{duration.label}</h1>
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </motion.div>
          </Listbox>
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
          onClick={handleBorrowBook}
        >
          Borrow
        </button>
      </div>
    </motion.div>
  );
}
