/* eslint-disable @next/next/no-img-element */
import AdminTabLayout from '@/components/layout/AdminTabLayout';
import RequiredIcon from '@/components/login/RequiredIcon';
import { Book } from '@/types';
import { BookCategory } from '@/utils/enum';
import { useState, Fragment, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomListDropDown from '../ListDropDown';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import { createBook } from '@/service/api/admin';
import { AxiosError } from 'axios';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { uploadBookCover } from '@/service/firebase';
import { updateBookById } from '@/service/api/book';

interface BookUploadInputs extends Book {}

const CategoryOptions = [
  { value: BookCategory.EDUCATION, label: BookCategory.EDUCATION },
  { value: BookCategory.BUSINESS, label: BookCategory.BUSINESS },
  { value: BookCategory.HISTORY, label: BookCategory.HISTORY },
  { value: BookCategory.DRAMA, label: BookCategory.DRAMA },
  { value: BookCategory.FANTASY, label: BookCategory.FANTASY },
  {
    value: BookCategory.SELF_DEVELOPMENT,
    label: BookCategory.SELF_DEVELOPMENT
  }
];

export default function UploadTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState(CategoryOptions[0]);

  const [isUpdating, setIsUpdating] = useState(false);

  const { AlertModal, showAlert } = useAlertModal();

  // handle image upload
  const [image, setImage] = useState<File | null | undefined>();
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<BookUploadInputs>();

  const onSubmit: SubmitHandler<BookUploadInputs> = async (data) => {
    // upload image to firebase and get url
    setIsUpdating(true);

    try {
      // gather formData
      const bookData = {
        ...data,
        bookImg: '',
        category: selectedCategory.value
      };

      // create book => api
      const res = await createBook(bookData);

      // get id from res and category value => get cover url
      const imageData = {
        id: res.id,
        file: image as File,
        category: res.category
      };

      const bookImgUrl = await uploadBookCover(imageData);

      // update book data with cover url
      const updatedBook = await updateBookById(res.id as any, {
        bookImg: bookImgUrl
      });

      // clear form
      reset();
      setImage(undefined);
      if (imageRef.current) imageRef.current.value = '';

      showAlert({
        title: 'Uploaded!',
        subtitle: 'Book has been uploaded',
        type: AlertType.SUCCESS,
        onModalClose: () => handleRefreshRequest()
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        showAlert({
          title: 'Error',
          subtitle: err.response?.data.error || 'An unknown error has occurred',
          type: AlertType.ERROR
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (image) {
      // remove error message if image is selected
      setError('bookImg', {
        type: 'manual',
        message: ''
      });
      return;
    } else if (image === null) {
      // reset input value if image is removed
      setError('bookImg', {
        type: 'custom',
        message: 'Book cover is required'
      });
      return;
    }
  }, [image, setError]);

  return (
    <>
      <AlertModal />

      <AdminTabLayout title='Book Upload'>
        <div className='bg-alt-secondary rounded-xl h-full w-full p-4 flex-1'>
          <form className='space-y-6 h-full flex flex-col flex-grow'>
            <div className='flex gap-8 items-start'>
              {/* book cover */}

              <div className='flex flex-col justify-center'>
                {image ? (
                  <div className='relative overflow-clip '>
                    <div className='w-64 h-fit'>
                      <label htmlFor='bookImg'>
                        <img
                          src={URL.createObjectURL(image)}
                          alt='book cover'
                          className='aspect-auto w-full rounded-md object-cover cursor-pointer'
                        />
                      </label>
                      <div className=' w-full text-center mt-1 text-black text-opacity-60'>
                        (click to change image)
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setImage(null);
                        if (imageRef.current) {
                          imageRef.current.value = '';
                        }
                      }}
                      className='absolute top-2 right-2'
                    >
                      <img
                        src='/icon/fail.png'
                        alt='close icon'
                        className='w-6 h-6 cursor-pointer'
                      />
                    </button>
                  </div>
                ) : (
                  <label htmlFor='bookImg'>
                    <div
                      className='
                      text-primary font-medium whitespace-nowrap 
                      rounded-lg bg-white p-2 cursor-pointer
                      h-72 w-64 flex flex-col justify-center items-center

                    '
                    >
                      <img
                        src='/icon/admin-sidebar/upload.svg'
                        alt='upload icon'
                        className='w-12 h-12'
                      />
                      <p className='text-primary'>Upload Your Image</p>
                    </div>
                  </label>
                )}
                {errors.bookImg && (
                  <p className='bg-red-500 text-white rounded-full w-fit px-2 mx-auto mt-2 text-sm text-center'>
                    {errors.bookImg.message}
                  </p>
                )}

                <h1 className='mt-2 text-center text-primary text-xl font-bold'>
                  Book cover
                </h1>
                <input
                  {...register('bookImg', {
                    validate: (value) => {
                      if (!image) return 'Book cover is required';

                      const validTypes = [
                        'image/jpeg',
                        'image/png',
                        'image/jpg'
                      ];

                      if (!validTypes.includes(image.type)) {
                        return 'Only JPEG, PNG, JPG are valid.';
                      }

                      return true;
                    }
                  })}
                  ref={imageRef}
                  name='bookImg'
                  id='bookImg'
                  type='file'
                  className='
                  col-span-3 p-1
                  w-full bg-transparent
                  border-b border-primary
                  hidden
                '
                  onChange={handleImageUpload}
                  accept='image/*'
                  disabled={isUpdating}
                />
              </div>

              <div className='w-full space-y-6 mt-4'>
                {/* book title */}
                <div className='grid gap-4 grid-cols-4'>
                  <div>
                    <label
                      htmlFor='title'
                      className='text-primary font-medium whitespace-nowrap'
                    >
                      Book Title
                      <RequiredIcon />
                    </label>
                    {errors.title && (
                      <p className='bg-red-500 text-white rounded-full w-fit px-2 text-sm mt-1'>
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <input
                    type='text'
                    className='
                col-span-3 p-1
                w-full bg-transparent
                border-b border-primary
              '
                    {...register('title', { required: 'Title is required' })}
                  />
                </div>

                {/* book author */}
                <div className='grid gap-4 grid-cols-4'>
                  <div>
                    <label
                      htmlFor='author'
                      className='text-primary font-medium whitespace-nowrap'
                    >
                      Author
                      <RequiredIcon />
                    </label>
                    {errors.author && (
                      <p className='bg-red-500 text-white rounded-full w-fit px-2 mt-1 text-sm transition-all duration-300'>
                        {errors.author.message}
                      </p>
                    )}
                  </div>
                  <input
                    type='text'
                    className='
                    col-span-3 p-1
                    w-full bg-transparent
                    border-b border-primary
                  '
                    {...register('author', { required: 'Author is required' })}
                    disabled={isUpdating}
                  />
                </div>

                {/* book category */}
                <CustomListDropDown
                  options={CategoryOptions}
                  selectedOption={selectedCategory}
                  setSelectedOption={setSelectedCategory}
                  label='Category'
                  disabled={isUpdating}
                />

                {/* book description */}
                <div className='grid gap-4 grid-cols-4'>
                  <div className='flex flex-wrap gap-2'>
                    <label
                      htmlFor='description'
                      className='text-primary font-medium '
                    >
                      Description
                    </label>
                    <span className='text-primary text-opacity-70'>
                      (optional)
                    </span>
                  </div>
                  <textarea
                    className='
                    col-span-3 p-1
                    w-full bg-transparent
                    border-b border-primary
                  '
                    {...register('description')}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>

            <div className='flex-1'></div>

            {/* submit */}
            <div className=' flex justify-center'>
              <button
                type='submit'
                className='
                w-56
                bg-primary text-white font-medium
                px-4 py-4 rounded-lg
                hover:bg-primary-dark
              '
                onClick={handleSubmit(onSubmit)}
              >
                {isUpdating ? (
                  <div className='flex justify-center items-center gap-2'>
                    <SpinningLoadingSvg className='w-6 h-6 text-white' />
                    Uploading...
                  </div>
                ) : (
                  <span>Upload</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </AdminTabLayout>
    </>
  );
}
