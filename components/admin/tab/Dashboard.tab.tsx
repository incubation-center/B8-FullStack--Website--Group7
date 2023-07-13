/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Image from 'next/image';

import AdminTabLayout from '@/components/layout/AdminTabLayout';
import { AdminTab } from '@/utils/enum';
import { formatEnumValue } from '@/utils/function';
import RenterTable from '../table/RenterTable';

import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { BookRequest, RequestStatus } from '@/types';

import { useRecoilValue } from 'recoil';
import {
  AdminAllRequestAtom,
  AdminAllRequestCountAtom
} from '@/service/recoil/admin';
import IncomingSvg from '@/components/icon/admin-sidebar/IncomingSvg';
import ActiveSvg from '@/components/icon/admin-sidebar/ActiveSvg';
import ArchivedSvg from '@/components/icon/admin-sidebar/ArchivedSvg';
import RenterSvg from '@/components/icon/admin-sidebar/RenterSvg';
import { useTranslation } from 'next-i18next';

export default function DashboardTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const { t } = useTranslation('admin');

  const requestData = useRecoilValue(AdminAllRequestAtom);
  const requestCount = useRecoilValue(AdminAllRequestCountAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <AdminTabLayout
      title={t('tab.dashboard', formatEnumValue(AdminTab.DASHBOARD))}
      handleRefresh={handleRefreshRequest}
    >
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      {/* Request Data */}
      <div
        className='
          gap-4
          lg:grid grid-cols-4 
          flex flex-wrap
          w-full max-w-[1000px] mx-auto 
        '
      >
        <RequestDataShow
          title={t('dashboard-tab.total-incoming')}
          tab={AdminTab.INCOMING_REQUEST}
          value={requestCount.PENDING}
        />

        <RequestDataShow
          title={t('dashboard-tab.total-active')}
          tab={AdminTab.ACTIVE_REQUEST}
          value={requestCount.ACCEPTED}
        />

        <RequestDataShow
          title={t('dashboard-tab.total-renter')}
          tab={AdminTab.RENTER}
          value={requestCount.RENTER}
        />

        <RequestDataShow
          title={t('dashboard-tab.total-archived')}
          tab={AdminTab.ARCHIVED_REQUEST}
          value={requestCount.ARCHIVED}
        />
      </div>

      {/* Recent Renter*/}
      <div className='w-full mt-5'>
        <h1 className='text-primary text-2xl font-bold mb-5'>
          {t('dashboard-tab.recent-renter')}
        </h1>

        <RenterTable
          data={requestData
            .filter(
              (request) =>
                request.isApproved && request.status === RequestStatus.ACHIEVED
            )
            .slice(0, 5)}
          actions={[
            {
              label: t('btns.view-btn'),
              onClick: (request) => {
                setViewRequest(request);
                toggle();
              },
              bgColor: 'bg-alt-secondary'
            }
          ]}
        />
      </div>
    </AdminTabLayout>
  );
}

const RequestDataShow = ({
  title,
  tab,
  value
}: {
  title: string;
  tab: AdminTab;
  value: {
    total: number;
    today: number;
    yesterday: number;
  };
}) => {
  const { t } = useTranslation('admin');

  return (
    <div className='rounded-lg bg-primary p-4 h-fit min-h-[180px] flex flex-col flex-grow whitespace-nowrap'>
      <h1 className='text-lg text-alt-secondary font-bold'>{title}</h1>
      <div className='flex flex-1 h-full items-center justify-between py-4 mb-2 border-b-2'>
        <h1 className='text-5xl text-alt-secondary font-extrabold'>
          {value.total}
        </h1>

        {/* <img src={icon} alt={title} className='h-6 md:h-8 lg:h-10' /> */}
        <NavbarIcon tab={tab} />
      </div>
      <div className='flex justify-between text-alt-secondary'>
        <div>
          {t('dashboard-tab.today')} {value.today}
        </div>
        <div>
          {t('dashboard-tab.yesterday')} {value.yesterday}
        </div>
      </div>
    </div>
  );
};

function NavbarIcon({ tab }: { tab: AdminTab }) {
  switch (tab) {
    case AdminTab.INCOMING_REQUEST:
      return (
        <IncomingSvg
          className={`h-6 md:h-8 lg:h-10 w-fit fill-alt-secondary  delay-300
          transition-all 

          `}
        />
      );
    case AdminTab.ACTIVE_REQUEST:
      return (
        <ActiveSvg
          className={`h-6 md:h-8 lg:h-10 w-fit fill-alt-secondary  delay-300
          transition-all 
        `}
        />
      );
    case AdminTab.ARCHIVED_REQUEST:
      return (
        <ArchivedSvg
          className={`h-6 md:h-8 lg:h-10 w-fit fill-alt-secondary delay-300
          transition-all 
        `}
        />
      );
    case AdminTab.RENTER:
      return (
        <RenterSvg
          className={`h-6 md:h-8 lg:h-10 w-fit fill-alt-secondary stroke-alt-secondary delay-300
        transition-all 
      `}
        />
      );
  }

  return null;
}
