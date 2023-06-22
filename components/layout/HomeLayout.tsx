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
    <div className='w-full h-full flex flex-col'>
      {/* search bar row */}
      <div className='w-full h-24 flex justify-center items-center py-4 relative'>
        {/* search bar */}
        <div className='absolute left-8 my-8'>
          <img
            src='/bootcamp-logo.png'
            alt='logo'
            className='w-32 h-fit object-scale-down backdrop-filter'
          />
        </div>

        <div
          className='
            w-1/4
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

        {/* login button */}
        <div className='absolute right-8'>
          <Link
            href='/auth'
            className='
              px-4 py-2 rounded-xl
              bg-alt-secondary text-primary
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
            '
          >
            Log In
          </Link>
        </div>
      </div>

      {/* category row  */}

      {/* main row */}
      <div className='w-screen h-1/2 flex flex-1 pb-4'>
        {/* side bar */}
        <SideBar
          currentTab={currentTab}
          handlePageRouting={handlePageRouting}
        />

        {/* tab component */}
        <div className='w-full max-h-full p-4 bg-alt-secondary rounded-2xl mr-4 mb-4 ml-4 md:ml-0 overflow-scroll relative'>
          {children}
        </div>
      </div>
    </div>
  );
}
