import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Book, User } from '@/types';

import useModal from '@/components/Modals/useModal';
import BorrowBook from '@/components/Modals/BorrowBook';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { useEffect, useState } from 'react';
import { HomePageTab } from '@/utils/enum';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AllBooksAtom, AuthAtom, isBookAlreadySaved } from '@/service/recoil';
import { getCookie } from 'cookies-next';
import { processUserToken } from '@/service/token';
import {
  removeBookFromFavorites,
  saveBookToFavorites
} from '@/service/api/user';
import { AxiosError } from 'axios';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import SaveToFavSvg from '@/components/icon/SaveToFavSvg';

import { getBookById } from '@/service/api/book';
import Link from 'next/link';
import BackArrowSvg from '@/components/icon/BackArrow';

import { useTranslation } from 'next-i18next';
import { useLocale } from '@/utils/function';

export default function BookDetail({ bookId }: { bookId: string }) {
  const router = useRouter();
  const { t } = useTranslation('book-detail');
  const { isKhmer } = useLocale();
  const [authStore, setAuthStore] = useRecoilState(AuthAtom);
  const allBooks = useRecoilValue(AllBooksAtom);
  const [book, setBook] = useState<Book | undefined | null>();

  const isSaved = useRecoilValue(isBookAlreadySaved(bookId as string));

  const [isSaving, setIsSaving] = useState(false);

  const { open, close, ModalWrapper } = useModal();

  const { showAlert, AlertModal } = useAlertModal();

  const getAuthObj = async () => {
    const token = getCookie('accessToken');
    const authObj = await processUserToken(token);

    setAuthStore(authObj);
  };

  const getBook = async () => {
    let book;

    // all books data is not fetched yet
    allBooks.forEach((b) => {
      if (b.id == bookId) {
        book = b;
        return;
      }
    });

    if (!book) {
      try {
        book = (await getBookById(bookId)) || null;
      } catch (err) {
        console.error(err);
        book = null;
      }
    }

    setBook(book);
  };

  useEffect(() => {
    getBook();

    router.prefetch(`/?tab=${HomePageTab.HOME}`);

    if (authStore.isFetched === false) getAuthObj();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveToFav = async () => {
    if (!book) return;

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
        title: t('modal.save.title'),
        subtitle: t('modal.save.subtitle'),
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
    if (!book) return;
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
        title: t('modal.remove.title'),
        subtitle: t('modal.remove.subtitle'),
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

  // book is fetched
  return (
    <>
      {/* book not found */}
      {book === null && <BookNotFound />}

      {/* fetching */}
      {book === undefined && <FetchingBook />}

      {/* book initialized */}
      {book && (
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
            <div className='p-6 flex justify-start '>
              <div
                className='
                  flex items-center cursor-pointer select-none 
                  hover:bg-alt-secondary hover:bg-opacity-20
                  transition duration-300 ease-in-out
                  p-2 px-4 rounded-full
                '
                onClick={() => router.back()}
              >
                <BackArrowSvg className='w-4 h-4 fill-alt-secondary' />
                <h1 className='ml-4 text-alt-secondary'>
                  {t('btns.go-back-btn')}
                </h1>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 px-8 gap-4'>
              {/* book cover */}
              <div className='flex justify-center items-start mb-10 md:mb-0'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.bookImg}
                  alt={book.title}
                  className='aspect-auto max-h-[400px] w-full object-contain'
                />
              </div>

              {/* description */}
              <div className='md:col-span-2 relative'>
                <div className='w-full flex justify-between items-start gap-2'>
                  <div className='space-y-[10px] text-alt-secondary font-light'>
                    <h1 className='font-bold text-2xl'>{book.title}</h1>

                    <h2>
                      {t('book.author')}: {book.author}
                    </h2>
                    <h2>
                      {t('book.genre')}: {book.category}
                    </h2>

                    <h2 className={`${isKhmer ? 'font-medium' : 'font-bold'}`}>
                      {t('book.book-description')}
                    </h2>
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
                        onClick={
                          isSaved ? handleRemoveFromFav : handleSaveToFav
                        }
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
                          {isSaved ? t('btns.remove-btn') : t('btns.save-btn')}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className='mt-[10px] text-alt-secondary font-light'>
                  {book.description}
                </p>

                {book.description.length <= 0 && (
                  <div className='text-alt-secondary text-opacity-70'>
                    No description provided
                  </div>
                )}

                {authStore.isFetched && (
                  <button
                    onClick={() => open()}
                    className={`
                      bg-secondary text-white 
                      ${isKhmer ? 'font-medium' : 'font-bold'} 
                      py-4 md:py-2 px-4 w-full md:w-40 rounded-full my-10`}
                  >
                    {t('btns.borrow-btn')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string };

  const locale = context.locale as string;

  return {
    props: {
      bookId: id,
      ...(await serverSideTranslations(locale, ['common', 'book-detail']))
    }
  };
}

const BookNotFound = () => {
  const { t } = useTranslation('book-detail');

  const router = useRouter();

  return (
    <div className='min-h-screen w-full flex flex-col space-y-6 justify-center items-center bg-primary text-center'>
      <div>
        <h1
          className='
                text-4xl text-alt-secondary font-bold
            '
        >
          401
        </h1>
        <h1 className='text-lg text-alt-secondary'>
          {t('book-not-found.label')}
        </h1>
      </div>

      <Link href={`/?tab=${HomePageTab.HOME}`} locale={router.locale}>
        <span className='bg-alt-secondary px-4 py-2 rounded-full text-primary font-medium'>
          {t('book-not-found.back-to-homepage')}
        </span>
      </Link>
    </div>
  );
};

const FetchingBook = () => {
  const { t } = useTranslation('book-detail');

  return (
    <div className='w-full flex-1 flex gap-4 justify-center items-center bg-primary'>
      <div className='text-center text-alt-secondary font-medium'>
        {t('fetching-book')}
      </div>
      <SpinningLoadingSvg className='w-8 h-8 text-alt-secondary' />
    </div>
  );
};
