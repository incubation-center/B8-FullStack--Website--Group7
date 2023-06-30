'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../login/CustomInput';

export interface ConfirmRejectModal {
  title: string;
  subtitle: string;
  isClosable?: boolean;
  onConfirm: (reason: string) => void;
}

interface RejectInputs {
  reason: string;
}

export default function useConfirmRejectModal() {
  const [isShowing, setIsShowing] = useState(false);
  const [{ title, subtitle, isClosable, onConfirm }, initModal] =
    useState<ConfirmRejectModal>({
      title: '',
      subtitle: '',
      isClosable: true,
      onConfirm: (reason) => {}
    });

  // close modal
  function close() {
    setIsShowing(false);
  }

  // open modal
  function open() {
    setIsShowing(true);
  }

  function showRejectModal(props: ConfirmRejectModal) {
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
  function ConfirmRejectModal() {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>('#modal-root');
      setMounted(true);
    }, []);

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<RejectInputs>();

    const onSubmit: SubmitHandler<RejectInputs> = async ({ reason }) => {
      close();

      onConfirm(reason);
    };

    return mounted && ref.current
      ? createPortal(
          <AnimatePresence>
            {isShowing && (
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                      <h1 className='font-bold text-xl lg:text-2xl text-primary'>
                        {title}
                      </h1>
                      <p className='font-medium text-primary whitespace-pre-line'>
                        {subtitle}
                      </p>
                    </div>

                    <div className='w-full mt-4'>
                      <CustomInput
                        label='Reject reason:'
                        required
                        name='reason'
                        type='textfield'
                        labelClassName='text-primary font-medium'
                        errorClassName='bg-red-500 text-white rounded-full w-fit px-2 mt-2 ml-4 text-sm text-center'
                        register={register('reason', {
                          required: 'reject reason is required'
                        })}
                        error={errors.reason}
                        placeholder='Please input your reason'
                      />
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
                        No
                      </button>
                      <button
                        className='
                        px-10 py-2 mt-8 rounded-full
                        font-bold
                        bg-primary text-alt-secondary
                      '
                        type='submit'
                      >
                        Yes
                      </button>
                    </div>
                  </motion.div>
                </div>
              </form>
            )}
          </AnimatePresence>,
          ref.current
        )
      : null;
  }

  return {
    ConfirmRejectModal,
    showRejectModal
  };
}
