import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState, Fragment, useEffect, useRef } from 'react';
import { User } from '@/types';
import useModal from '@/components/Modals/useModal';
import EditUserInfo from '../Modals/EditUserInfo';
import { useRouter } from 'next/router';
import useAlertModal from '@/components/Modals/Alert';

interface ProfileUploadInputs extends User {}

export default function ProfileTab() {
    // handle image upload
  const [image, setImage] = useState<File | null | undefined>();
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };
  const {
    register,
    formState: { errors }
  } = useForm<ProfileUploadInputs>();
  const onSubmit: SubmitHandler<ProfileUploadInputs> = (data) => {
    // upload image to firebase and get url
    let profileImgUrl = 'url';
  };
  const router = useRouter();

  const { open, close, ModalWrapper } = useModal();

  const { showAlert, AlertModal } = useAlertModal();


//   const { toggle, ModalWrapper } = useModal();
  const {
    toggle: changeInformationToggle, 
    ModalWrapper: changeInformationWrapper
  } = useModal();
  const {
    toggle: changePasswordToggle, 
    ModalWrapper: changePasswordWrapper
  } = useModal();

  return (
    <>
    <AlertModal />

      <ModalWrapper>
        <EditUserInfo close={close} showAlert={showAlert} />
      </ModalWrapper>
        <div className='w-full h-full overflow-y-scroll'>
          <div className="flex flex-col justify-center ">
            {image ? (
                <div className='relative overflow-clip '>
                <div className='w-64 h-fit'>
                    <label htmlFor='profileImg'>
                    <img
                        src={URL.createObjectURL(image)}
                        className='aspect-auto w-full rounded-full object-cover cursor-pointer'
                    />
                    </label>
                </div>
                </div>
            ) : (
                <label htmlFor='profileImg' className='justify-center items-center mx-auto'>
                <div
                    className='
                    text-primary font-medium whitespace-nowrap 
                    rounded-full bg-white p-2 cursor-pointer
                    w-[170px] h-[170px] flex flex-col justify-center items-center'
                    >
                    <img
                    src='../icon/profileUpload.svg'
                    alt='upload icon'
                    className='w-8 h-8 justify-center items-center'
                    />
                    <p className='text-primary text-xs mt-4'>Upload Your Profile</p>
                </div>
                </label>
            )}    
            <input
              {...register('profileImg', {
              validate: (value) => {
                if (!image) return 'Profile Image is required';
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                  if (!validTypes.includes(image.type)) {
                  return 'Only JPEG, PNG, JPG are valid.';
                  }
                  return true;
                }
                })}
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
                onChange={handleImageUpload}
                accept='image/*'
            />
          </div>
        <div className='relative justify-start w-full lg:w-3/5 mx-auto mt-5'>
            <h1 className='font-extrabold text-primary text-start text-xl md:text-2xl'
            >Personal Information</h1>
            <div className='w-full mt-5 h-[300px] justify-center bg-[#EBEBEB] rounded-xl'>
            <button
                onClick={(request) => open()} 
                className='bg-secondary text-white font-light rounded-lg py-1 px-7 mt-7 absolute right-8 transition-colors box-border border-2 border-alt-secondary hover:border-action'>
                Edit
            </button>
            <div className='ml-16 text-primary text-start text-lg md:text-xl md:space-y-5
                '>
                <h5 className='pt-10 font-extrabold'>
                Username
                </h5>
                <h5>
                Kanhchana Kao
                </h5>
            </div>
            <div className=' text-primary text-lg absolute left-2/4 md:text-xl md:space-y-5 '>
                <h5 className='pt-6 font-extrabold'>
                    Phone Number
                </h5>
                <h5>
                    +855 12345678
                </h5>
            </div>
            <div className='ml-16 text-primary text-start text-lg md:text-xl md:space-y-5'>
                <h5 className='pt-6 font-extrabold'>
                Email
                </h5>
                <h5>
                kanhchana19@kit.edu.kh
                </h5>
            </div>
            </div>
        </div>
        <div className='mt-5 relative justify-start w-full lg:w-3/5 mx-auto'>
            <h1 className='font-extrabold text-primary text-start text-xl md:text-2xl'
            >Privacy Setting</h1>
            <div className='w-full mt-5 h-[70px] justify-center bg-[#EBEBEB] rounded-xl'>
            <button 
              className='bg-secondary text-white font-light rounded-lg py-1 px-7 mt-4 absolute right-8 transition-colors box-border border-2 border-alt-secondary hover:border-action'>
                Edit
            </button>
            <h5 className='
                font-extrabold ml-16 pt-6 text-primary text-start text-lg md:text-xl md:space-y-5 '>
                Password
                </h5>
            </div>
        </div>
        </div>
    </>
  );
}