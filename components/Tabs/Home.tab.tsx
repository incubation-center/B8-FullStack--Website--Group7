/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';

import { BookData } from '@/dummydata';
import { BookCategory } from '@/utils/enum';

import { homePageCategoryAtom, homePageSearchAtom } from '@/service/recoil';
import { useRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';
import { useDebounce, useOnScreen } from '@/utils/function';

export default function HomeTab() {
  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  // handle category
  const [currentCategory, setCurrentCategory] =
    useRecoilState(homePageCategoryAtom);

  const handleCategory = (categoryKey: string, category: string) => {
    setCurrentCategory(category);

    router.push(`/?tab=home#${categoryKey.toLowerCase()}`, undefined, {
      shallow: true
    });
  };

  const handleVisibleOnScreen = useDebounce(
    (categoryKey: string, category: string) => {
      setCurrentCategory(category);

      router.replace(`/?tab=home#${categoryKey.toLowerCase()}`, undefined, {
        shallow: true,
        scroll: false
      });
    },
    300
  );

  return (
    <div className=' overflow-y-scroll overflow-x-clip h-screen w-screen pb-56 scroll-smooth relative'>
      <div
        className='
          w-screen flex flex-row py-4 bg-alt-secondary 
          sticky top-0 left-0 z-10
        '
      >
        <div className='w-full flex'>
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

      {/* loop over category */}
      {Object.keys(BookCategory).map((key, index) => {
        const category = BookCategory[key as keyof typeof BookCategory];

        return (
          <BookSection
            key={key}
            categoryKey={key}
            category={category}
            handleBookClick={handleBookClick}
            handleVisibleOnScreen={handleVisibleOnScreen}
          />
        );
      })}

      <div className='h-28'></div>
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
        text-lg
        ${
          isCurrentCategory
            ? 'bg-primary p-1 px-8 rounded-xl text-white'
            : 'bg-transparent text-primary '
        }

      `}
      onClick={handleCategory}
    >
      <img src={iconPath} alt={value} className='h-4' />
      <span>{value}</span>
    </div>
  );
}

function BookSection({
  categoryKey,
  category,
  handleBookClick,
  handleVisibleOnScreen
}: {
  categoryKey: string;
  category: string;
  handleBookClick: (id: string) => void;
  handleVisibleOnScreen: (categoryKey: string, category: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      handleVisibleOnScreen(categoryKey, category);
    }
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className='w-10/12 select-none flex flex-col flex-grow overflow-x-visible'
    >
      <div id={categoryKey.toLowerCase()} className='invisible h-16'>
        element to scroll to{' '}
      </div>
      {/* title */}
      <h1 className='w-1/3 text-4xl text-primary mb-4 whitespace-nowrap'>
        {category}
      </h1>

      {/* book */}
      <div
        className='
        w-full pb-4
        flex flex-row 
        overflow-x-auto overscroll-x-contain
        book-scrolling-section relative
        z-0
      '
      >
        <div className='flex flex-row shrink-0 space-x-[35px] '>
          {BookData.map((book, index) => (
            <div key={book.id} className='flex flex-col space-y-4'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='w-[120px] object-cover cursor-pointer'
                src={book.bookImg}
                alt={book.title}
                draggable={false}
                onClick={() => handleBookClick(book.id!)}
              />

              <button
                className='
                bg-secondary text-white font-light
                rounded-lg py-1 px-2
              '
                onClick={() => handleBookClick(book.id!)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
