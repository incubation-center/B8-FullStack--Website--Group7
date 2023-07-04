import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Book, User } from '@/types';

import useModal from '@/components/Modals/useModal';
import BorrowBook from '@/components/Modals/BorrowBook';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { useEffect, useState } from 'react';
import { HomePageTab } from '@/utils/enum';
import { getBookById } from '@/service/api/book';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AuthAtom,
  getBookByIdAtom,
  isBookAlreadySaved
} from '@/service/recoil';
import NotLoggedInLayout from '@/components/layout/NotLoggedInLayout';
import { getCookie } from 'cookies-next';
import { processUserToken } from '@/service/token';
import {
  removeBookFromFavorites,
  saveBookToFavorites
} from '@/service/api/user';
import { AxiosError } from 'axios';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import SaveToFavSvg from '@/components/icon/SaveToFavSvg';
import { AuthStore } from '@/types/auth';

export default function BookDetail({ bookId }: { bookId: string }) {
  const router = useRouter();
  const [authStore, setAuthStore] = useRecoilState(AuthAtom);
  const book = useRecoilValue(getBookByIdAtom(bookId as string)) as Book;
  const isSaved = useRecoilValue(isBookAlreadySaved(bookId as string));

  const [isSaving, setIsSaving] = useState(false);

  const { open, close, ModalWrapper } = useModal();

  const { showAlert, AlertModal } = useAlertModal();

  const getAuthObj = async () => {
    const token = getCookie('accessToken');
    const authObj = await processUserToken(token);

    setAuthStore(authObj);
  };

  useEffect(() => {
    router.prefetch(`/?tab=${HomePageTab.HOME}`);

    if (authStore.isFetched === false) getAuthObj();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveToFav = async () => {
    if (!authStore.isLoggedIn) {
      open();
      return;
    }

    setIsSaving(true);
    try {
      if (!authStore.user || !book.id) return;

      const res = await saveBookToFavorites(
        authStore.user.userId as string,
        book.id
      );
      if (res.status !== 200) throw new Error('Save failed');

      await getAuthObj(); // update user's fav list

      showAlert({
        title: 'Save success',
        subtitle: res.data,
        type: AlertType.SUCCESS
      });
    } catch (err) {
      let message = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        message = err.response?.data.error;
      }

      close();
      showAlert({
        title: 'Save failed',
        subtitle: message,
        type: AlertType.ERROR
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveFromFav = async () => {
    setIsSaving(true);
    try {
      if (!authStore.user || !book.id) return;

      const res = await removeBookFromFavorites(
        authStore.user.userId as string,
        book.id
      );
      if (res.status !== 200) throw new Error('Remove failed');

      await getAuthObj(); // update user's fav list

      showAlert({
        title: 'Remove success',
        subtitle: res.data,
        type: AlertType.SUCCESS
      });
    } catch (err) {
      let message = 'An unknown error occurred';
      if (err instanceof AxiosError) {
        message = err.response?.data.error;
      }

      close();
      showAlert({
        title: 'Remove failed',
        subtitle: message,
        type: AlertType.ERROR
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* modals  */}
      <AlertModal />

      <ModalWrapper>
        <BorrowBook
          close={close}
          book={book}
          user={authStore.user as User}
          showAlert={showAlert}
        />
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
            <div className='w-full flex justify-between items-start gap-2'>
              <div className='space-y-[10px] text-alt-secondary font-light'>
                <h1 className='font-bold text-2xl'>{book.title}</h1>

                <h2>Author: {book.author}</h2>
                <h2>Genre: {book.category}</h2>

                <h2 className='font-bold'>Book Description</h2>
              </div>

              {authStore.isFetched && (
                <div className='w-20'>
                  <button
                    className={`
                     bg-white w-12 h-12 
                      flex justify-center items-center
                      rounded-full mx-auto
                      overflow-hidden
                      ${
                        isSaving
                          ? 'cursor-not-allowed shadow-inner shadow-primary'
                          : 'cursor-pointer hover:shadow-inner hover:shadow-primary'
                      }
                      transition-all duration-300
                    `}
                    disabled={isSaving}
                    onClick={isSaved ? handleRemoveFromFav : handleSaveToFav}
                  >
                    {isSaving ? (
                      <SpinningLoadingSvg className='w-6 h-6 text-primary' />
                    ) : (
                      <SaveToFavSvg
                        className='w-6 h-6 fill-primary'
                        saved={isSaved}
                      />
                    )}
                  </button>
                  {!isSaving && (
                    <div className='w-full text-center text-alt-secondary text-sm mt-1'>
                      {isSaved ? 'Remove' : 'Save'}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className='mt-[10px] text-alt-secondary font-light'>
              {book.description}
            </p>

            {authStore.isFetched && (
              <button
                onClick={() => open()}
                className='bg-secondary text-white font-bold py-4 md:py-2 px-4 w-full md:w-40 rounded-lg my-10'
              >
                Borrow
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  return {
    props: {
      bookId: id
    }
  };
}
