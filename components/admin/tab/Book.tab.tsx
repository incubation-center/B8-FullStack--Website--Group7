import HomeTab from '@/components/Tabs/Home.tab';
import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { getAllBooks } from '@/service/api/book';
import { AllBooksAtom } from '@/service/recoil';
import { isRefreshingRequestAtom } from '@/service/recoil/admin';
import { useDebounce } from '@/utils/function';
import { useRecoilState } from 'recoil';

export default function BookTab() {
  const [_, setAllBooks] = useRecoilState(AllBooksAtom);
  const [__, setIsRefreshing] = useRecoilState(isRefreshingRequestAtom);

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
    <AdminTabLayout title='Books' handleRefresh={handleRefreshBook}>
      <HomeTab isUseInAdminPage />
    </AdminTabLayout>
  );
}
