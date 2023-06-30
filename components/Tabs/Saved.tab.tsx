import { useRouter } from 'next/router';

import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '@/service/recoil';

export default function SavedTab({
  onClickExplore
}: {
  onClickExplore: () => void;
}) {
  const authStore = useRecoilValue(AuthAtom);
  const router = useRouter();

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  return (
    <NotLoggedInLayout>
      {authStore.user && (
        <div className='p-4 w-full h-full  flex flex-col justify-center px-4 space-y-4 md:px-8 md:space-y-8'>
          <h1
            className='
              font-bold text-primary text-center
              text-2xl md:text-4xl
              w-full border-b-2 border-primary
              pb-4 md:pb-8
              pt-2 md:pt-4
            '
          >
            Saved
          </h1>
          <div className='w-full h-full flex flex-wrap gap-8 justify-center'>
            {authStore.user.favoriteBooks.length === 0 && (
              <div className='h-full w-full flex flex-col justify-center items-center'>
                <h1 className='text-center text-primary font-medium'>
                  You have no saved books
                </h1>
                <button
                  className='
                    bg-primary text-white px-4 py-2 rounded-full w-40
                    text-lg font-medium mt-4
                  '
                  onClick={onClickExplore}
                >
                  explore books
                </button>
              </div>
            )}
            {authStore.user.favoriteBooks.map((book, index) => (
              <div key={book.id!} className='flex flex-col space-y-4'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className='w-fit h-[200px] object-cover cursor-pointer'
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
      )}
    </NotLoggedInLayout>
  );
}
