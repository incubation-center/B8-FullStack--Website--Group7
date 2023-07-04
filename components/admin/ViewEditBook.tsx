import { HTMLAttributes, useLayoutEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { Book } from '@/types';
import RightArrowSvg from '../icon/RightArrowSvg';
import Image from 'next/image';
import { useDebounce } from '@/utils/function';

export default function ViewEditBook({
  book,
  close
}: {
  book: Book;
  close: () => void;
}) {
  const [defaultBook, setDefaultBook] = useState(book);

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onChangeDescription = useDebounce((text: string) => {
    setDefaultBook((prev) => {
      return {
        ...prev,
        description: text
      };
    });
  }, 300);

  const variants = {
    hidden: {
      x: '100%',
      y: 0
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.3
      }
    }
  };

  const activeClassName = `
    py-2 
    bg-primary text-alt-secondary
    border-b-2 border-alt-secondary box-content
    focus:outline-none
  `;
  const defaultClassName = `
    py-2 bg-transparent border-b-2 border-primary 
    focus:outline-none

  `;

  return (
    <>
      {/* overlay */}
      <motion.div
        key='overlay'
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: [0, 1]
        }}
        exit={{
          opacity: [1, 0],
          transition: { delay: 0.3 }
        }}
        className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 filter backdrop-blur-sm'
        onClick={() => {
          close();
        }}
      ></motion.div>

      {/* view-edit */}
      <motion.div
        key='view-edit-book'
        variants={variants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='fixed right-0 top-0 w-2/3 2xl:w-1/2 h-screen z-[999999] flex items-center shadow-xl'
      >
        <button
          className=' bg-primary p-4 z-0 rounded-l-full translate-x-2 shadow-xl'
          onClick={() => {
            close();
          }}
        >
          <motion.div
            animate={{
              rotate: [180, 0],
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            <RightArrowSvg className='h-7 w-7 text-alt-secondary translate-x-1' />
          </motion.div>
        </button>
        {/* book */}

        <div className='h-screen w-full bg-primary p-4 overflow-auto z-10 relative'>
          {/* edit button */}
          <div className='absolute top-4 right-4 flex gap-2'>
            {!isEditing ? (
              <button
                className=' bg-secondary w-32 p-2 px-8 text-white rounded-full'
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className=' bg-danger  w-32 p-2 px-8 text-white rounded-full'
                  onClick={() => {
                    setIsEditing(false);
                    setDefaultBook(book);
                  }}
                >
                  Cancel
                </button>
                <button
                  className=' bg-success  w-32 p-2 px-8 text-white rounded-full'
                  onClick={() => {
                    setIsUpdating(true);
                  }}
                >
                  Save
                </button>
              </>
            )}
          </div>

          {/* book cover */}
          <div className='relative w-56 h-64 mb-10 md:mb-0'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              src={book.bookImg}
              alt={book.title}
              fill
              className='aspect-auto max-w-[200px] max-h-[300px] object-contain object-left'
            />
          </div>

          {/* book detail */}
          <form>
            <div className='flex justify-between items-end gap-2 mt-10'>
              <div className='w-full space-y-[10px] text-alt-secondary font-light'>
                <h1 className='font-bold text-2xl'>
                  <input
                    type='text'
                    value={defaultBook.title}
                    onChange={(e) => {
                      setDefaultBook((prev) => {
                        return {
                          ...prev,
                          title: e.target.value ?? ''
                        };
                      });
                    }}
                    disabled={!isEditing}
                    className={`
                      ${isEditing ? activeClassName : defaultClassName} 
                      transition-all duration-300 focus:outline-none w-full
                    `}
                  />
                </h1>

                <h2>
                  <span className='font-medium'>Author:</span>
                  <br />
                  <input
                    type='text'
                    value={defaultBook.author}
                    onChange={(e) => {
                      setDefaultBook((prev) => {
                        return {
                          ...prev,
                          author: e.target.value ?? ''
                        };
                      });
                    }}
                    disabled={!isEditing}
                    className={`
                      ${isEditing ? activeClassName : defaultClassName} 
                      transition-all duration-300
                    `}
                  />
                </h2>
                <h2>
                  <span className='font-medium'>Genre:</span>
                  <br />
                  <input
                    type='text'
                    value={defaultBook.category}
                    onChange={(e) => {
                      setDefaultBook((prev) => {
                        return {
                          ...prev,
                          category: e.target.value ?? ''
                        };
                      });
                    }}
                    disabled={!isEditing}
                    className={`
                      ${isEditing ? activeClassName : defaultClassName} 
                      transition-all duration-300
                    `}
                  />
                </h2>
              </div>
            </div>

            <div className='text-alt-secondary mt-4'>
              <h2 className='font-bold'>Book Description</h2>

              <div className='mt-[10px] text-alt-secondary font-light w-full'>
                <div
                  suppressContentEditableWarning={true}
                  contentEditable={isEditing}
                  onInput={(e) =>
                    onChangeDescription(e.currentTarget.textContent || '')
                  }
                  className={`
                    ${isEditing ? activeClassName : defaultClassName} 
                    transition-all duration-300 w-full  
                  `}
                >
                  {defaultBook.description}
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
