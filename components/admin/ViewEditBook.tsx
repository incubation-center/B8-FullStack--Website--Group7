/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Book } from '@/types';
import RightArrowSvg from '../icon/RightArrowSvg';
import Image from 'next/image';
import { useDebounce } from '@/utils/function';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import RequiredIcon from '../login/RequiredIcon';
import useConfirmModal from '../Modals/useCofirm';
import { updateBookById } from '@/service/api/book';
import { AxiosError } from 'axios';
import useAlertModal, { AlertType } from '../Modals/Alert';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useRecoilState } from 'recoil';
import { AllBooksAtom } from '@/service/recoil';
import { BookCategory } from '@/utils/enum';
import EditBookCategory from './EditBookCategory';
import EditSvg from '../icon/EditSvg';
import { updateCoverImage } from '@/service/firebase';

interface BookUploadInputs extends Book {}

const CategoryOptions = [
  { value: BookCategory.EDUCATION, label: BookCategory.EDUCATION },
  { value: BookCategory.BUSINESS, label: BookCategory.BUSINESS },
  { value: BookCategory.HISTORY, label: BookCategory.HISTORY },
  { value: BookCategory.DRAMA, label: BookCategory.DRAMA },
  { value: BookCategory.FANTASY, label: BookCategory.FANTASY },
  { value: BookCategory.SELF_DEVELOPMENT, label: BookCategory.SELF_DEVELOPMENT }
];

export default function ViewEditBook({
  book,
  close
}: {
  book: Book;
  close: () => void;
}) {
  const { ConfirmModal, showConfirmModal } = useConfirmModal();
  const { AlertModal, showAlert } = useAlertModal();

  const [AllBooks, setAllBooks] = useRecoilState(AllBooksAtom);
  const [selectedCategory, setSelectedCategory] = useState(
    CategoryOptions.find((c) => c.value === book.category) ?? CategoryOptions[0]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isViewing = !isEditing && !isUpdating;

  const [image, setImage] = useState<File>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const [description, setDescription] = useState(book.description);

  const onChangeDescription = useDebounce((text: string) => {
    setDescription(text);
  }, 300);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BookUploadInputs>({
    defaultValues: {
      title: book.title,
      author: book.author,
      category: book.category
    }
  });

  const onSubmit: SubmitHandler<BookUploadInputs> = async (data) => {
    setIsUpdating(true);

    try {
      const formData = {
        title: data.title.trim(),
        author: data.author.trim(),
        category: selectedCategory.value,
        description: description.trim(),
        bookImg: book.bookImg
      };

      if (image) {
        const res = (await updateCoverImage(
          image as File,
          book.id as string,
          selectedCategory.value.toLowerCase().replace(' ', '_')
        )) as string;

        formData.bookImg = res;
      }

      const res = await updateBookById(book.id as string, formData);

      if (res.status !== 200) {
        throw new Error('Something went wrong');
      }

      setIsUpdating(false);
      setIsEditing(false);
      reset({
        title: res.data.title,
        author: res.data.author,
        category: res.data.category
      });
      setDescription(res.data.description);
      setImage(undefined);
      imageRef.current?.value && (imageRef.current.value = '');

      showAlert({
        title: 'Success',
        subtitle: 'Book updated successfully',
        type: AlertType.SUCCESS,
        onModalClose: () => {
          setAllBooks((prev) => {
            const newBooks = prev.map((b) => {
              if (b.id === book.id) {
                return res.data;
              }
              return b;
            });
            return newBooks;
          });
        }
      });
    } catch (error) {
      setIsEditing(false);
      setIsUpdating(false);
      let message = 'Something went wrong';
      if (error instanceof AxiosError) {
        message = error.response?.data.message || message;
      }
      showAlert({
        title: 'Error',
        subtitle: message,
        type: AlertType.ERROR
      });
    }
  };

  const onCancelForm = () => {
    showConfirmModal({
      title: 'Cancel Editing',
      subtitle: 'Are you sure you want to cancel the form?',
      onConfirm: () => {
        reset({
          title: book.title,
          author: book.author,
          category: book.category
        });
        setDescription(book.description);
        setImage(undefined);
        imageRef.current?.value && (imageRef.current.value = '');
        setIsEditing(false);
      }
    });
  };

  const onClose = () => {
    if (isViewing) {
      close();
      return;
    }

    showConfirmModal({
      title: 'Cancel',
      subtitle: 'Are you sure you want to close and cancel the form?',
      onConfirm: () => {
        reset({
          title: book.title,
          author: book.author,
          category: book.category
        });
        setDescription(book.description);
        setIsEditing(false);
        close();
      }
    });
  };

  const variants = {
    hidden: {
      x: '100%',
      y: 0
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.3
      }
    }
  };

  const activeClassName = `
    py-2 
    bg-primary text-alt-secondary
    border-b-2 border-alt-secondary box-content
    focus:outline-none
  `;
  const defaultClassName = `
    py-2 bg-transparent border-b-2 border-primary 
    focus:outline-none

  `;

  return (
    <>
      <ConfirmModal />
      <AlertModal />

      {/* overlay */}
      <motion.div
        key='overlay'
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: [0, 1]
        }}
        exit={{
          opacity: [1, 0],
          transition: { delay: 0.3 }
        }}
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 filter backdrop-blur-sm ${
          isViewing && 'cursor-pointer'
        }`}
        onClick={isViewing ? close : undefined}
      ></motion.div>

      {/* view-edit */}
      <motion.div
        key='view-edit-book'
        variants={variants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='fixed right-0 top-0 w-2/3 2xl:w-1/2 h-screen z-[99999] flex items-center overflow-clip'
      >
        {/* close */}
        <button
          className=' bg-primary p-4 z-0 rounded-l-full translate-x-2 shadow-xl'
          onClick={onClose}
        >
          <motion.div
            animate={{
              rotate: [180, 0],
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            <RightArrowSvg className='h-5 w-5 2xl:h-7 2xl:w-7 text-alt-secondary translate-x-1' />
          </motion.div>
        </button>

        {/* book */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='h-screen w-full flex flex-col'
        >
          {/* form body */}
          <div className='h-screen w-full bg-primary p-4 overflow-auto z-10 relative'>
            {/* book cover */}
            <div className='relative h-56 2xl:h-64 w-fit'>
              {image && (
                <button
                  onClick={() => {
                    setImage(undefined);
                    if (imageRef.current) {
                      imageRef.current.value = '';
                    }
                  }}
                  type='button'
                  className='absolute -top-2 -right-2 z-10'
                >
                  <img
                    src='/icon/fail.png'
                    alt='close icon'
                    className='w-6 h-6 cursor-pointer'
                  />
                </button>
              )}
              {/* image */}
              <AnimatePresence>
                <img
                  src={image ? URL.createObjectURL(image) : book.bookImg}
                  alt='book cover'
                  className='w-full h-full object-cover'
                />

                {/* hover to edit image */}
                {isEditing && (
                  <motion.label
                    key='edit image'
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    htmlFor='profileImg'
                    className='
                      w-full h-full
                      absolute top-0 left-0
                      backdrop-blur-[3px] bg-black/10
                      cursor-pointer
                      flex flex-col justify-center items-center
                      text-white font-medium
                      transition-all duration-300
                    '
                  >
                    <EditSvg className='w-4 h-fit fill-white' />
                    <span>Edit</span>
                  </motion.label>
                )}
              </AnimatePresence>

              <input
                ref={imageRef}
                name='profileImg'
                id='profileImg'
                type='file'
                className='
                  col-span-3 p-1
                  w-full bg-transparent
                  border-b border-primary
                  hidden
                '
                onChange={handleSelectImage}
                accept='image/*'
                disabled={isViewing || isUpdating}
              />
            </div>
            {!isViewing && (
              <div className='w-fit text-center mt-2 text-white text-xs text-opacity-60'>
                (click to change image)
              </div>
            )}

            {/* book detail */}
            <div className='flex justify-between items-end gap-2 mt-5'>
              <div className='w-full space-y-[10px] text-alt-secondary font-light'>
                <h2 className='font-bold text-xl 2xl:text-2xl'>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    placeholder='Title'
                    type='text'
                    disabled={!isEditing || isUpdating}
                    className={`
                      ${isEditing ? activeClassName : defaultClassName} 
                      transition-all duration-300 focus:outline-none w-full
                      placeholder:text-alt-secondary placeholder:text-opacity-50
                    `}
                  />
                  <InputError error={errors.title?.message} />
                </h2>

                <h2>
                  <span className='font-medium'>
                    Author
                    {isEditing && <RequiredIcon />}
                  </span>
                  <br />
                  <input
                    {...register('author', { required: 'Author is required' })}
                    // ref={authorRef}
                    type='text'
                    disabled={!isEditing || isUpdating}
                    className={`
                      ${isEditing ? activeClassName : defaultClassName} 
                      transition-all duration-300 w-full
                    `}
                  />
                  <InputError error={errors.author?.message} />
                </h2>
                <div>
                  <h2 className='font-medium'>
                    Genre
                    {isEditing && <RequiredIcon />}
                  </h2>
                  <EditBookCategory
                    options={CategoryOptions}
                    selectedOption={selectedCategory as any}
                    setSelectedOption={setSelectedCategory}
                    disabled={isViewing}
                  />
                </div>
              </div>
            </div>

            <div className='text-alt-secondary mt-4'>
              <h2 className='font-bold'>
                Book Description
                {isEditing && (
                  <span className='ml-2 text-alt-secondary text-opacity-70'>
                    (optional)
                  </span>
                )}
              </h2>

              <div className='mt-[10px] text-alt-secondary font-light w-full'>
                {isViewing && description.length <= 0 && (
                  <div className='text-alt-secondary text-opacity-70'>
                    No description provided
                  </div>
                )}
                <div
                  suppressContentEditableWarning={true}
                  contentEditable={isEditing && !isUpdating}
                  onInput={(e) =>
                    onChangeDescription(e.currentTarget.textContent || '')
                  }
                  className={`
                    ${isEditing ? activeClassName : defaultClassName} 
                    transition-all duration-300 w-full  
                  `}
                >
                  {description}
                </div>
                <InputError error={errors.description?.message} />
              </div>
            </div>
          </div>
          {/* edit button */}
          <div className='flex justify-end gap-2 w-full p-4 bg-primary'>
            {isViewing && (
              <button
                className=' bg-secondary w-32 p-2 px-8 text-white rounded-full flex justify-center items-baseline'
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            )}
            {isEditing && !isUpdating && (
              <>
                <button
                  className=' bg-danger  w-32 p-2 px-8 text-white rounded-full'
                  onClick={onCancelForm}
                  type='button'
                >
                  Cancel
                </button>
                <button
                  className=' bg-secondary  w-32 p-2 px-8 text-white rounded-full'
                  type='submit'
                >
                  Save
                </button>
              </>
            )}
            {isUpdating && (
              <div className='bg-secondary w-fit p-2 px-4 text-white rounded-full flex gap-2 font-medium opacity-80'>
                <SpinningLoadingSvg className='h-6 w-6 text-white' />
                Updating...
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </>
  );
}

const InputError = ({ error }: { error: any }) => {
  if (!error) return <></>;

  return (
    <p className='font-medium bg-red-500 text-white rounded-full w-fit px-4 mt-2 text-sm text-center'>
      {error}
    </p>
  );
};
