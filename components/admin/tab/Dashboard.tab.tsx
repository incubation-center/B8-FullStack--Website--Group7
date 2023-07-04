/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
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

export default function DashboardTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const requestData = useRecoilValue(AdminAllRequestAtom);
  const requestCount = useRecoilValue(AdminAllRequestCountAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <AdminTabLayout
      title={formatEnumValue(AdminTab.DASHBOARD)}
      handleRefresh={handleRefreshRequest}
    >
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      {/* Request Data */}
      <div
        className='
          gap-4
          lg:grid grid-cols-3 
          flex flex-wrap
          w-full max-w-[1000px] mx-auto
        '
      >
        <RequestDataShow
          title='Total Incoming'
          icon='/icon/admin-sidebar/incoming-admin.svg'
          value={requestCount.PENDING}
        />

        <RequestDataShow
          title='Total Active'
          icon='/icon/admin-sidebar/active-admin.svg'
          value={requestCount.ACCEPTED}
        />

        <RequestDataShow
          title='Total Archived'
          icon='/icon/admin-sidebar/archived-admin.svg'
          value={requestCount.ARCHIVED}
        />
      </div>

      {/* Recent Renter*/}
      <div className='w-full mt-4'>
        <h1 className='text-primary text-xl font-bold'>Recent renter</h1>

        <RenterTable
          data={requestData
            .filter(
              (request) =>
                request.isApproved && request.status === RequestStatus.ACHIEVED
            )
            .slice(0, 5)}
          actions={[
            {
              label: 'View',
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
  icon,
  value
}: {
  title: string;
  icon: string;
  value: {
    total: number;
    today: number;
    yesterday: number;
  };
}) => {
  return (
    <div className='rounded-lg bg-alt-secondary p-4 h-fit min-h-[180px] flex flex-col flex-grow whitespace-nowrap'>
      <h1 className='text-lg text-primary font-bold'>{title}</h1>
      <div className='flex flex-1 h-full items-center justify-between py-4 mb-2 border-b-2'>
        <h1 className='text-5xl text-primary font-extrabold'>{value.total}</h1>

        <img src={icon} alt={title} className='h-6 md:h-8 lg:h-10' />
      </div>
      <div className='flex justify-between text-primary'>
        <div>Today {value.today}</div>
        <div>Yesterday {value.yesterday}</div>
      </div>
    </div>
  );
};
