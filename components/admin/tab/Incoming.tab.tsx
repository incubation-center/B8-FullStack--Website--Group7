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

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AdminAllRequestAtom,
  isRefreshingRequestAtom
} from '@/service/recoil/admin';
import useConfirmModal from '@/components/Modals/useCofirm';
import useConfirmRejectModal from '@/components/Modals/useReject';
import {
  approveIncomingRequest,
  rejectIncomingRequest
} from '@/service/api/admin';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { AxiosError } from 'axios';

export default function IncomingTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [_, setIsRefreshing] = useRecoilState(isRefreshingRequestAtom);

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
      if (err instanceof AxiosError) {
        showAlert({
          title: 'Error',
          subtitle:
            err.response?.data.error ||
            'Something went wrong. Please try again later.',
          type: AlertType.ERROR,
          onModalClose: () => handleRefreshRequest()
        });
      }
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
      if (err instanceof AxiosError) {
        showAlert({
          title: 'Error',
          subtitle:
            err.response?.data.error ||
            'Something went wrong. Please try again later.',
          type: AlertType.ERROR,
          onModalClose: () => handleRefreshRequest()
        });
      }
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
                  onConfirm: () => {
                    setIsRefreshing(true);
                    handleApproveRequest(request);
                  }
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
                  onConfirm: (reason) => {
                    setIsRefreshing(true);
                    handleRejectRequest(reason, request);
                  }
                });
              }
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
