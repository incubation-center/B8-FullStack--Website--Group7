import Image from 'next/image';

import { homePageSearchAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';
import { BookCategory } from '@/utils/enum';
import { useState } from 'react';
import SideBar from './SideBar';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useRecoilState(homePageSearchAtom);

  // handle category
  const [currentCategory, setCurrentCategory] = useState(BookCategory.ALL);

  const handleCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <div className='w-full h-full'>
      {/* search bar row */}
      <div className='w-full flex justify-center items-center py-4 relative'>
        {/* search bar */}
        <div
          className='
            w-1/4
            flex justify-center items-center
           bg-alt-secondary 
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
              box-border border-2 hover:border-primary
            '
          >
            Log In
          </button>
        </div>
      </div>

      {/* category row  */}
      <div className='w-full flex flex-row h-9'>
        {/* offset navigation sidebar */}
        <div className='w-[200px]'></div>

        <div className='flex space-x-8'>
          {Object.keys(BookCategory).map((category: any) => {
            const key = category as keyof typeof BookCategory;
            const value = BookCategory[key];

            const isCurrentCategory = currentCategory === value;

            const iconPath = `/icon/book-category/${BookCategory[
              category as keyof typeof BookCategory
            ].toLowerCase()}${isCurrentCategory ? '-active' : ''}.svg`;

            return (
              <div
                key={category}
                className={`
                  flex items-center justify-center space-x-2 cursor-pointer
                  transition-all duration-300
                  ${
                    isCurrentCategory
                      ? 'bg-primary p-1 px-8 rounded-xl text-white'
                      : 'bg-transparent text-primary'
                  }

                `}
                onClick={() => handleCategory(value)}
              >
                {value !== BookCategory.ALL && (
                  <Image
                    src={iconPath}
                    alt={value}
                    width={20}
                    height={20}
                    className=''
                  />
                )}
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* main row */}
      <div className='h-full flex flex-1'>
        {/* side bar */}
        <SideBar />

        {/* tab component */}
        {/* <div className='flex-1'>{children}</div> */}
      </div>
    </div>
  );
}

// q: 174 + 32 ? 206
