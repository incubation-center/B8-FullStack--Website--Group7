import Image from 'next/image';
import { useRouter } from 'next/router';

import { homePageTabAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';

import { HomePageTab } from '@/utils/enum';
import Link from 'next/link';

export default function SideBar({
  currentTab,
  handlePageRouting
}: {
  currentTab: HomePageTab;
  handlePageRouting: (tab: HomePageTab) => void;
}) {
  return (
    <div className='w-[200px] h-full px-[16px] space-y-4 hidden md:flex flex-col pb-10'>
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

      {/* admin */}
      <div className='flex-1'></div>
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
      ${isCurrentTab ? 'bg-action text-primary' : 'text-[#D0B49F]'}
      p-2 px-4
      transition-all
      
      `}
      onClick={onClick}
    >
      <Image
        src={isCurrentTab ? activeIconPath : iconPath}
        alt={title}
        width={20}
        height={20}
      />
      <div className='ml-[12px] font-medium'>{title}</div>
    </div>
  );
}
