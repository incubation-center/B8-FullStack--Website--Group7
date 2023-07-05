import { useRouter } from 'next/router';
import Image from 'next/image';

import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import { useRecoilValue } from 'recoil';
import { AuthAtom, filteredSavedBooksAtom } from '@/service/recoil';
import { useState } from 'react';
import { Book } from '@/types';

export default function SavedTab({
  onClickExplore
}: {
  onClickExplore: () => void;
}) {
  const authStore = useRecoilValue(AuthAtom);
  const favBooks = useRecoilValue(filteredSavedBooksAtom);

  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <NotLoggedInLayout>
      {authStore.user && (
        <div className='p-4 w-full h-full  flex flex-col justify-center px-4 space-y-4 md:px-8 md:space-y-8'>
          <h1
            className='
              font-bold text-primary text-center
              text-2xl md:text-4xl
              w-full border-b-2 border-primary
              pb-4 md:pb-8
              pt-2 md:pt-4
            '
          >
            Saved
          </h1>
          <div className='w-full h-full flex flex-wrap gap-8 justify-center'>
            {favBooks.length === 0 && (
              <div className='h-full w-full flex flex-col justify-center items-center'>
                <h1 className='text-center text-primary font-medium'>
                  You have no saved books
                </h1>
                <button
                  className='
                    bg-primary text-white px-4 py-2 rounded-full w-40
                    text-lg font-medium mt-4
                  '
                  onClick={onClickExplore}
                >
                  explore books
                </button>
              </div>
            )}
            {favBooks.map((book, index) => (
              <div key={book.id!} className='flex flex-col space-y-4'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <img
                  className='w-fit h-[200px] object-cover cursor-pointer'
                  src={book.bookImg}
                  alt={book.title}
                  draggable={false}
                  onClick={() => handleBookClick(book.id!)}
                /> */}
                <div className='relative h-[250px] w-[200px] '>
                  <Image
                    className='w-full h-full object-bottom object-contain'
                    src={book.bookImg}
                    alt={book.title}
                    draggable={false}
                    fill
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    onClick={() => handleBookClick(book.id!)}
                  />
                </div>

                <button
                  className='
                          bg-secondary text-white font-light
                          rounded-lg py-1 px-2 w-40 mx-auto 
                        '
                  onClick={() => handleBookClick(book.id!)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </NotLoggedInLayout>
  );
}
