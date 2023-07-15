/* eslint-disable @next/next/no-img-element */
import { BookReview } from '@/types';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import Reaction from './Reaction';
import { handleFallBackProfileImage, useDebounce } from '@/utils/function';
import { reactToReview, removeReaction } from '@/service/api/review';
import { useTranslation } from 'next-i18next';
import useModal from '../Modals/useModal';
import NotLoggedInLayout from '../layout/NotLoggedInLayout';

export default function ReviewCmt({
  review,
  isSelf,
  userId,
  updateReviewState,
  deleteReview,
  toggleEditing,
  showLoginModal
}: {
  review: BookReview;
  isSelf?: boolean;
  userId: string;
  updateReviewState: (review: BookReview) => void;
  deleteReview?: (review: BookReview) => void;
  toggleEditing?: (review: BookReview) => void;
  showLoginModal: () => void;
}) {
  const { t } = useTranslation('book-detail');

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
    if (!userId) {
      showLoginModal();
      return;
    }

    setIsReacting(true);
    reactToReview(review.reviewId as string, userId, reaction)
      .then((res: any) => {
        updateReviewState(res as BookReview);
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
      if (!userId) {
        showLoginModal();
        return;
      }

      setIsReacting(true);
      removeReaction(review.reviewId as string, userId, reaction)
        .then((res: BookReview) => {
          updateReviewState(res as BookReview);
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
    <>
      <div
        className={`
        w-full
        flex gap-4
        p-4 border-alt-secondary
        ${isSelf ? 'border rounded-lg' : 'border-b'}
      `}
      >
        <div className='w-full flex flex-col justify-start items-start '>
          <div className='w-full flex  justify-between flex-wrap-reverse gap-2'>
            <div className='flex items-start gap-2'>
              <div className='relative w-12 h-12'>
                <Image
                  loader={() => handleFallBackProfileImage(review.reviewer)}
                  unoptimized
                  src={handleFallBackProfileImage(review.reviewer)}
                  alt='avatar'
                  fill
                  sizes='50px'
                  className='rounded-full object-cover'
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
                <span className='text-sm text-alt-secondary text-opacity-70'>
                  ({t('review.edited')})
                </span>
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
      {/* comment actions */}
      {isSelf && (
        <div className='mt-2 w-full flex justify-end gap-2'>
          <button
            className='w-full text-white bg-danger p-1 px-2 rounded-lg'
            onClick={() => deleteReview && deleteReview(review)}
          >
            {t('review.delete-btn')}
          </button>
          <button
            onClick={() => toggleEditing && toggleEditing(review)}
            className='w-full bg-alt-secondary text-primary p-1 px-2 rounded-lg font-medium'
          >
            {t('review.edit-btn')}
          </button>
        </div>
      )}
    </>
  );
}
