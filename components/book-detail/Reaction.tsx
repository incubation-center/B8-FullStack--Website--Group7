import { useState } from 'react';
import DislikeSvg from '../icon/DislikeSvg';
import LikeSvg from '../icon/LikeSvg';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';

import { AnimatePresence, motion } from 'framer-motion';

export default function Reaction({
  selected,
  likes,
  dislikes,
  onClickReaction,
  onRemoveReaction,
  disabled
}: {
  selected: 'like' | 'dislike' | null;
  likes: number;
  dislikes: number;
  onClickReaction: (reaction: 'like' | 'dislike') => void;
  onRemoveReaction: (reaction: 'like' | 'dislike') => void;
  disabled?: boolean;
}) {
  const [isReacting, setIsReacting] = useState<'like' | 'dislike'>();

  const handleOnClickReaction = (reaction: 'like' | 'dislike') => {
    setIsReacting(reaction);
    if (selected === reaction) {
      onRemoveReaction(reaction);
    } else {
      onClickReaction(reaction);
    }
  };

  return (
    <div className='flex flex-nowrap items-center gap-4'>
      <button
        className={`
        p-1 px-2 rounded-full
        hover:scale-110 transition-transform duration-300
        ${
          selected === 'like'
            ? 'fill-alt-secondary '
            : 'fill-none stroke-alt-secondary'
        }
      `}
        disabled={disabled}
        onClick={() => handleOnClickReaction('like')}
      >
        <div className='flex items-center  gap-2 text-alt-secondary font-medium'>
          <AnimatePresence>
            {disabled && isReacting === 'like' ? (
              <motion.span
                key='loading'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <SpinningLoadingSvg className='h-6 w-6 mb-1' />
              </motion.span>
            ) : (
              <motion.span
                key='like'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <LikeSvg className='h-6 w-6 mb-1' />
              </motion.span>
            )}
          </AnimatePresence>

          <div>{likes}</div>
        </div>
      </button>

      <button
        className={`
        p-1 px-2 rounded-full
        hover:scale-110 transition-transform duration-300
        ${
          selected === 'dislike'
            ? 'fill-alt-secondary'
            : 'fill-none stroke-alt-secondary'
        }

      `}
        onClick={() => handleOnClickReaction('dislike')}
        disabled={disabled}
      >
        <div className='flex items-center gap-2 text-alt-secondary font-medium'>
          <AnimatePresence>
            {disabled && isReacting === 'dislike' ? (
              <motion.span
                key='loading'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <SpinningLoadingSvg className='h-6 w-6 mb-1' />
              </motion.span>
            ) : (
              <motion.span
                key='dislike'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <DislikeSvg className='h-6 w-6 mt-1' />
              </motion.span>
            )}
          </AnimatePresence>

          <p>{dislikes}</p>
        </div>
      </button>
    </div>
  );
}
