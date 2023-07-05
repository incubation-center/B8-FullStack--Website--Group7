import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

// import { RequestData } from '@/dummydata';
import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { useState } from 'react';
import { BookRequest, RequestStatus } from '@/types';
import { AdminTab } from '@/utils/enum';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';
import useConfirmModal from '@/components/Modals/useCofirm';
import useConfirmRejectModal from '@/components/Modals/useReject';
import {
  approveIncomingRequest,
  rejectIncomingRequest
} from '@/service/api/admin';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';

export default function IncomingTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  const { AlertModal, showAlert } = useAlertModal();
  const { ConfirmModal, showConfirmModal } = useConfirmModal();
  const { ConfirmRejectModal, showRejectModal } = useConfirmRejectModal();

  const handleApproveRequest = async (request: BookRequest) => {
    try {
      const res = await approveIncomingRequest(request.requestId);

      showAlert({
        title: 'Success',
        subtitle: 'Request has been approved.',
        type: AlertType.SUCCESS,
        onModalClose: () => handleRefreshRequest()
      });
    } catch (err) {
      console.log(err);
      showAlert({
        title: 'Error',
        subtitle: 'Something went wrong. Please try again later.',
        type: AlertType.ERROR
      });
    }
  };

  const handleRejectRequest = async (reason: string, request: BookRequest) => {
    try {
      const res = await rejectIncomingRequest(request.requestId, reason);

      showAlert({
        title: 'Success',
        subtitle: 'Request has been rejected.',
        type: AlertType.SUCCESS,
        onModalClose: () => handleRefreshRequest()
      });
    } catch (err) {
      console.log(err);
      showAlert({
        title: 'Error',
        subtitle: 'Something went wrong. Please try again later.',
        type: AlertType.ERROR
      });
    }
  };

  return (
    <>
      <AlertModal />
      <ConfirmModal />
      <ConfirmRejectModal />

      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout
        title='Incoming Request'
        handleRefresh={handleRefreshRequest}
      >
        <RequestTable
          useIn={AdminTab.INCOMING_REQUEST}
          data={requestData.filter(
            (request) => request.status === RequestStatus.PENDING
          )}
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
