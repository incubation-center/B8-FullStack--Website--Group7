import Image from 'next/image';

import { AdminTab } from '@/utils/enum';
import { formatEnumValue } from '@/utils/function';
import Link from 'next/link';

export default function Navbar({
  currentTab,
  handlePageRouting
}: {
  currentTab: AdminTab;
  handlePageRouting: (tab: AdminTab) => void;
}) {
  return (
    <div
      className='
        h-full w-[250px] flex flex-col
        bg-primary
        p-4 z-10
      '
    >
      {/* Logo */}
      <div className='w-full mb-8 mt-4'>
        <div className='bg-white rounded-full p-4 h-20 w-20 flex items-center justify-center'>
          Logo
        </div>
      </div>

      {/* nav button */}
      <div className='space-y-4'>
        <NavbarBtn
          title={formatEnumValue(AdminTab.DASHBOARD)}
          iconPath='/icon/admin-sidebar/dashboard.svg'
          activeIconPath='/icon/admin-sidebar/dashboard-active.svg'
          isCurrentTab={currentTab === AdminTab.DASHBOARD}
          onClick={() => handlePageRouting(AdminTab.DASHBOARD)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.UPLOAD)}
          iconPath='/icon/admin-sidebar/upload.svg'
          activeIconPath='/icon/admin-sidebar/upload-active.svg'
          isCurrentTab={currentTab === AdminTab.UPLOAD}
          onClick={() => handlePageRouting(AdminTab.UPLOAD)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.INCOMING_REQUEST)}
          iconPath='/icon/admin-sidebar/incoming.svg'
          activeIconPath='/icon/admin-sidebar/incoming-active.svg'
          isCurrentTab={currentTab === AdminTab.INCOMING_REQUEST}
          onClick={() => handlePageRouting(AdminTab.INCOMING_REQUEST)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.ACTIVE_REQUEST)}
          iconPath='/icon/admin-sidebar/active.svg'
          activeIconPath='/icon/admin-sidebar/active-active.svg'
          isCurrentTab={currentTab === AdminTab.ACTIVE_REQUEST}
          onClick={() => handlePageRouting(AdminTab.ACTIVE_REQUEST)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.ARCHIVED_REQUEST)}
          iconPath='/icon/admin-sidebar/archived.svg'
          activeIconPath='/icon/admin-sidebar/archived-active.svg'
          isCurrentTab={currentTab === AdminTab.ARCHIVED_REQUEST}
          onClick={() => handlePageRouting(AdminTab.ARCHIVED_REQUEST)}
        />
      </div>

      {/* admin */}
      <div className='flex-1'></div>
      <Link
        href='/'
        className='
          w-full bg-action text-primary font-bold
          rounded-xl p-2 px-4
          flex items-center justify-center cursor-pointer 
          hover:shadow-xl
        '
      >
        Back to Home
      </Link>
    </div>
  );
}

function NavbarBtn({
  title,
  iconPath,
  activeIconPath,
  isCurrentTab,
  onClick
}: {
  title: string;
  iconPath: string;
  activeIconPath: string;
  isCurrentTab?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-start cursor-pointer rounded-xl 
      ${
        isCurrentTab
          ? 'text-white hover:bg-secondary'
          : 'text-secondary hover:bg-alt-secondary'
      }
      transition-all duration-300
      whitespace-nowrap 
      
      p-1 px-2
      `}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isCurrentTab ? activeIconPath : iconPath}
        alt={title}
        className='transition-all duration-300 w-6'
      />
      <div className='ml-[12px] font-bold'>{title}</div>
    </div>
  );
}
