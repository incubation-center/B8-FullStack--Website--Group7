/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import {
  AuthAtom,
  homePageCategoryAtom,
  homePageSearchAtom
} from '@/service/recoil';
import { useRecoilState } from 'recoil';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { useState } from 'react';
import SideBar from './SideBar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { handleFallBackProfileImage } from '@/utils/function';

export default function HomeLayout({
  currentTab,
  handlePageRouting,
  children
}: {
  currentTab: HomePageTab;
  handlePageRouting: (tab: HomePageTab) => void;
  children: React.ReactNode;
}) {
  const [authStore, setAuthStore] = useRecoilState(AuthAtom);
  const [searchText, setSearchText] = useRecoilState(homePageSearchAtom);

  const [isShowSideBar, setIsShowSideBar] = useState(false);

  return (
    <div className='w-full h-full overflow-clip flex flex-col relative'>
      {/* search bar row */}
      <div className=' w-full h-[100px] gap-2 flex justify-between items-center py-4 px-4 '>
        <div className='h-full flex justify-center items-center mx-4'>
          <img
            src='/bootcamp-logo.png'
            alt='logo'
            className='w-full  h-full object-scale-down  hidden md:block'
          />

          <button onClick={() => setIsShowSideBar(!isShowSideBar)}>
            <img
              src='/icon/hamburger.png'
              alt='hamburger'
              className='w-8 h-8 md:hidden'
            />
          </button>
        </div>

        <div
          className='
            w-full max-w-[500px]  mx-auto
            flex justify-center items-center
           bg-action 
            p-2 px-4 rounded-xl space-x-6
            box-border border-2 focus-within:border-primary
            transition-colors
         '
        >
          <Image src='/icon/search.svg' alt='search' width={20} height={20} />

          <input
            type='text'
            className='
              w-full bg-transparent ml-2 pt-[1px]
              focus:outline-none
              placeholder-gray-400
            '
            placeholder='Search name of the book'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div>
          {!authStore.isLoggedIn && (
            <Link
              href='/auth'
              className='
              px-4 py-2 rounded-xl
              bg-alt-secondary text-primary
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
              whitespace-nowrap hidden md:block
            '
            >
              Log In
            </Link>
          )}

          {authStore.isLoggedIn &&
            authStore.user &&
            currentTab !== HomePageTab.PROFILE && (
              <img
                src={handleFallBackProfileImage(authStore.user)}
                alt='profile'
                className='w-12 h-12 rounded-full object-cover hidden md:block'
              />
            )}
        </div>
      </div>

      {/* main row */}
      <div className='w-screen home-layout-children-height relative flex flex-1 pb-4'>
        {/* side bar big screen */}
        <SideBar
          currentTab={currentTab}
          handlePageRouting={handlePageRouting}
        />

        {/* sidebar mobile */}
        <div
          className={`
            md:hidden 
            h-full fixed top-0 left-0 z-[999]
            transform transition-transform duration-300
            ${isShowSideBar ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <SideBar
            currentTab={currentTab}
            handlePageRouting={(tab) => {
              setIsShowSideBar(false);
              handlePageRouting(tab);
            }}
            isMobile
          />
        </div>

        {isShowSideBar && (
          <div
            onClick={() => {
              setIsShowSideBar(false);
            }}
            className={` 
              cursor-pointer
              fixed top-0 left-0 w-screen h-screen
              z-50 bg-black bg-opacity-30
              ${isShowSideBar ? 'block delay-300' : 'hidden'}
            `}
          ></div>
        )}

        {/* tab component */}
        <div
          className='
            w-full  bg-alt-secondary 
            rounded-2xl mr-4 ml-4 md:ml-0 
            overflow-scroll scroll-smooth
            relative
          '
        >
          {children}
        </div>
      </div>
    </div>
  );
}
