import Image from 'next/image';

import { homePageCategoryAtom, homePageSearchAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { useState } from 'react';
import SideBar from './SideBar';
import { useRouter } from 'next/router';

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

  // handle category
  const [currentCategory, setCurrentCategory] =
    useRecoilState(homePageCategoryAtom);

  const handleCategory = (categoryKey: string, category: string) => {
    setCurrentCategory(category);

    router.push(`/?tab=${currentTab}#${categoryKey.toLowerCase()}`, undefined, {
      shallow: true
    });
  };

  return (
    <div className='w-full h-full flex flex-col'>
      {/* search bar row */}
      <div className='w-full h-auto flex justify-center items-center py-4 relative'>
        {/* search bar */}
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
          <button
            className='
              px-4 py-2 rounded-xl
              bg-alt-secondary text-primary
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
            '
          >
            Log In
          </button>
        </div>
      </div>

      {/* category row  */}

      {currentTab !== HomePageTab.HOME ? (
        <div className='h-9 mb-4'></div>
      ) : (
        <div
          className='
          w-screen flex flex-row h-9 mb-4'
        >
          {/* offset navigation sidebar */}
          <div className='w-[200px] hidden lg:block'></div>

          <div className='w-full flex px-8'>
            {Object.keys(BookCategory).map((category: any) => {
              const key = category as keyof typeof BookCategory;
              const value = BookCategory[key];

              const isCurrentCategory = currentCategory === value;

              const iconPath = `/icon/book-category/${BookCategory[
                category as keyof typeof BookCategory
              ].toLowerCase()}${isCurrentCategory ? '-active' : ''}.svg`;

              return (
                <CategoryButton
                  key={category}
                  category={category}
                  value={value}
                  iconPath={iconPath}
                  isCurrentCategory={isCurrentCategory}
                  handleCategory={() => handleCategory(key, value)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* main row */}
      <div className='w-screen h-1/2 flex flex-1'>
        {/* side bar */}
        <SideBar
          currentTab={currentTab}
          handlePageRouting={handlePageRouting}
        />

        {/* tab component */}
        <div className='w-full max-h-full p-4 bg-alt-secondary rounded-2xl mr-4 mb-4 ml-4 md:ml-0 overflow-hidden'>
          {children}
        </div>
      </div>
    </div>
  );
}

function CategoryButton({
  category,
  value,
  iconPath,
  isCurrentCategory,
  handleCategory
}: {
  category: string;
  value: string;
  iconPath: string;
  isCurrentCategory: boolean;
  handleCategory: () => void;
}) {
  return (
    <div
      key={category}
      className={`
        flex items-center justify-center space-x-2 cursor-pointer
        transition-all duration-300
        whitespace-nowrap mr-8
        ${
          isCurrentCategory
            ? 'bg-secondary p-1 px-8 rounded-xl text-white'
            : 'bg-transparent text-alt-secondary '
        }

      `}
      onClick={handleCategory}
    >
      {value !== BookCategory.ALL && (
        <Image src={iconPath} alt={value} width={20} height={20} className='' />
      )}
      <span>{value}</span>
    </div>
  );
}
