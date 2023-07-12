import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

// import { RequestData } from '@/dummydata';
import { AdminTab } from '@/utils/enum';
import { useState } from 'react';
import useModal from '@/components/Modals/useModal';
import { BookRequest, RequestStatus } from '@/types';
import RequestDetail from '@/components/Modals/RequestDetail';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AdminAllRequestAtom,
  isRefreshingRequestAtom
} from '@/service/recoil/admin';
import useConfirmModal from '@/components/Modals/useCofirm';
import { receiveBook } from '@/service/api/admin';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { useTranslation } from 'next-i18next';

export default function ActiveTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const { t } = useTranslation('admin');

  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [_, setIsRefreshing] = useRecoilState(isRefreshingRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();
  const { AlertModal, showAlert } = useAlertModal();
  const { ConfirmModal, showConfirmModal } = useConfirmModal();

  const handleReceiveBook = async (request: BookRequest) => {
    try {
      await receiveBook(request.requestId);

      showAlert({
        title: 'Success',
        subtitle: 'Book has been received.',
        type: AlertType.SUCCESS,
        onModalClose: () => handleRefreshRequest()
      });
    } catch (err) {
      console.log(err);
      showAlert({
        title: 'Error',
        subtitle: 'Something went wrong. Please try again later.',
        type: AlertType.ERROR,
        onModalClose: () => handleRefreshRequest()
      });
    }
  };

  return (
    <>
      <AlertModal />
      <ConfirmModal />

      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout
        title={t('tab.active-request')}
        handleRefresh={handleRefreshRequest}
      >
        <RequestTable
          useIn={AdminTab.ACTIVE_REQUEST}
          data={requestData
            .filter((request) => request.status === RequestStatus.ACCEPTED)
            .sort((a, b) => (a.dateOfReturn as any) - (b.dateOfReturn as any))}
          actions={[
            {
              label: t('btns.view-btn'),
              bgColor: 'bg-alt-secondary',
              onClick: (request) => {
                setViewRequest(request);
                toggle();
              }
            },
            {
              label: t('btns.receive-btn'),
              bgColor: 'bg-success text-white',
              onClick: (request) => {
                showConfirmModal({
                  title: 'Receive Book',
                  subtitle: 'Are you sure you want to receive this book?',
                  onConfirm: () => {
                    setIsRefreshing(true);
                    handleReceiveBook(request);
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
