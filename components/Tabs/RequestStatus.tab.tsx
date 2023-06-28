// import DataTable from 'react-data-table-component';
// convert above to dynamic import

import { RequestData } from '@/dummydata';
import { BookRequest } from '@/types';
import RequestTable from '../RequestStatus/RequestTable';
import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { getAllRequest } from '@/service/api/request';
import { AuthAtom } from '@/service/recoil';
import useModal from '../Modals/useModal';
import RequestDetail from '../Modals/RequestDetail';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useDebounce } from '@/utils/function';

export default function RequestStatusTab({
  onClickExplore
}: {
  onClickExplore: () => void;
}) {
  const authStore = useRecoilValue(AuthAtom);
  const [isFetched, setIsFetched] = useState(false);
  const [requests, setRequests] = useState<BookRequest[]>([]);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  const fetchRequest = useDebounce(async () => {
    getAllRequest(authStore.user?.userId as string).then((res) => {
      setRequests(res);
      setIsFetched(true);
    });
  }, 100);

  useEffect(() => {
    setIsFetched(false);
    if (authStore.user) {
      fetchRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStore.user]);

  return (
    <>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <NotLoggedInLayout>
        <div className='w-full h-full flex flex-col overflow-y-scroll p-4'>
          <h1
            className='
          font-bold text-primary text-center
          text-2xl md:text-4xl
          pb-4 md:pb-8 
          pt-2 md:pt-4 
        '
          >
            Request Status
          </h1>

          {!isFetched && (
            <div className='w-full flex-1 flex gap-4 justify-center items-center'>
              <div className='text-center text-primary font-medium'>
                Fetching your request
              </div>
              <SpinningLoadingSvg className='w-8 h-8 text-primary' />
            </div>
          )}

          {isFetched && requests.length === 0 && (
            <div className='w-full flex-1 flex flex-col justify-center items-center'>
              <h1 className='text-center text-primary font-medium'>
                You have no request
              </h1>
              <button
                className='
               bg-primary text-white px-4 py-2 rounded-full w-40
               text-lg font-medium mt-4
             '
                onClick={onClickExplore}
              >
                explore books
              </button>
            </div>
          )}

          {/* table */}
          {isFetched && (
            <RequestTable
              data={requests}
              actions={[
                {
                  label: 'View',
                  onClick: (request: BookRequest) => {
                    setViewRequest(request);
                    toggle();
                  },
                  bgColor: 'bg-primary text-white'
                }
              ]}
            />
          )}
        </div>
      </NotLoggedInLayout>
    </>
  );
}
