import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

// import { RequestData } from '@/dummydata';
import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { useState } from 'react';
import { BookRequest } from '@/types';
import { AdminTab } from '@/utils/enum';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';
import useConfirmModal from '@/components/Modals/useCofirm';
import useConfirmRejectModal from '@/components/Modals/useReject';

export default function IncomingTab({}) {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();
  const { ConfirmModal, showConfirmModal } = useConfirmModal();
  const { ConfirmRejectModal, showRejectModal } = useConfirmRejectModal();

  const handleApproveRequest = (request: BookRequest) => {
    console.log(request);
  };

  const handleRejectRequest = (reason: string, request: BookRequest) => {
    console.log(reason, request);
  };

  return (
    <>
      <ConfirmModal />
      <ConfirmRejectModal />

      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout title='Incoming Request'>
        <RequestTable
          useIn={AdminTab.INCOMING_REQUEST}
          data={requestData.filter((request) => request.status === 'PENDING')}
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
              onClick: (request) => {
                showConfirmModal({
                  title: 'Approve Request',
                  subtitle: 'Are you sure you want to approve this request?',
                  onConfirm: () => handleApproveRequest(request)
                });
              }
            },
            {
              label: 'Reject',
              bgColor: 'bg-danger text-white',
              onClick: (request) => {
                showRejectModal({
                  title: 'Reject Request',
                  subtitle: 'Are you sure you want to reject this request?',
                  onConfirm: (reason) => handleRejectRequest(reason, request)
                });
              }
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
