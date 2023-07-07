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
    <div className='w-screen max-h-screen flex flex-grow overflow-clip'>
      <Navbar currentTab={currentTab} handlePageRouting={handlePageRouting} />

      <div className='w-full h-full overflow-clip flex flex-grow'>
        {children}
      </div>
    </div>
  );
}
