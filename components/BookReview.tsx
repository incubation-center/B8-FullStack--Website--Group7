import { ReviewData } from '@/dummydata';

import Image from 'next/image';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { Book, BookReview } from '@/types';
import AddNewReviewButton from './book-detail/AddNewReview';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import ReviewCmt from './book-detail/ReviewCmt';
import SpinningLoadingSvg from './icon/SpinningLoadingSvg';
import { getAllReviews } from '@/service/api/review';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '@/service/recoil';

export default function BookReview({ book }: { book: Book }) {
  const authStore = useRecoilValue(AuthAtom);
  const [reviews, setReviews] = useState<BookReview[] | undefined | null>();

  const { t } = useTranslation('book-detail');

  useEffect(() => {
    // fetch review
    getAllReviews(book.id as string)
      .then((res) => {
        setReviews(res);
      })
      .catch((err) => {
        console.log(err);
        setReviews(null);
      });
  }, []);

  const updateReview = (review: BookReview) => {
    setReviews((prev) => {
      if (prev === null) return prev;
      if (prev === undefined) return prev;
      return prev.map((prevReview) => {
        if (prevReview.reviewId === review.reviewId) {
          return review;
        }
        return prevReview;
      });
    });
  };

  return (
    <div className='mb-4 w-full md:max-w-[500px] flex flex-col justify-center md:justify-start h-full overscroll-auto'>
      {/* error fetching review */}
      {reviews === null && (
        <>
          <h1 className='text-xl text-alt-secondary mb-4 '>
            {t('review.title')}
          </h1>
          <div className='flex gap-2'>
            <h1 className='text-lg text-alt-secondary'>
              {t('review.error-fetching')}
            </h1>
          </div>
        </>
      )}

      {/* fetching review */}
      {reviews === undefined && (
        <>
          <h1 className='text-xl text-alt-secondary mb-4'>
            {t('review.title')}
          </h1>
          <div className='flex gap-2'>
            <SpinningLoadingSvg className='w-6 h-6 text-alt-secondary' />
            <h1 className='text-lg text-alt-secondary'>
              {' '}
              {t('review.loading-review')}
            </h1>
          </div>
        </>
      )}

      {/* review fetched */}
      {reviews && (
        <>
          {/* self review */}
          <div>
            <h1 className='text-xl text-alt-secondary mb-4'>
              {t('review.your-review')}
            </h1>

            {/* <ReviewCmt review={selfReview} isSelf /> */}

            {/* add review */}
            <AddNewReviewButton />
          </div>

          {/* others review*/}
          <div>
            <h1 className='text-xl text-alt-secondary mt-8'>
              {t('review.title')}
            </h1>

            <div className='mt-4 border-t border-alt-secondary '>
              {reviews.map((review) => {
                if (review.reviewer.userId === authStore.user?.userId) {
                  return <></>;
                }
                return (
                  <ReviewCmt
                    key={review.reviewId}
                    review={review}
                    userId={authStore.user?.userId as string}
                    updateReview={updateReview}
                  />
                );
              })}

              {/* no review */}
              {reviews.length === 0 && (
                <div className='flex flex-col items-center justify-center h-full p-4'>
                  <h1 className='text-lg text-alt-secondary'>
                    {t('review.no-review')}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const LoadingReview = () => {};
