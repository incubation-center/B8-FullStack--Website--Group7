import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

// import { RequestData } from '@/dummydata';
import { AdminTab } from '@/utils/enum';
import { useState } from 'react';
import useModal from '@/components/Modals/useModal';
import { BookRequest } from '@/types';
import RequestDetail from '@/components/Modals/RequestDetail';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';
import useConfirmModal from '@/components/Modals/useCofirm';

export default function ActiveTab() {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  const { ConfirmModal, showConfirmModal } = useConfirmModal();

  const handleReceiveBook = (request: BookRequest) => {
    console.log(request);
  };

  return (
    <>
      <ConfirmModal />

      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout title='Active Request'>
        <RequestTable
          useIn={AdminTab.ACTIVE_REQUEST}
          data={requestData.filter((request) => request.status === 'APPROVED')}
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
              onClick: (request) => {
                showConfirmModal({
                  title: 'Receive Book',
                  subtitle: 'Are you sure you want to receive this book?',
                  onConfirm: () => handleReceiveBook(request)
                });
              }
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
