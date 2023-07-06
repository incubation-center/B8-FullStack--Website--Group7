/* eslint-disable @next/next/no-img-element */
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
      case AdminTab.BOOKS:
        return 'translate-y-24';
      case AdminTab.INCOMING_REQUEST:
        return 'translate-y-[9rem]';
      case AdminTab.ACTIVE_REQUEST:
        return 'translate-y-[12rem]';
      case AdminTab.ARCHIVED_REQUEST:
        return 'translate-y-[15rem]';
      case AdminTab.RENTER:
        return 'translate-y-[18rem]';
      case AdminTab.SETTING:
        return 'translate-y-[21rem]';
    }
  };

  return (
    <div
      className='
        w-[300px]
        h-full flex flex-col
        bg-primary
        p-2 z-10
      '
    >
      {/* Logo */}
      <div className='w-full md:w-2/3  mb-8 mt-4 mx-auto'>
        <img
          src='/bootcamp-logo.png'
          alt=''
          className='
            h-fit w-full
          '
        />
      </div>

      {/* nav button */}
      <div className='relative px-2'>
        <NavbarBtn
          title={formatEnumValue(AdminTab.DASHBOARD)}
          iconPath='/icon/admin-sidebar/dashboard.svg'
          isCurrentTab={currentTab === AdminTab.DASHBOARD}
          onClick={() => handlePageRouting(AdminTab.DASHBOARD)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.UPLOAD)}
          iconPath='/icon/admin-sidebar/upload.svg'
          isCurrentTab={currentTab === AdminTab.UPLOAD}
          onClick={() => handlePageRouting(AdminTab.UPLOAD)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.BOOKS)}
          iconPath='/icon/admin-sidebar/book_admin.svg'
          isCurrentTab={currentTab === AdminTab.BOOKS}
          onClick={() => handlePageRouting(AdminTab.BOOKS)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.INCOMING_REQUEST)}
          iconPath='/icon/admin-sidebar/incoming.svg'
          isCurrentTab={currentTab === AdminTab.INCOMING_REQUEST}
          onClick={() => handlePageRouting(AdminTab.INCOMING_REQUEST)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.ACTIVE_REQUEST)}
          iconPath='/icon/admin-sidebar/active.svg'
          isCurrentTab={currentTab === AdminTab.ACTIVE_REQUEST}
          onClick={() => handlePageRouting(AdminTab.ACTIVE_REQUEST)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.ARCHIVED_REQUEST)}
          iconPath='/icon/admin-sidebar/archived.svg'
          isCurrentTab={currentTab === AdminTab.ARCHIVED_REQUEST}
          onClick={() => handlePageRouting(AdminTab.ARCHIVED_REQUEST)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.RENTER)}
          iconPath='/icon/admin-sidebar/renter.svg'
          isCurrentTab={currentTab === AdminTab.RENTER}
          onClick={() => handlePageRouting(AdminTab.RENTER)}
        />

        <NavbarBtn
          title={formatEnumValue(AdminTab.SETTING)}
          iconPath='/icon/admin-sidebar/setting.svg'
          isCurrentTab={currentTab === AdminTab.SETTING}
          onClick={() => handlePageRouting(AdminTab.SETTING)}
        />

        {/* slide */}
        <div
          className={`
          ${handleTranslate()} transition-all duration-300
          absolute top-0 left-0 w-full h-12 bg-alt-secondary rounded-full
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

  isCurrentTab,
  onClick
}: {
  title: string;
  iconPath: string;
  isCurrentTab?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-start cursor-pointer rounded-full 
      ${isCurrentTab ? 'text-primary ' : 'text-secondary'}
      transition-all duration-300
      whitespace-nowrap 
      p-1 px-2
      h-12 z-10
      w-full
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
