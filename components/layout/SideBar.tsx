/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { HomePageTab } from '@/utils/enum';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '@/service/recoil';
import { useEffect } from 'react';

export default function SideBar({
  currentTab,
  handlePageRouting,
  isMobile = false
}: {
  currentTab: HomePageTab;
  handlePageRouting: (tab: HomePageTab) => void;
  isMobile?: boolean;
}) {
  const authStore = useRecoilValue(AuthAtom);

  const handleTranslate = () => {
    switch (currentTab) {
      case HomePageTab.HOME:
        return 'translate-y-0';
      case HomePageTab.SAVED:
        return 'translate-y-12';
      case HomePageTab.REQUEST_STATUS:
        return 'translate-y-24';
      case HomePageTab.PROFILE:
        return 'translate-y-[9rem]';
    }
  };

  return (
    <div
      className={`
        w-[250px] h-full px-[16px] 
        ${isMobile ? 'flex bg-primary py-10 z-50' : 'hidden md:flex'}
         flex-col
      `}
    >
      {/* logo */}
      {isMobile && (
        <div className='flex justify-center items-center mb-10'>
          <img src='/bootcamp-logo.png' alt='logo' className='w-full h-fit' />
        </div>
      )}

      <div className='relative'>
        <div className='z-10 px-2'>
          <NavbarBtn
            title='Home'
            iconPath='/icon/sidenav/home.svg'
            activeIconPath='/icon/sidenav/home-active.svg'
            isCurrentTab={currentTab === HomePageTab.HOME}
            onClick={() => handlePageRouting(HomePageTab.HOME)}
          />
          <NavbarBtn
            title='Saved'
            iconPath='/icon/sidenav/saved.svg'
            activeIconPath='/icon/sidenav/saved-active.svg'
            isCurrentTab={currentTab === HomePageTab.SAVED}
            onClick={() => handlePageRouting(HomePageTab.SAVED)}
          />
          <NavbarBtn
            title='Request'
            iconPath='/icon/sidenav/request status.svg'
            activeIconPath='/icon/sidenav/request status-active.svg'
            isCurrentTab={currentTab === HomePageTab.REQUEST_STATUS}
            onClick={() => handlePageRouting(HomePageTab.REQUEST_STATUS)}
          />
          <NavbarBtn
            title='Profile'
            iconPath='/icon/sidenav/profile.svg'
            activeIconPath='/icon/sidenav/profile-active.svg'
            isCurrentTab={currentTab === HomePageTab.PROFILE}
            onClick={() => handlePageRouting(HomePageTab.PROFILE)}
          />
        </div>

        {/* slide active button */}
        <div
          className={`
            z-0 w-full h-12 rounded-full bg-white
            absolute top-0 right-0
            transition-all duration-300
            transform ${handleTranslate()}
          `}
        ></div>
      </div>

      {/* admin */}
      <div className='flex-1'></div>
      {!authStore.isLoggedIn && (
        <Link
          href='/auth'
          className='
              px-4 py-2 rounded-xl
              bg-alt-secondary text-primary font-medium
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
              whitespace-nowrap md:hidden
            '
        >
          Log In
        </Link>
      )}
      {authStore.isAdmin && (
        <Link
          href='/admin'
          className='
            w-full bg-action text-primary font-bold
            rounded-xl p-2 px-4
            flex items-center justify-center cursor-pointer 
            hover:shadow-xl
          '
        >
          Admin
        </Link>
      )}
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
      ${isCurrentTab ? ' text-primary' : 'text-[#D0B49F]'}
      p-2 px-4
      transition-all 
      h-12 z-10
      `}
      onClick={onClick}
    >
      <img
        src={isCurrentTab ? activeIconPath : iconPath}
        alt={title}
        className='h-6 z-10'
      />
      <div className='ml-[12px] font-bold z-10'>{title}</div>
    </div>
  );
}
