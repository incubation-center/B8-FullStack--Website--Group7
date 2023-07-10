'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ConfirmModal {
  title: string;
  subtitle: string;
  isClosable?: boolean;
  onConfirm: () => void;
}

export default function useConfirmModal() {
  const [isShowing, setIsShowing] = useState(false);

  const [{ title, subtitle, isClosable, onConfirm }, initModal] =
    useState<ConfirmModal>({
      title: '',
      subtitle: '',
      isClosable: true,
      onConfirm: () => {}
    });

  // close modal
  function close() {
    setIsShowing(false);
  }

  // open modal
  function open() {
    setIsShowing(true);
  }

  function showConfirmModal(props: ConfirmModal) {
    initModal({
      ...props,
      isClosable: props.isClosable ? props.isClosable : true
    });

    open();
  }

  // frame motion variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -100,
      scale: 0
    }
  };

  // modal component
  // this component need to be used in the root of the component that you're using the service
  function ConfirmModal() {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    const { t } = useTranslation('common');

    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>('#modal-root');
      setMounted(true);
    }, []);

    return mounted && ref.current
      ? createPortal(
          <AnimatePresence>
            {isShowing && (
              <div
                className='
                  h-screen w-screen overflow-hidden 
                  fixed top-0 left-0 p-6
                  flex justify-center items-center
                '
              >
                <div
                  className={`absolute h-screen w-screen bg-black bg-opacity-40 z-[99999] ${
                    isClosable && 'cursor-pointer'
                  }`}
                  onClick={isClosable ? close : undefined}
                />
                <motion.div
                  className='
                    bg-alt-secondary
                    rounded-lg p-6
                    flex flex-col items-center
                    text-center
                    z-[999999]
                    min-w-[300px]
                    overflow-hidden
                  '
                  variants={modalVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 200
                  }}
                >
                  {/* <Image
                    src={imagePath[type ?? 'success']}
                    width={80}
                    height={80}
                    alt='successful icon'
                    className='mb-2'
                  /> */}

                  <div>
                    <h1 className='font-bold text-xl lg:text-2xl text-primary'>
                      {title}
                    </h1>
                    <p className='font-medium text-primary whitespace-pre-line mt-3'>
                      {subtitle}
                    </p>
                  </div>

                  <div className='flex gap-4'>
                    <button
                      className='
                        px-10 py-2 mt-8 rounded-full
                        text-primary font-bold
                        outline outline-2 outline-primary box-content
                      '
                      onClick={close}
                    >
                      {t('modal.no-btn')}
                    </button>
                    <button
                      className='
                        px-10 py-2 mt-8 rounded-full
                        font-bold
                        bg-primary text-alt-secondary
                      '
                      onClick={() => {
                        close();
                        onConfirm();
                      }}
                    >
                      {t('modal.yes-btn')}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          ref.current
        )
      : null;
  }

  return {
    ConfirmModal,
    showConfirmModal
  };
}
