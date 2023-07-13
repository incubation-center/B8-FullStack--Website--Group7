import { ReviewData } from '@/dummydata';

import Image from 'next/image';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { BookReview } from '@/types';
import AddNewReviewButton from './book-detail/AddNewReview';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ReviewCmt from './book-detail/ReviewCmt';

export default function BookReview() {
  const selfReview = ReviewData[0];

  const { t } = useTranslation('book-detail');

  return (
    <div className='mb-4 min-w-[320px] max-w-[500px] flex flex-col justify-center md:justify-start h-full overscroll-auto'>
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
        <h1 className='text-xl text-alt-secondary mt-8'>{t('review.title')}</h1>

        <div className='mt-4 space-y-4 border-t border-alt-secondary '>
          {ReviewData.map((review) => (
            <ReviewCmt key={review.id} review={review} />
          ))}
          {ReviewData.map((review) => (
            <ReviewCmt key={review.id} review={review} />
          ))}
          {ReviewData.map((review) => (
            <ReviewCmt key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
