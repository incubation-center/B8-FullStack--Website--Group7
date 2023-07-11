/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import { BookData } from '@/dummydata';
import { BookCategory } from '@/utils/enum';

import { useScrollContainer } from 'react-indiana-drag-scroll';

import {
  AllBooksAtom,
  filteredBooksAtom,
  homePageCategoryAtom
} from '@/service/recoil';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { useDebounce, useOnScreen } from '@/utils/function';
import { Book } from '@/types';
import { getAllBooks } from '@/service/api/book';
import EducationSvg from '../icon/book-category/Education';
import BusinessSvg from '../icon/book-category/Business';
import DramaSvg from '../icon/book-category/Drama';
import FantasySvg from '../icon/book-category/Fantasy';
import HistorySvg from '../icon/book-category/History';
import SelfDevelopmentSvg from '../icon/book-category/SelfDevelopment';
import { useTranslation } from 'next-i18next';

export default function HomeTab({
  isUseInAdminPage = false,
  onClickViewInAdminPage
}: {
  isUseInAdminPage?: boolean;
  onClickViewInAdminPage?: (book: Book) => void;
}) {
  const router = useRouter();
  const { t } = useTranslation('homepage');

  const [allBooks, setAllBooks] = useRecoilState(AllBooksAtom);
  const filterBooks = useRecoilValue(filteredBooksAtom);
  const [isFetchingBooks, setIsFetchingBooks] = useState(false);

  // handle onScroll listener
  const scrollingRef = useRef(null);

  const handleBookClick = (book: Book) => {
    if (!isUseInAdminPage) {
      router.push(`/book/${book.id}`, undefined, { locale: router.locale });
      return;
    }

    // if use in admin page
    if (onClickViewInAdminPage) {
      onClickViewInAdminPage(book);
    }
  };

  const handleScrollToCategoryNav = (categoryKey: string, timeout: number) => {
    // scroll to id
    const element = document.getElementById(categoryKey.toLowerCase() + '-nav');

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, timeout);
    }
  };

  // handle category
  const [currentCategory, setCurrentCategory] =
    useRecoilState(homePageCategoryAtom);

  const handleCategory = useDebounce(
    (categoryKey: string, category: string) => {
      setCurrentCategory(category);

      handleScrollToCategoryNav(categoryKey, 800);

      if (!isUseInAdminPage) {
        router.replace(`/?tab=home#${categoryKey.toLowerCase()}`, undefined, {
          shallow: true
        });
      }
    },
    100
  );

  const handleVisibleOnScreen = useDebounce(
    (categoryKey: string, category: string) => {
      // if (isScrolling) return;
      // setCurrentCategory(category);
      // router.replace(`/?tab=home#${categoryKey.toLowerCase()}`, undefined, {
      //   shallow: true,
      //   scroll: false
      // });
    },
    300
  );

  const updateRoute = useDebounce((category: any) => {
    router.replace(`/?tab=home#${category.toLowerCase()}`, undefined, {
      shallow: true
    });
  }, 300);

  useEffect(
    useDebounce(() => {
      // get category from url
      const categoryKey = router.asPath.split('#')[1];

      if (categoryKey) {
        const category =
          BookCategory[categoryKey.toUpperCase() as keyof typeof BookCategory];

        setCurrentCategory(category);
      } else {
        setCurrentCategory(BookCategory.EDUCATION);

        if (!isUseInAdminPage) updateRoute(BookCategory.EDUCATION);
      }

      // setBooks(books);
      if (allBooks.length === 0) {
        setIsFetchingBooks(true);
        getAllBooks()
          .then((books) => {
            setAllBooks(books);
            setIsFetchingBooks(false);
          })
          .catch((err) => {
            console.log(err);
            setAllBooks(BookData);
            setIsFetchingBooks(false);
          });
      }

      return () => {
        setCurrentCategory(BookCategory.EDUCATION);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 100),
    []
  );

  return (
    <div className={`${isUseInAdminPage ? '' : 'px-4'} bg-inherit`}>
      {!filterBooks && !isUseInAdminPage && (
        <div
          id='category-section'
          className='
          category-section
          w-full overflow-x-auto flex flex-row bg-inherit
          sticky top-0 z-10 py-4
        '
        >
          <div className='w-full flex flex-nowrap h-[40px] items-center'>
            {Object.keys(BookCategory).map((category: any) => {
              const key = category as keyof typeof BookCategory;
              const value = BookCategory[key];

              const isCurrentCategory = currentCategory === value;

              const label = t(
                'homepage-tab.category.' +
                  value.toLowerCase().trim().replace(' ', '-')
              );

              return (
                <CategoryButton
                  key={category}
                  category={category}
                  value={value}
                  label={label}
                  isCurrentCategory={isCurrentCategory}
                  handleCategory={() => handleCategory(key, value)}
                  disabled={isFetchingBooks || allBooks.length === 0}
                >
                  <CategoryIcon
                    category={value}
                    isCurrentCategory={isCurrentCategory}
                  />
                </CategoryButton>
              );
            })}
          </div>
        </div>
      )}

      <div
        ref={scrollingRef}
        className='overflow-y-scroll overflow-x-hidden w-full scroll-smooth space-y-4'
      >
        {isFetchingBooks && (
          // fetching books skeleton
          <>
            <BookSectionSkeleton />
            <BookSectionSkeleton />
            <BookSectionSkeleton />
            <BookSectionSkeleton />
          </>
        )}

        {filterBooks && (
          <FilteredBooksList
            books={filterBooks}
            handleBookClick={handleBookClick}
          />
        )}

        {/* loop over category */}
        {!filterBooks &&
          Object.keys(BookCategory).map((key, index) => {
            const category = BookCategory[key as keyof typeof BookCategory];

            const books = allBooks.filter(
              (book) => book.category.trim() === category.trim()
            );

            if (books.length === 0) return null;

            const label = t(
              'homepage-tab.category.' +
                category.toLowerCase().trim().replace(' ', '-')
            );

            return (
              <BookSection
                key={key}
                categoryKey={key}
                books={books}
                label={label}
                category={category}
                handleBookClick={handleBookClick}
                handleVisibleOnScreen={handleVisibleOnScreen}
              />
            );
          })}

        {/* <div className='h-[300px]'></div> */}
      </div>
    </div>
  );
}

function CategoryIcon({
  category,
  isCurrentCategory
}: {
  category: string;
  isCurrentCategory: boolean;
}) {
  switch (category) {
    case BookCategory.EDUCATION:
      return (
        <EducationSvg
          className={`h-4 w-4 ${
            isCurrentCategory ? 'fill-white ' : 'fill-primary '
          }`}
        />
      );
    case BookCategory.BUSINESS:
      return (
        <BusinessSvg
          className={`h-4 w-4 ${
            isCurrentCategory
              ? 'fill-white stroke-white'
              : 'fill-primary stroke-primary'
          }`}
        />
      );
    case BookCategory.DRAMA:
      return (
        <DramaSvg
          className={`h-4 w-4 ${
            isCurrentCategory ? 'fill-white ' : 'fill-primary '
          }`}
        />
      );
    case BookCategory.FANTASY:
      return (
        <FantasySvg
          className={`h-4 w-4 ${
            isCurrentCategory ? 'fill-white' : 'fill-primary'
          }`}
        />
      );
    case BookCategory.HISTORY:
      return (
        <HistorySvg
          className={`h-4 w-4 ${
            isCurrentCategory
              ? 'fill-white stroke-white'
              : 'fill-primary stroke-primary'
          }`}
        />
      );
    case BookCategory.SELF_DEVELOPMENT:
      return (
        <SelfDevelopmentSvg
          className={`h-4 w-4 ${
            isCurrentCategory
              ? 'fill-white stroke-white'
              : 'fill-primary stroke-primary'
          }`}
        />
      );
  }

  return null;
}

function CategoryButton({
  category,
  value,
  label,
  children,
  isCurrentCategory,
  handleCategory,
  disabled
}: {
  category: string;
  value: string;
  children: React.ReactNode;
  label: string;
  isCurrentCategory: boolean;
  handleCategory: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      id={category.toLowerCase() + '-nav'}
      key={category}
      className={`
        flex w-fit max-w-md items-center justify-center space-x-2 cursor-pointer
        transition-all duration-300
        whitespace-nowrap 
        text-lg
        mr-8 select-none
        ${
          isCurrentCategory
            ? 'bg-primary p-1 px-8 rounded-full text-white'
            : 'bg-transparent text-primary '
        }

      `}
      onClick={handleCategory}
      disabled={disabled}
    >
      {/* <img src={iconPath} alt={value} className='h-4 w-fit inline-block' /> */}
      {children}
      <span>{label}</span>
    </button>
  );
}

function BookSection({
  categoryKey,
  category,
  books,
  label,
  handleBookClick,
  handleVisibleOnScreen
}: {
  categoryKey: string;
  category: string;
  books: Book[];
  label: string;
  handleBookClick: (book: Book) => void;
  handleVisibleOnScreen: (categoryKey: string, category: string) => void;
}) {
  const ref = useRef<any>(null);
  const isVisible = useOnScreen(ref);

  const { t } = useTranslation('homepage');

  const scrollContainer = useScrollContainer();

  useEffect(() => {
    if (isVisible) {
      handleVisibleOnScreen(categoryKey, category);
    }
  }, [category, categoryKey, handleVisibleOnScreen, isVisible]);

  return (
    <div
      ref={ref}
      className='w-full select-none flex flex-col flex-grow  relative'
    >
      <div
        id={categoryKey.toLowerCase()}
        className='invisible h-2 w-full absolute -top-[4.5rem] '
      >
        element to scroll to{' '}
      </div>
      {/* title */}
      <h1
        className='
          w-1/3 text-xl 
          md:text-2xl text-primary mb-4 mt-2 pt-3 whitespace-nowrap
          text-bold
        '
      >
        {label}
      </h1>

      {/* book */}
      <div
        ref={scrollContainer.ref}
        className='
          w-full pb-4
          flex flex-row 
          overflow-x-auto overscroll-x-contain
          book-scrolling-section relative
          z-0
          space-x-4
        '
      >
        {books.map((book, index) => (
          <motion.div
            animate={{ opacity: [0, 1], scale: [0.5, 1] }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            key={book.id}
            className='flex flex-col space-y-4'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className='relative h-[200px] w-[150px] mx-auto'>
              <Image
                className='w-full h-full object-bottom  object-contain'
                src={book.bookImg}
                alt={book.title}
                draggable={false}
                fill
                style={{
                  height: '100%',
                  width: '100%'
                }}
                sizes='(max-width: 640px) 150px, (max-width: 768px) 200px, 300px'
                onClick={() => handleBookClick(book)}
              />
            </div>

            <button
              className='
                bg-secondary text-white font-light text-small text-base
                rounded-full py-1 px-2 w-32 mx-auto
              '
              onClick={() => handleBookClick(book)}
            >
              {t('homepage-tab.sidebar.view-btn')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BookSectionSkeleton() {
  return (
    <div className='w-full select-none flex flex-col flex-grow overflow-x-visible animate-pulse'>
      {/* title */}
      <div className='w-40 h-4 mt-4 rounded-full text-4xl bg-primary mb-2 whitespace-nowrap'></div>

      {/* book */}
      <div
        className='
        w-full pb-2
        flex flex-row 
        overflow-x-auto overscroll-x-contain
        book-scrolling-section relative
        z-0
      '
      >
        <div className='bg-primary w-full h-40 rounded-lg '></div>
      </div>
      <div className='bg-primary w-full h-2 rounded-lg '></div>
    </div>
  );
}

function FilteredBooksList({
  books,
  handleBookClick
}: {
  books: Book[];
  handleBookClick: (book: Book) => void;
}) {
  return (
    <div className='w-full h-full py-4 space-y-8'>
      <h1 className='font-medium text-lg text-primary'>Search result:</h1>
      <div className='flex flex-row flex-wrap shrink-0 justify-center gap-4'>
        <AnimatePresence>
          {books.map((book, index) => (
            <motion.div
              layout
              animate={{ opacity: [0, 1], scale: [0.5, 1] }}
              exit={{ opacity: [1, 0], scale: [1, 0.5] }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              key={book.id}
              className='flex flex-col space-y-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}

              <div className='relative h-[200px] w-[150px] mx-auto'>
                <Image
                  className='w-full h-full object-bottom  object-contain'
                  src={book.bookImg}
                  alt={book.title}
                  draggable={false}
                  fill
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                  sizes='(max-width: 640px) 150px, (max-width: 768px) 200px, 300px'
                  onClick={() => handleBookClick(book)}
                />
              </div>

              <button
                className='
                bg-secondary text-white font-light
                rounded-lg py-1 px-2 w-32 mx-auto
              '
                onClick={() => handleBookClick(book)}
              >
                View
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
