/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from "react";

import useModal from "@/components/Modals/useModal";
import EditUserInfo from "../Modals/EditUserInfo";

import useAlertModal from "@/components/Modals/Alert";
import ProfileUploadSvg from "../icon/ProfileUploadSvg";

import { AnimatePresence, motion } from "framer-motion";

import SpinningLoadingSvg from "../icon/SpinningLoadingSvg";
import ChangePassword from "../Modals/ChangePassword";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthAtom } from "@/service/recoil";
import { User } from "@/types";
import NotLoggedInLayout from "../layout/NotLoggedInLayout";
import { handleFallBackProfileImage } from "@/utils/function";
import { deleteCookie } from "cookies-next";
import { uploadImage } from "@/service/firebase";
import { updateUserInfo } from "@/service/api/user";
import useConfirmModal from "../Modals/useCofirm";
import { HomePageTab } from "@/utils/enum";

interface ProfileUploadInputs {}

export default function ProfileTab() {
  const [authStore, setAuthStore] = useRecoilState(AuthAtom);

  // handle image upload
  const [image, setImage] = useState<File | null | undefined>();
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setIsUpdatingImage(true);
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setIsUpdatingImage(false);
    imageRef.current && (imageRef.current.value = "");
  };

  const handleSaveImage = async () => {
    setIsUploadingImage(true);

    try {
      const res = await uploadImage(
        image as File,
        authStore.user?.userId as string
      );

      if (res) {
        // update user image
        const result = await updateUserInfo(authStore.user?.userId as string, {
          profileImg: res,
        });

        if (result) {
          setAuthStore({
            ...authStore,
            user: {
              ...(authStore.user as User),
              profileImg: res,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsUpdatingImage(false);
    setIsUploadingImage(false);
    setImage(null);
    imageRef.current && (imageRef.current.value = "");
  };

  // handle logout
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    setAuthStore({
      user: null,
      isAdmin: false,
      isLoggedIn: false,
      isFetched: true,
    });

    window.location.href = `/?tab=${HomePageTab.HOME}`;
  };

  const { showAlert, AlertModal } = useAlertModal();
  const { ConfirmModal, showConfirmModal } = useConfirmModal();

  const {
    toggle: toggleInformationModal,
    close: closeInformationModal,
    ModalWrapper: EditInformationWrapper,
  } = useModal();

  const {
    toggle: toggleChangePasswordModal,
    close: closeChangePasswordModal,
    ModalWrapper: ChangePasswordModalWrapper,
  } = useModal();

  return (
    <NotLoggedInLayout>
      {authStore.user && (
        <div className='p-4'>
          <AlertModal />
          <ConfirmModal />

          <EditInformationWrapper>
            <EditUserInfo
              userInfo={authStore.user as User}
              close={closeInformationModal}
              showAlert={showAlert}
            />
          </EditInformationWrapper>

          <ChangePasswordModalWrapper>
            <ChangePassword
              close={closeChangePasswordModal}
              showAlert={showAlert}
              userInfo={authStore.user as User}
            />
          </ChangePasswordModalWrapper>

          <motion.div
            animate={{ height: "auto" }}
            className='w-full h-full overflow-y-scroll lg:w-3/5 mx-auto'
          >
            {/* user image profile */}
            <div className='flex flex-col justify-center items-center transition-all duration-300'>
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
                disabled={isUploadingImage}
              />

              <div className='w-40 h-40 mx-auto relative rounded-full'>
                <div className='h-full w-full overflow-clip rounded-full'>
                  <AnimatePresence mode='sync'>
                    {isUpdatingImage && image ? (
                      <motion.img
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        key='new image'
                        src={URL.createObjectURL(image)}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <motion.img
                        key='old image'
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        src={handleFallBackProfileImage(authStore.user)}
                        className='w-full h-full object-cover'
                      />
                    )}
                  </AnimatePresence>
                </div>

                <label htmlFor='profileImg'>
                  <ProfileUploadSvg
                    className={`absolute bottom-0 right-0 w-10 h-10 bg-white fill-primary rounded-full p-2 ${
                      isUploadingImage ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    color='var(--icon-color)'
                  />
                </label>
              </div>

              {isUpdatingImage && (
                <div className='w-fit h-10 flex gap-2 overflow-hidden transition-all duration-300 mt-5'>
                  {!isUploadingImage && (
                    <button
                      onClick={handleCancelImage}
                      className='w-28 bg-danger text-white px-4 py-2 rounded-lg'
                    >
                      cancel
                    </button>
                  )}
                  <motion.button
                    onClick={handleSaveImage}
                    className={`
                ${isUploadingImage ? "w-64" : "w-28"} 
                bg-primary text-white px-4 py-2 rounded-lg
                  transition-all duration-300
                 `}
                    disabled={isUploadingImage}
                  >
                    <AnimatePresence mode='wait'>
                      {!isUploadingImage ? (
                        <motion.div exit={{ opacity: 0 }} key='save'>
                          Save
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            y: [1, 0],
                          }}
                          exit={{ opacity: 0 }}
                          className='flex gap-2 items-center justify-center'
                        >
                          <div>Uploading</div>

                          <SpinningLoadingSvg className='w-5 h-5 text-background' />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              )}
            </div>

            {/* personal information */}
            <div className='relative justify-start w-full  mx-auto mt-5'>
              <h1 className='font-extrabold text-primary text-start text-2xl md:text-2xl'>
                Personal Information
              </h1>
              <div className='w-full my-5 p-5 h-fit flex flex-col justify-center items-end bg-[#EBEBEB] rounded-xl relative'>
                <div className='w-full flex flex-grow flex-wrap gap-4'>
                  <div
                    className=' 
                text-primary text-start text-lg 
                  col-span-2 w-full
                '
                  >
                    <div className='font-extrabold text-lg md:text-xl '>
                      Username
                    </div>
                    <div className='mt-2 text-lg md:text-lg'>
                      {authStore.user.username}
                    </div>
                  </div>
                  <div className=' text-primary text-lg flex-1   '>
                    <div className=' font-extrabold text-lg md:text-lg'>
                      Phone Number
                    </div>
                    <div className='mt-2 text-lg md:text-lg'>
                      {authStore.user.phoneNumber}
                    </div>
                  </div>
                  <div className=' text-primary text-start text-xl  flex-1  '>
                    <div className=' font-extrabold text-lg md:text-lg'>
                      Email
                    </div>
                    <div className='mt-2 text-lg md:text-lg'>
                      {authStore.user.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleInformationModal()}
                  className='
                bg-secondary text-white font-light rounded-lg py-1 px-7 
                transition-colors duration-300 box-border border-2 border-secondary hover:border-white
                md:absolute md:top-5 md:right-5
                mt-5 md:mt-0 w-full md:w-fit
              
              '
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Privacy setting */}
            <div className='relative justify-start w-full  mx-auto mt-5'>
              <h1 className='font-extrabold text-primary text-start text-2xl md:text-2xl'>
                Privacy Setting
              </h1>
              <div className='w-full my-5 p-5 h-fit flex justify-between items-center flex-wrap bg-[#EBEBEB] rounded-xl  '>
                <div
                  className=' 
                text-primary text-start text-lg 
                 flex-1 w-full
                '
                >
                  <div className='font-extrabold text-lg md:text-lg'>
                    Password
                  </div>
                </div>

                <button
                  onClick={() => toggleChangePasswordModal()}
                  className='
                bg-secondary text-white font-light rounded-lg py-1 px-7 
                transition-colors duration-300 box-border border-2 border-secondary hover:border-white
                w-full md:w-fit
                mt-2 md:mt-0
              '
                >
                  Change Password
                </button>
              </div>
            </div>

            <div className='w-full text-right'>
              <button
                onClick={() => {
                  showConfirmModal({
                    title: "Logout",
                    subtitle: "Are you sure you want to logout?",
                    onConfirm: () => {
                      handleLogout();
                    },
                  });
                }}
                className='
                bg-danger text-white font-light rounded-lg py-2 px-7 
                w-full md:w-fit
                mt-2 md:mt-0
                box-border border-2 border-danger hover:border-white
                transition-colors duration-300
              '
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </NotLoggedInLayout>
  );
}
