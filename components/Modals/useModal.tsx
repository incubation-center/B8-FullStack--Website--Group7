import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

// DESC: reuseable modal hook
export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(!isShowing);
  const close = () => setIsShowing(false);
  const open = () => setIsShowing(true);

  const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
    const handleClickedOutside = (e: any) => close();

    return (
      <AnimatePresence mode='popLayout'>
        {isShowing && (
          <motion.div
            key='modal-wrapper'
            className='
              fixed top-0 left-0 z-[999]
              w-screen h-screen
              flex justify-center items-center
              bg-black bg-opacity-50
              p-5 md:p-10
            '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key='modal'
              className='
                z-10 
                min-w-[600px]
                w-fit
                h-fit mx-auto
              '
              initial={{ y: -100, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>

            {/* overlay */}
            <div
              onClick={handleClickedOutside}
              className='w-full h-full fixed cursor-pointer'
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return {
    isShowing,
    toggle,
    close,
    open,
    ModalWrapper
  };
}
