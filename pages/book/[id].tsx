import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { BookData } from '@/dummydata';
import { Book } from '@/types';

import useModal from '@/components/Modals/useModal';
import BorrowBook from '@/components/Modals/BorrowBook';
import useAlertModal from '@/components/Modals/Alert';
import { useEffect } from 'react';
import { HomePageTab } from '@/utils/enum';
import { getBookById } from '@/service/api/book';

export default function BookDetail({ book }: { book: Book }) {
  const router = useRouter();

  const { open, close, ModalWrapper } = useModal();

  const { showAlert, AlertModal } = useAlertModal();

  useEffect(() => {
    router.prefetch(`/?tab=${HomePageTab.HOME}`);
  }, []);

  return (
    <>
      {/* modals  */}
      <AlertModal />

      <ModalWrapper>
        <BorrowBook close={close} book={book} showAlert={showAlert} />
      </ModalWrapper>

      <div className='min-h-full w-full bg-primary overflow-y-scroll pb-10 md:pb-0'>
        {/* back home */}
        <div className='p-8 flex justify-start'>
          <div
            className='flex cursor-pointer select-none'
            onClick={() => router.back()}
          >
            <Image
              src='/icon/back-arrow.svg'
              alt='back'
              width={14}
              height={14}
            />
            <h1 className='ml-8 text-alt-secondary'>Go Back</h1>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 px-8 gap-4'>
          {/* book cover */}
          <div className='flex justify-center items-start mb-10 md:mb-0'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.bookImg}
              alt={book.title}
              className='aspect-auto max-h-[400px] object-scale-down'
            />
          </div>

          {/* description */}
          <div className='md:col-span-2 relative'>
            <div className='space-y-[10px] text-alt-secondary font-light'>
              <h1 className='font-bold text-2xl'>{book.title}</h1>

              <h2>Author: {book.author}</h2>
              <h2>Genre: {book.category}</h2>

              <h2 className='font-bold'>Book Description</h2>
              <p>{book.description}</p>
            </div>

            <button
              className='
              bg-white p-4 w-12 h-12
              flex justify-center items-center 
              absolute right-0 top-0 
              rounded-full
              hover:shadow-inner hover:shadow-primary
            '
            >
              <Image
                src='/icon/add-to-save.svg'
                alt='save to fav'
                width={18}
                height={18}
              />
            </button>

            <button
              onClick={() => open()}
              className='bg-secondary text-white font-bold py-4 md:py-2 px-4 w-full md:w-40 rounded-lg mt-10'
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  const book = await getBookById(id);

  return {
    props: {
      book
    }
  };
}
