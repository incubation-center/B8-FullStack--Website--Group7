import { AdminTab } from '@/utils/enum';
import Navbar from '../admin/Navbar';

export default function AdminLayout({
  currentTab,
  handlePageRouting,
  children
}: {
  currentTab: AdminTab;
  handlePageRouting: (tab: AdminTab) => void;
  children: React.ReactNode;
}) {
  return (
    <div className='w-full flex flex-grow'>
      <Navbar currentTab={currentTab} handlePageRouting={handlePageRouting} />

      <div className='h-full flex flex-grow'>{children}</div>
    </div>
  );
}
