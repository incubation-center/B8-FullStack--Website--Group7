import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

import { RequestData } from '@/dummydata';
import { AdminTab } from '@/utils/enum';
import { useState } from 'react';
import useModal from '@/components/Modals/useModal';
import { BookRequest } from '@/types';
import RequestDetail from '@/components/Modals/RequestDetail';

export default function ActiveTab() {
  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout title='Active Request'>
        <RequestTable
          useIn={AdminTab.ACTIVE_REQUEST}
          data={RequestData.filter((request) => request.status === 'APPROVED')}
          actions={[
            {
              label: 'View',
              bgColor: 'bg-alt-secondary',
              onClick: (request) => {
                setViewRequest(request);
                toggle();
              }
            },
            {
              label: 'Receive',
              bgColor: 'bg-success text-white',
              onClick: (request) => console.log(request)
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
