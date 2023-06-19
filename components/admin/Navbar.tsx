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
  const handleTranslate = () => {
    switch (currentTab) {
      case AdminTab.DASHBOARD:
        return 'translate-y-0';
      case AdminTab.UPLOAD:
        return 'translate-y-12';
      case AdminTab.INCOMING_REQUEST:
        return 'translate-y-24';
      case AdminTab.ACTIVE_REQUEST:
        return 'translate-y-[9rem]';
      case AdminTab.ARCHIVED_REQUEST:
        return 'translate-y-[12rem]';
      case AdminTab.RENTER:
        return 'translate-y-[15rem]';
    }
  };

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
      <div className='relative'>
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

        <NavbarBtn
          title={formatEnumValue(AdminTab.RENTER)}
          iconPath='/icon/admin-sidebar/renter.svg'
          activeIconPath='/icon/admin-sidebar/renter-active.svg'
          isCurrentTab={currentTab === AdminTab.RENTER}
          onClick={() => handlePageRouting(AdminTab.RENTER)}
        />

        {/* slide */}
        <div
          className={`
          ${handleTranslate()} transition-all duration-300
          absolute top-0 left-0 w-full h-12 bg-alt-secondary rounded-xl
          `}
          style={{ zIndex: -1 }}
        ></div>
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
      ${isCurrentTab ? 'text-secondary ' : 'text-secondary'}
      transition-all duration-300
      whitespace-nowrap 
      p-1 px-2
      h-12 z-10
      `}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconPath}
        alt={title}
        className='transition-all duration-300 w-6'
      />
      <div className='ml-[12px] font-bold'>{title}</div>
    </div>
  );
}
