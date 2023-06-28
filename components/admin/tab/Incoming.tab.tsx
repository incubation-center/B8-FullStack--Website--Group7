import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

import { RequestData } from '@/dummydata';
import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { useState } from 'react';
import { BookRequest } from '@/types';
import { AdminTab } from '@/utils/enum';

export default function IncomingTab({}) {
  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout title='Incoming Request'>
        <RequestTable
          useIn={AdminTab.INCOMING_REQUEST}
          data={RequestData.filter((request) => request.status === 'PENDING')}
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
              label: 'Approve',
              bgColor: 'bg-success text-white',
              onClick: (request) => console.log(request)
            },
            {
              label: 'Reject',
              bgColor: 'bg-danger text-white',
              onClick: (request) => console.log(request)
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
