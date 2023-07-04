import { motion, AnimatePresence } from 'framer-motion';

import { Book } from '@/types';
import RightArrowSvg from '../icon/RightArrowSvg';
import Image from 'next/image';

export default function ViewEditBook({
  book,
  close
}: {
  book: Book;
  close: () => void;
}) {
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
        className='fixed right-0 top-0 w-2/3 2xl:w-1/2 h-screen z-[999999] flex justify-center items-center '
      >
        <div>
          <motion.button
            animate={{
              // x: ['10vw', '0vw'],
              // rotate: [0, 180],
              transition: { delay: 0.3, duration: 0.5 }
            }}
            className=' bg-primary px-2 py-4 z-0 rounded-l-full translate-x-2'
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
              <RightArrowSvg className='ml-2 w-6 h-6 text-alt-secondary' />
            </motion.div>
          </motion.button>
        </div>
        {/* book */}
        <div className='h-screen w-full bg-primary p-4 overflow-auto z-10'>
          <div className='relative w-56 h-64 mb-10 md:mb-0'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              src={book.bookImg}
              alt={book.title}
              fill
              className='aspect-auto max-w-[200px] max-h-[300px]'
            />
          </div>
          <div className='flex justify-between items-end gap-2 mt-10'>
            <div className='w-fit space-y-[10px] text-alt-secondary font-light'>
              <h1 className='font-bold text-2xl'>{book.title}</h1>

              <h2>Author: {book.author}</h2>
              <h2>Genre: {book.category}</h2>
            </div>
          </div>

          <div className='text-alt-secondary mt-4'>
            <h2 className='font-bold'>Book Description</h2>

            <p className='mt-[10px] text-alt-secondary font-light'>
              {book.description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
