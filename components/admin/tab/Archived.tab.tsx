import AdminTabLayout from '@/components/layout/AdminTabLayout';
import dynamic from 'next/dynamic';
const RequestTable = dynamic(() => import('../table/RequestTable'), {
  ssr: false
});

import { RequestData } from '@/dummydata';
import { AdminTab } from '@/utils/enum';
import { useState } from 'react';
import useModal from '@/components/Modals/useModal';
import { BookRequest, RequestStatus } from '@/types';
import RequestDetail from '@/components/Modals/RequestDetail';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';
import { useTranslation } from 'next-i18next';

export default function ArchivedTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const { t } = useTranslation('admin');

  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <AdminTabLayout
        title={t('tab.archived-request')}
        handleRefresh={handleRefreshRequest}
      >
        <RequestTable
          useIn={AdminTab.ARCHIVED_REQUEST}
          data={requestData.filter(
            (request) => request.status === RequestStatus.ACHIEVED
          )}
          actions={[
            {
              label: t('btns.view-btn'),
              bgColor: 'bg-alt-secondary',
              onClick: (request) => {
                setViewRequest(request);
                toggle();
              }
            }
          ]}
        />
      </AdminTabLayout>
    </>
  );
}
