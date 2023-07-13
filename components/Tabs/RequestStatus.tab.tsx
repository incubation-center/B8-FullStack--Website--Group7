// import DataTable from 'react-data-table-component';
// convert above to dynamic import

import { RequestData } from '@/dummydata';
import { BookRequest } from '@/types';
import RequestTable from '../RequestStatus/RequestTable';
import NotLoggedInLayout from '../layout/NotLoggedInLayout';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { getAllRequest } from '@/service/api/request';
import {
  AuthAtom,
  UserRequestAtom,
  filteredUserRequestAtom
} from '@/service/recoil';
import useModal from '../Modals/useModal';
import RequestDetail from '../Modals/RequestDetail';
import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useDebounce } from '@/utils/function';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export default function RequestStatusTab({
  onClickExplore
}: {
  onClickExplore: () => void;
}) {
  const { t } = useTranslation('homepage');

  const authStore = useRecoilValue(AuthAtom);
  const [userRequests, setUserRequests] = useRecoilState(UserRequestAtom);
  const filteredRequest = useRecoilValue(filteredUserRequestAtom);
  const [isFetched, setIsFetched] = useState(userRequests !== undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [viewRequest, setViewRequest] = useState<BookRequest | null>(null);
  const { toggle, ModalWrapper } = useModal();

  const fetchRequest = useDebounce(async () => {
    try {
      const res = await getAllRequest(authStore.user?.userId as string);
      setUserRequests(res);
      setIsFetched(true);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetched(true);
      setIsRefreshing(false);
    }
  }, 100);

  useEffect(() => {
    if (authStore.user) {
      if (userRequests === undefined) {
        fetchRequest();
      }
      if (userRequests !== undefined) {
        setIsRefreshing(true);
        fetchRequest();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalWrapper>
        <RequestDetail request={viewRequest} />
      </ModalWrapper>

      <NotLoggedInLayout>
        <div className='w-full h-full flex flex-col overflow-y-scroll p-4'>
          <h1
            className='
              font-bold text-t-primary text-center
              text-2xl md:text-4xl
              pb-4 md:pb-8 
              pt-2 md:pt-4 
            '
          >
            {t('request-tab.h1-request-status')}
          </h1>

          {!isFetched && (
            <div className='w-full flex-1 flex gap-4 justify-center items-center'>
              <div className='text-center text-primary font-medium'>
                {t('request-tab.fetching-request', 'Fetching your request')}
              </div>
              <SpinningLoadingSvg className='w-8 h-8 text-primary' />
            </div>
          )}

          {isFetched && filteredRequest && filteredRequest.length === 0 && (
            <div className='w-full flex-1 flex flex-col justify-center items-center'>
              <h1 className='text-center text-t-primary font-medium text-lg'>
                {t('request-tab.no-request', 'You have no request')}
              </h1>
              <button
                className='
               bg-primary text-white px-4 py-2 rounded-full w-40
               text-lg font-medium mt-4
             '
                onClick={onClickExplore}
              >
                {t('request-tab.explore-books', 'Explore books')}
              </button>
            </div>
          )}

          {/* table */}
          {isFetched && filteredRequest && filteredRequest.length !== 0 && (
            <>
              {isRefreshing && (
                <div className='w-full h-fit flex gap-4 justify-start items-center'>
                  <SpinningLoadingSvg className='w-8 h-8 text-t-primary' />
                  <div className='text-center text-primary font-medium'>
                    {t('request-tab.updating-request', 'Updating your request')}
                  </div>
                </div>
              )}
              <motion.div layout>
                <RequestTable
                  data={filteredRequest}
                  actions={[
                    {
                      label: t('request-tab.table.view-btn', 'View'),
                      onClick: (request: BookRequest) => {
                        setViewRequest(request);
                        toggle();
                      },
                      bgColor: 'bg-primary text-white'
                    }
                  ]}
                />
              </motion.div>
            </>
          )}
        </div>
      </NotLoggedInLayout>
    </>
  );
}
