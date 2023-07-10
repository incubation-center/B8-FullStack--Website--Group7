import HomeTab from '@/components/Tabs/Home.tab';
import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { getAllBooks } from '@/service/api/book';
import { AllBooksAtom } from '@/service/recoil';
import { isRefreshingRequestAtom } from '@/service/recoil/admin';
import { Book } from '@/types';
import { useDebounce } from '@/utils/function';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import ViewEditBook from '../ViewEditBook';
import { AnimatePresence } from 'framer-motion';
import UserSearchBar from '@/components/UserSearchBar';
import { HomePageTab } from '@/utils/enum';

export default function BookTab() {
  const [_, setAllBooks] = useRecoilState(AllBooksAtom);
  const [__, setIsRefreshing] = useRecoilState(isRefreshingRequestAtom);

  const [viewBook, setViewBook] = useState<Book>();
  const [isShowViewBook, setIsShowViewBook] = useState(false);

  const handleRefreshBook = useDebounce(async () => {
    setIsRefreshing(true);
    try {
      const res = await getAllBooks();

      if (res) {
        setAllBooks(res);
      }
    } catch (err) {
      console.error('error', err);
    } finally {
      setIsRefreshing(false);
    }
  }, 100);

  return (
    <AdminTabLayout title='Books Lists' handleRefresh={handleRefreshBook}>
      <div className='w-full flex justify-start mb-4 '>
        <UserSearchBar currentTab={HomePageTab.HOME} />
      </div>
      {/* tab element */}
      <HomeTab
        isUseInAdminPage
        onClickViewInAdminPage={(book) => {
          setViewBook(book);
          setIsShowViewBook(true);
        }}
      />
      {/* view/edit book */}
      <AnimatePresence>
        {isShowViewBook && viewBook && (
          <ViewEditBook
            book={viewBook}
            close={() => {
              setIsShowViewBook(false);
              setViewBook(undefined);
            }}
          />
        )}
      </AnimatePresence>
    </AdminTabLayout>
  );
}
