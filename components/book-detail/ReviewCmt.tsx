import { BookReview } from '@/types';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import Reaction from './Reaction';
import { useDebounce } from '@/utils/function';
import { reactToReview, removeReaction } from '@/service/api/review';

export default function ReviewCmt({
  review,
  isSelf,
  userId,
  updateReview
}: {
  review: BookReview;
  isSelf?: boolean;
  userId: string;
  updateReview: (review: BookReview) => void;
}) {
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null);
  const [isReacting, setIsReacting] = useState(false);

  const toggleSeeMore = () => {
    setIsSeeMore((prev) => !prev);
  };

  const commentNeedSeeMore = review.comment.length > 100;

  useEffect(() => {
    const commentReaction = () => {
      if (review.likeUserIds?.includes(userId)) {
        setReaction('like');
      } else if (review.dislikeUserIds?.includes(userId)) {
        setReaction('dislike');
      } else {
        setReaction(null);
      }
    };

    commentReaction();
  }, [review, userId]);

  const handleReaction = useDebounce(async (reaction: 'like' | 'dislike') => {
    setIsReacting(true);
    reactToReview(review.reviewId as string, userId, reaction)
      .then((res: any) => {
        updateReview(res as BookReview);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReacting(false);
      });
  }, 300);

  const handleRemoveReaction = useDebounce(
    async (reaction: 'like' | 'dislike') => {
      setIsReacting(true);

      removeReaction(review.reviewId as string, userId, reaction)
        .then((res: BookReview) => {
          updateReview(res as BookReview);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsReacting(false);
        });
    },
    300
  );

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
            selected={reaction}
            likes={review.likeUserIds?.length || 0}
            dislikes={review.dislikeUserIds?.length || 0}
            onClickReaction={handleReaction}
            onRemoveReaction={handleRemoveReaction}
            disabled={isReacting}
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
