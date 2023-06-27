import { useRouter } from 'next/router';

import { BookData } from '@/dummydata';
import { useEffect } from 'react';

export default function SavedTab({}) {
  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <div className='mt-4 w-full h-screen overflow-y-scroll p-4'>
      <div className='w-full flex flex-col justify-center px-4 space-y-4 md:px-8 md:space-y-8  mb-96'>
        <h1
          className='
            font-extrabold text-primary text-center
            text-2xl md:text-4xl
            w-full border-b-2 border-primary
            pb-4 md:pb-8 
            pt-2 md:pt-4 
          '
        >
          Saved
        </h1>

        <div className='w-full flex flex-wrap gap-8 justify-center'>
          {BookData.map((book, index) => (
            <div key={book.id!} className='flex flex-col space-y-4'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='w-[120px] object-cover cursor-pointer'
                src={book.bookImg}
                alt={book.title}
                draggable={false}
                onClick={() => handleBookClick(book.id!)}
              />

              <button
                className='
                        bg-secondary text-white font-light
                        rounded-lg py-1 px-2
                      '
                onClick={() => handleBookClick(book.id!)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
