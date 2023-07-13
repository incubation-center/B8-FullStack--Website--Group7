import { useState } from 'react';
import PlusIcon from '../icon/PlusSvg';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useTranslation } from 'next-i18next';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface RatingForm {
  rating: number;
  comment: string;
}

export default function AddNewReviewButton() {
  const { t } = useTranslation('book-detail');

  const [isCreating, setIsCreating] = useState(false);

  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RatingForm>();

  const onSubmit: SubmitHandler<RatingForm> = async ({ rating, comment }) => {
    console.log('====================================');
    console.log('rating: ', rating);
    console.log('====================================');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-fit w-full'>
      {isCreating && (
        <div
          className='
            w-full mb-4 rounded-lg
            border border-alt-secondary p-4
             h-fit
          '
        >
          <div className='flex gap-2 items-baseline'>
            <h1 className='font-medium text-alt-secondary text-lg'>
              {t('review.form.stars')}:
            </h1>
            <Controller
              control={control}
              name='rating'
              rules={{
                validate: (rating) => rating > 0
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  style={{ maxWidth: 100 }}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: '#f59e0b',
                    inactiveFillColor: '#ffedd5'
                  }}
                />
              )}
            />
          </div>
          {errors.rating && (
            <p
              className={
                'w-fit max-w-24 p-1 px-2 font-medium text-white rounded-full bg-red-500 text-xs'
              }
            >
              {t('review.validation.stars')}
            </p>
          )}
          <div>
            <h1 className='font-medium text-alt-secondary text-lg'>
              {t('review.form.comment')}:
            </h1>

            <Controller
              control={control}
              name='comment'
              rules={{
                validate: (comment) =>
                  comment.length > 0 && comment.length < 500
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <textarea
                    {...register('comment', {
                      required: t('review.validation.comment'),
                      maxLength: 500
                    })}
                    data-gramm='false'
                    className='
                      w-full bg-transparent focus:outline-none text-alt-secondary
                      border-b
                      placeholder-alt-secondary placeholder-opacity-50
                    '
                    id='comment'
                    autoFocus
                    placeholder={t('review.form.comment-placeholder')}
                    cols={30}
                    rows={8}
                    maxLength={500} // added maxLength attribute
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  ></textarea>
                  <div className='flex justify-between flex-wrap items-center'>
                    {
                      <p
                        className={` text-sm ${
                          value && value.length >= 500
                            ? 'text-red-500'
                            : 'text-alt-secondary'
                        }`}
                      >
                        {(value && value.length) || 0} / 500
                      </p>
                    }
                    {errors.comment && (
                      <p
                        className={
                          'w-fit max-w-24 p-1 px-2 font-medium text-white rounded-full bg-red-500 text-xs'
                        }
                      >
                        <>{errors.comment.message}</>
                      </p>
                    )}
                  </div>
                </>
              )}
            />
          </div>
        </div>
      )}

      {/* add button */}
      <div className='flex gap-2'>
        {isCreating && (
          <>
            {!isSubmitting && (
              <button
                className='
                  w-full
                  flex justify-center items-center
                  p-2 border-alt-secondary border rounded-lg
                  text-alt-secondary
                  hover:bg-alt-secondary hover:text-primary
                  font-medium
                  transition duration-300
                  stroke-alt-secondary hover:stroke-primary
                  hover:scale-95

                '
                type='button'
                onClick={() => setIsCreating(!isCreating)}
              >
                Cancel
              </button>
            )}
            <button
              className={`
                w-full
                flex justify-center items-center
                p-2 border-alt-secondary border rounded-lg
              
                bg-alt-secondary text-primary
                ${!isSubmitting && 'hover:scale-95'}
                
                font-medium
                transition duration-300
                stroke-primary
              `}
              type='submit'
              // onClick={() => setIsSubmitting(true)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <SpinningLoadingSvg className='w-6 h-6 mr-2' />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </>
        )}
        {!isCreating && !isSubmitting && (
          <button
            className='
              w-full
              flex justify-center items-center
              p-2 border-alt-secondary border rounded-lg
            
              hover:bg-alt-secondary 
              text-alt-secondary hover:text-primary
              hover:scale-95
              
              font-medium
              transition duration-300
              stroke-alt-secondary hover:stroke-primary
            '
            type='button'
            onClick={() => setIsCreating(!isCreating)}
          >
            <PlusIcon className='w-6 h-6 mr-2 ' />
            Add your review
          </button>
        )}
      </div>
    </form>
  );
}
