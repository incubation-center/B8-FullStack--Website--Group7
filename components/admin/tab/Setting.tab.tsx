import { useState } from 'react';

import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { useTheme } from 'next-themes';

import { themes } from '@/utils/enum';

export default function SettingTab() {
  const [systemName, setSystemName] = useState('Kjey Book');

  const { theme, setTheme } = useTheme();

  return (
    <AdminTabLayout title='Setting'>
      <div className='max-w-[1000px] mx-auto space-y-6 text-primary'>
        <Section title='General Setting'>
          <SubSection title='System Name'>
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
          <SubSection title='themes'>
            <div className='flex gap-2'>
              {themes.map((theme) => {
                return (
                  <div
                    key={theme.name}
                    className='p-2 px-4 rounded-full cursor-pointer'
                    style={{
                      backgroundColor: theme.primary,
                      color: theme.secondary,
                    }}
                    onClick={() => setTheme(theme.name)}
                  >
                    <div>{theme.title}</div>
                  </div>
                );
              })}
            </div>
          </SubSection>
        </Section>

        <Section title='Security & Policy'>
          <SubSection
            title='Password'
            action={{
              label: 'Change',
              onClick: () => {
                console.log('Change Password');
              },
            }}
          >
            <div className='flex items-center space-x-2 text-primary text-opacity-70'>
              The admin able to change the system credentials
            </div>
          </SubSection>

          <SubSection
            title='Activity log'
            action={{
              label: 'View',
              onClick: () => {
                console.log('View Activity Log');
              },
            }}
          >
            <div className='flex items-center space-x-2 text-primary text-opacity-70'>
              The admin able to see the login activity in the system
            </div>
          </SubSection>
        </Section>
      </div>
    </AdminTabLayout>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='mb-4'>
      <h2 className='text-lg font-semibold mb-2 px-2 text-primary'>{title}</h2>
      <div className='bg-background rounded-lg p-4'>{children}</div>
    </div>
  );
};

const SubSection = ({
  title,
  action,
  children,
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
