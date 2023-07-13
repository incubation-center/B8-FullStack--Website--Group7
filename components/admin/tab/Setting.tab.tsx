import { useState } from 'react';

import { useTheme } from 'next-themes';

import { themes } from '@/utils/enum';
import LocaleSwitching from '@/components/LocaleSwitching';
import ThemeSwitching from '@/components/ThemeSwitching';
import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { useTranslation } from 'next-i18next';

export default function SettingTab() {
  const { t } = useTranslation('admin');

  const [systemName, setSystemName] = useState('Kjey Book');

  return (
    <AdminTabLayout title={t('tab.setting')}>
      <div className='max-w-[1000px] mx-auto space-y-6 text-primary'>
        <Section title={t('setting-tab.general-setting')}>
          <SubSection title={t('setting-tab.system-name')}>
            <input
              type='text'
              className='
                w-full bg-transparent 
              '
              placeholder='System Name'
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
            />
          </SubSection>

          {/* color themes */}
          <SubSection title='Personal setting'>
            <div
              className='
                
                flex gap-2 p-2 rounded-lg 
              '
            >
              <LocaleSwitching
                className='bg-opacity-50 text-t-primary fill-primary shadow-sm'
                position='bottom'
              />
              <ThemeSwitching
                className='bg-opacity-50 text-t-primary fill-primary shadow-sm'
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
              onClick: () => {
                console.log('Change Password');
              }
            }}
          >
            <div className='flex items-center space-x-2 text-primary text-opacity-70'>
              {t('setting-tab.password-placeholder')}
            </div>
          </SubSection>

          <SubSection
            title={t('setting-tab.activity-log')}
            action={{
              label: t('setting-tab.view-btn'),
              onClick: () => {
                console.log('View Activity Log');
              }
            }}
          >
            <div className='flex items-center space-x-2 text-primary text-opacity-70'>
              {t('setting-tab.activity-log-placeholder')}
            </div>
          </SubSection>
        </Section>
      </div>
    </AdminTabLayout>
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
