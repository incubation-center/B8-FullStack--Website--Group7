/* eslint-disable @next/next/no-img-element */

import { AdminTab } from '@/utils/enum';
import { formatEnumValue } from '@/utils/function';
import Link from 'next/link';
import DashboardSvg from '../icon/admin-sidebar/DashboardSvg';
import UploadSvg from '../icon/admin-sidebar/UploadSvg';
import BooksSvg from '../icon/admin-sidebar/BooksSvg';
import IncomingSvg from '../icon/admin-sidebar/IncomingSvg';
import ActiveSvg from '../icon/admin-sidebar/ActiveSvg';
import ArchivedSvg from '../icon/admin-sidebar/ArchivedSvg';
import RenterSvg from '../icon/admin-sidebar/RenterSvg';
import SettingSvg from '../icon/admin-sidebar/SettingSvg';
import { useRouter } from 'next/router';
import LocaleSwitching from '../LocaleSwitching';
import { useTranslation } from 'next-i18next';

export default function Navbar({
  currentTab,
  handlePageRouting
}: {
  currentTab: AdminTab;
  handlePageRouting: (tab: AdminTab) => void;
}) {
  const { locale } = useRouter();

  const { t } = useTranslation('admin');

  const handleTranslate = () => {
    switch (currentTab) {
      case AdminTab.DASHBOARD:
        return 'translate-y-0';
      case AdminTab.UPLOAD:
        return 'translate-y-12';
      case AdminTab.BOOKS:
        return 'translate-y-24';
      case AdminTab.INCOMING_REQUEST:
        return 'translate-y-[9rem]';
      case AdminTab.ACTIVE_REQUEST:
        return 'translate-y-[12rem]';
      case AdminTab.ARCHIVED_REQUEST:
        return 'translate-y-[15rem]';
      case AdminTab.RENTER:
        return 'translate-y-[18rem]';
      case AdminTab.SETTING:
        return 'translate-y-[21rem]';
    }
  };

  return (
    <div
      className='
        w-[300px]
        h-full flex flex-col
        bg-primary
        p-2 z-10
        overflow-y-auto
      '
    >
      {/* Logo */}
      <div className='w-full md:w-2/3  mb-8 mt-4 mx-auto'>
        <img
          src='/bootcamp-logo.png'
          alt=''
          className='
            h-fit w-full
          '
        />
      </div>

      {/* nav button */}
      <div className='relative px-2'>
        <>
          <NavbarBtn
            // title={formatEnumValue(AdminTab.DASHBOARD)}
            title={t('tab.dashboard', formatEnumValue(AdminTab.DASHBOARD))}
            tab={AdminTab.DASHBOARD}
            isCurrentTab={currentTab === AdminTab.DASHBOARD}
            onClick={() => handlePageRouting(AdminTab.DASHBOARD)}
          />

          <NavbarBtn
            title={t('tab.upload', formatEnumValue(AdminTab.UPLOAD))}
            tab={AdminTab.UPLOAD}
            isCurrentTab={currentTab === AdminTab.UPLOAD}
            onClick={() => handlePageRouting(AdminTab.UPLOAD)}
          />

          <NavbarBtn
            title={t('tab.books', formatEnumValue(AdminTab.BOOKS))}
            tab={AdminTab.BOOKS}
            isCurrentTab={currentTab === AdminTab.BOOKS}
            onClick={() => handlePageRouting(AdminTab.BOOKS)}
          />

          <NavbarBtn
            title={t(
              'tab.incoming-request',
              formatEnumValue(AdminTab.INCOMING_REQUEST)
            )}
            tab={AdminTab.INCOMING_REQUEST}
            isCurrentTab={currentTab === AdminTab.INCOMING_REQUEST}
            onClick={() => handlePageRouting(AdminTab.INCOMING_REQUEST)}
          />

          <NavbarBtn
            title={t(
              'tab.active-request',
              formatEnumValue(AdminTab.ACTIVE_REQUEST)
            )}
            tab={AdminTab.ACTIVE_REQUEST}
            isCurrentTab={currentTab === AdminTab.ACTIVE_REQUEST}
            onClick={() => handlePageRouting(AdminTab.ACTIVE_REQUEST)}
          />

          <NavbarBtn
            title={t(
              'tab.archived-request',
              formatEnumValue(AdminTab.ARCHIVED_REQUEST)
            )}
            tab={AdminTab.ARCHIVED_REQUEST}
            isCurrentTab={currentTab === AdminTab.ARCHIVED_REQUEST}
            onClick={() => handlePageRouting(AdminTab.ARCHIVED_REQUEST)}
          />

          <NavbarBtn
            title={t('tab.renter', formatEnumValue(AdminTab.RENTER))}
            tab={AdminTab.RENTER}
            isCurrentTab={currentTab === AdminTab.RENTER}
            onClick={() => handlePageRouting(AdminTab.RENTER)}
          />

          <NavbarBtn
            title={t('tab.setting', formatEnumValue(AdminTab.SETTING))}
            tab={AdminTab.SETTING}
            isCurrentTab={currentTab === AdminTab.SETTING}
            onClick={() => handlePageRouting(AdminTab.SETTING)}
          />
        </>

        {/* slide */}
        <div
          className={`
          ${handleTranslate()} transition-all duration-300
          absolute top-0 left-0 w-full h-12 bg-alt-secondary rounded-full
          `}
          style={{ zIndex: -1 }}
        ></div>
      </div>

      {/* admin */}
      <div className='flex-1'></div>

      <div className='mb-2 xl:mb-4'>
        <LocaleSwitching />
      </div>

      <Link
        href='/'
        className='
          w-full bg-action text-primary font-bold
          rounded-full p-2 px-4
          flex items-center justify-center cursor-pointer 
          hover:shadow-xl
        '
        locale={locale}
      >
        {t('tab.back-to-home-btn')}
      </Link>
    </div>
  );
}

function NavbarBtn({
  title,
  tab,
  isCurrentTab,
  onClick
}: {
  title: string;
  tab: AdminTab;
  isCurrentTab?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-start cursor-pointer rounded-full 
      ${isCurrentTab ? 'text-primary ' : 'text-secondary'}
      transition-all duration-300
      whitespace-nowrap 
      p-1 px-2
      h-12 z-10
      w-full
      `}
      onClick={onClick}
    >
      <NavbarIcon tab={tab} isCurrent={isCurrentTab as boolean} />
      <div className='ml-[12px] font-bold'>{title}</div>
    </div>
  );
}

function NavbarIcon({ tab, isCurrent }: { tab: AdminTab; isCurrent: boolean }) {
  switch (tab) {
    case AdminTab.DASHBOARD:
      return (
        <DashboardSvg
          className={`h-6 w-6 ${
            isCurrent
              ? 'fill-primary stroke-primary delay-300'
              : 'fill-secondary stroke-secondary'
          }
          transition-all 
          `}
        />
      );
    case AdminTab.UPLOAD:
      return (
        <UploadSvg
          className={`h-6 w-6 ${
            isCurrent ? 'fill-primary delay-300' : 'fill-secondary'
          }
          transition-all  
          
          `}
        />
      );
    case AdminTab.BOOKS:
      return (
        <BooksSvg
          className={`h-6 w-6 ${
            isCurrent ? 'fill-primary delay-300' : 'fill-secondary'
          }
            transition-all   
          `}
        />
      );
    case AdminTab.INCOMING_REQUEST:
      return (
        <IncomingSvg
          className={`h-6 w-6 ${
            isCurrent
              ? 'fill-primary stroke-primary delay-300'
              : 'fill-secondary stroke-secondary'
          }
          transition-all 

          `}
        />
      );
    case AdminTab.ACTIVE_REQUEST:
      return (
        <ActiveSvg
          className={`h-6 w-6 ${
            isCurrent ? 'fill-primary delay-300' : 'fill-secondary'
          }
          transition-all 
        `}
        />
      );
    case AdminTab.ARCHIVED_REQUEST:
      return (
        <ArchivedSvg
          className={`h-6 w-6 ${
            isCurrent ? 'fill-primary delay-300' : 'fill-secondary'
          }
          transition-all 
        `}
        />
      );
    case AdminTab.RENTER:
      return (
        <RenterSvg
          className={`h-6 w-6 ${
            isCurrent
              ? 'fill-primary stroke-primary delay-300'
              : 'fill-secondary stroke-secondary'
          }
        transition-all 
      `}
        />
      );

    case AdminTab.SETTING:
      return (
        <SettingSvg
          className={`h-6 w-6 ${
            isCurrent ? 'fill-primary delay-300' : 'fill-secondary'
          }
        transition-all 
      `}
        />
      );
  }

  return null;
}
