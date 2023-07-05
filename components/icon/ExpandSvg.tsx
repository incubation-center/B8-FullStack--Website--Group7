import { HTMLAttributes } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export default function ExpandSvg({
  className,
  isExpanded
}: {
  className?: HTMLAttributes<HTMLElement>['className'];
  isExpanded?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
    >
      <AnimatePresence>
        {!isExpanded && (
          <motion.path
            key='expand'
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
            stroke='inherit'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M9 20l7 7 7-7M23 12l-7-7-7 7'
          />
        )}
        {isExpanded && (
          <motion.path
            key='collapse'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
            stroke='inherit'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M23 26l-7-7-7 7M9 6l7 7 7-7'
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
