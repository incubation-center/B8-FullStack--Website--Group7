import AdminTabLayout from '@/components/layout/AdminTabLayout';
import RenterTable from '../table/RenterTable';

import useModal from '@/components/Modals/useModal';
import RequestDetail from '@/components/Modals/RequestDetail';
import { BookRequest, RequestStatus } from '@/types';
import { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { AdminAllRequestAtom } from '@/service/recoil/admin';

export default function RenterTab({
  handleRefreshRequest
}: {
  handleRefreshRequest: () => void;
}) {
  const requestData = useRecoilValue(AdminAllRequestAtom);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  return (
    <AdminTabLayout title='Renter' handleRefresh={handleRefreshRequest}>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <RenterTable
        data={requestData.filter(
          (request) =>
            request.isApproved && request.status === RequestStatus.ACHIEVED
        )}
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
    </AdminTabLayout>
  );
}
