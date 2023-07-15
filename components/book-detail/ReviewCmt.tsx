import { BookReview } from '@/types';
import { useState } from 'react';

import Image from 'next/image';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import Reaction from './Reaction';

export default function ReviewCmt({
  review,
  isSelf
}: {
  review: BookReview;
  isSelf?: boolean;
}) {
  const [isSeeMore, setIsSeeMore] = useState(false);

  const toggleSeeMore = () => {
    setIsSeeMore((prev) => !prev);
  };

  const commentNeedSeeMore = review.comment.length > 100;

  const commentReaction = () => {
    return null;
  };

  return (
    <div
      className={`
        w-full
        flex gap-4
        p-2 pt-4   border-alt-secondary
        ${isSelf ? 'border rounded-lg' : 'border-b'}
      `}
    >
      <div className='w-full flex flex-col justify-start items-start '>
        <div className='w-full flex  justify-between flex-wrap-reverse gap-2'>
          <div className='flex items-start gap-2'>
            <div className='relative w-10 h-10'>
              <Image
                src={review.reviewer.profileImg}
                alt='avatar'
                fill
                className='rounded-full'
              />
            </div>
            <div>
              <h1 className='font-medium text-alt-secondary'>
                {review.reviewer.username}
              </h1>
              <p className='text-sm text-alt-secondary'>
                {review.timestamp.toLocaleDateString()}
              </p>
            </div>
            {review.edited && (
              <span className='text-sm text-alt-secondary mt-1'>(Edited)</span>
            )}
          </div>

          <div>
            <Rating
              style={{ maxWidth: 100 }}
              value={review.rating}
              readOnly
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: '#f59e0b',
                inactiveFillColor: '#ffedd5'
              }}
            />
          </div>
        </div>

        <div className='mt-4 text-alt-secondary'>
          {commentNeedSeeMore &&
            !isSeeMore &&
            review.comment.slice(0, 100) + '...'}

          {commentNeedSeeMore && isSeeMore && review.comment}

          {!commentNeedSeeMore && review.comment}
        </div>
        <div className='mt-4 w-full flex justify-between'>
          <Reaction
            selected={commentReaction()}
            likes={review.likeUsersIds?.length || 0}
            dislikes={review.dislikeUsersIds?.length || 0}
          />
          {commentNeedSeeMore && (
            <button
              className='
                text-sm text-alt-secondary
               
              '
              onClick={toggleSeeMore}
            >
              {isSeeMore ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
