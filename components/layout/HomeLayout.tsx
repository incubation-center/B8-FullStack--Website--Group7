/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { homePageCategoryAtom, homePageSearchAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { useState } from 'react';
import SideBar from './SideBar';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function HomeLayout({
  currentTab,
  handlePageRouting,
  children
}: {
  currentTab: HomePageTab;
  handlePageRouting: (tab: HomePageTab) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useRecoilState(homePageSearchAtom);

  return (
    <div className='w-full h-full overflow-hidden flex flex-col relative'>
      {/* search bar row */}
      <div className=' w-full h-[100px] gap-2 flex justify-between items-center py-4 px-4'>
        <div className='h-full hidden md:block'>
          <img
            src='/bootcamp-logo.png'
            alt='logo'
            className='w-full h-full object-scale-down'
          />
        </div>

        <div
          className='
            w-full max-w-[500px] 
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

        <div className=' hidden md:block'>
          <Link
            href='/auth'
            className='
              px-4 py-2 rounded-xl
              bg-alt-secondary text-primary
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
              whitespace-nowrap
            '
          >
            Log In
          </Link>
        </div>
      </div>

      {/* main row */}
      <div className='w-screen home-layout-children-height  flex flex-1 pb-4'>
        {/* side bar */}
        <SideBar
          currentTab={currentTab}
          handlePageRouting={handlePageRouting}
        />

        {/* tab component */}
        <div
          className='
            w-full p-4 bg-alt-secondary 
            rounded-2xl mr-4 ml-4 md:ml-0 
            overflow-scroll scroll
            relative
          '
        >
          {children}
        </div>
      </div>
    </div>
  );
}
