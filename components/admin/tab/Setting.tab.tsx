import { useState } from 'react';

import { HomePageTab } from '@/utils/enum';
import LocaleSwitching from '@/components/LocaleSwitching';
import ThemeSwitching from '@/components/ThemeSwitching';
import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { useTranslation } from 'next-i18next';
import ChangePassword from '@/components/Modals/ChangePassword';
import { useRecoilState } from 'recoil';
import { AuthAtom } from '@/service/recoil';
import useAlertModal from '@/components/Modals/Alert';
import useModal from '@/components/Modals/useModal';
import { User } from '@/types';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import useConfirmModal from '@/components/Modals/useCofirm';

export default function SettingTab() {
  const { t } = useTranslation('admin');
  const router = useRouter();

  const [authStore, setAuthStore] = useRecoilState(AuthAtom);

  const [systemName, setSystemName] = useState('Kjey Book');

  const { showAlert, AlertModal } = useAlertModal();
  const { ConfirmModal, showConfirmModal } = useConfirmModal();

  const {
    toggle: toggleChangePasswordModal,
    close: closeChangePasswordModal,
    ModalWrapper: ChangePasswordModalWrapper
  } = useModal();

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    setAuthStore({
      user: null,
      isAdmin: false,
      isLoggedIn: false,
      isFetched: true
    });

    router.push(`/?tab=${HomePageTab.HOME}`);
  };

  return (
    <>
      <AlertModal />
      <ConfirmModal />

      <ChangePasswordModalWrapper>
        <ChangePassword
          close={closeChangePasswordModal}
          showAlert={showAlert}
          userInfo={authStore.user as User}
        />
      </ChangePasswordModalWrapper>

      <AdminTabLayout title={t('tab.setting')}>
        <div className='max-w-[1000px] mx-auto space-y-6 text-primary'>
          <Section title={t('setting-tab.general-setting')}>
            <SubSection title={t('setting-tab.system-name')}>
              <input
                type='text'
                className='
                  w-full bg-transparent 
                  text-xl 
                '
                placeholder='System Name'
                value={systemName}
                // onChange={(e) => setSystemName(e.target.value)}
                readOnly
              />
            </SubSection>

            {/* color themes */}
            <SubSection title={t('setting-tab.personal-setting')}>
              <div
                className='
                
                flex gap-2 p-2 rounded-lg 
              '
              >
                <LocaleSwitching
                  className='bg-primary bg-opacity-20 text-t-primary fill-primary shadow-sm'
                  position='bottom'
                />
                <ThemeSwitching
                  className='bg-primary bg-opacity-20 text-t-primary fill-primary shadow-sm'
                  position='bottom'
                />
              </div>
            </SubSection>
          </Section>

          <Section title={t('setting-tab.security-policy')}>
            <SubSection
              title={t('setting-tab.password')}
              action={{
                label: t('setting-tab.change-btn'),
                onClick: () => toggleChangePasswordModal()
              }}
            >
              <div className='flex items-center space-x-2 text-primary text-opacity-70'>
                {t('setting-tab.password-placeholder')}
              </div>
            </SubSection>
          </Section>
          <div className='w-full text-right'>
            <button
              onClick={() => {
                showConfirmModal({
                  title: t('logout-modal.logout'),
                  subtitle: t('logout-modal.logout-text'),
                  onConfirm: () => {
                    handleLogout();
                  }
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
              {t('btns.logout-btn')}
            </button>
          </div>
        </div>
      </AdminTabLayout>
    </>
  );
}

const Section = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='mb-4'>
      <h2 className='text-lg font-semibold mb-2 px-2 text-primary'>{title}</h2>
      <div className='bg-alt-secondary bg-opacity-50 rounded-lg p-4'>
        {children}
      </div>
    </div>
  );
};

const SubSection = ({
  title,
  action,
  children
}: {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}) => {
  return (
    <div className='mb-4'>
      <div className='flex justify-between'>
        <h3 className='text-base font-semibold mb-1 text-primary '>{title}</h3>
        {action && (
          <button
            className='text-sm  text-primary hover:bg-secondary hover:bg-opacity-30 px-2 rounded-full '
            onClick={() => action.onClick()}
          >
            {action.label}
          </button>
        )}
      </div>
      <div className='px-4 mb-2 '>{children}</div>

      <div className='border-b border-primary mx-2'></div>
    </div>
  );
};
