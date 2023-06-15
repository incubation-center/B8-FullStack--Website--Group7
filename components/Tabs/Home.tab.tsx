import Image from 'next/image';
import { useRouter } from 'next/router';

import { BookData } from '@/dummydata';
import { BookCategory } from '@/utils/enum';

export default function HomeTab() {
  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <div className='ml-4 lg:ml-8 overflow-y-scroll overflow-x-clip h-screen w-screen pb-56 scroll-smooth'>
      {/* loop over category */}
      {Object.keys(BookCategory).map((key, index) => {
        const category = BookCategory[key as keyof typeof BookCategory];

        if (category === BookCategory.ALL)
          return <div key={key} id='all' className='w-1/3'></div>;

        return (
          <div
            key={key}
            className=' w-10/12 select-none flex flex-col flex-grow overflow-x-visible'
          >
            <div id={key.toLowerCase()} className='invisible h-12'>
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
      })}

      <div className='h-96'></div>
    </div>
  );
}
