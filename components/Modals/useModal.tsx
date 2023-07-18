import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { isMakingRequestAtom } from '@/service/recoil';

// DESC: reuseable modal hook
export default function useModal() {
  const isMakingRequest = useRecoilValue(isMakingRequestAtom);
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(!isShowing);
  const close = () => setIsShowing(false);
  const open = () => setIsShowing(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isShowing) {
        window.document
          .querySelector('body')!
          .classList.add('!overflow-hidden');
      } else {
        window.document
          .querySelector('body')!
          .classList.remove('!overflow-hidden');
      }
    }
  }, [isShowing]);

  const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
    const handleClickedOutside = (e: any) => close();

    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>('#modal-root');
      setMounted(true);
    }, []);

    return mounted && ref.current ? (
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
                min-w-[350px] md:min-w-[600px]
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
              onClick={isMakingRequest ? undefined : handleClickedOutside}
              className={`w-full h-full fixed ${
                isMakingRequest ? 'cursor-default' : 'cursor-pointer'
              }`}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    ) : null;
  };

  return {
    isShowing,
    toggle,
    close,
    open,
    ModalWrapper
  };
}
