import AdminLayout from '@/components/layout/AdminLayout';
import { AdminTab } from '@/utils/enum';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { Book } from '@/types';
import { getAllBooks } from '@/service/api/book';
import { AllBooksAtom } from '@/service/recoil';

// import { AnimatePresence } from 'framer-motion';
import DashboardTab from '@/components/admin/tab/Dashboard.tab';
import UploadTab from '@/components/admin/tab/Upload.tab';
import IncomingTab from '@/components/admin/tab/Incoming.tab';
import ActiveTab from '@/components/admin/tab/Active.tab';
import ArchivedTab from '@/components/admin/tab/Archived.tab';
import RenterTab from '@/components/admin/tab/Renter.tab';
import SettingTab from '@/components/admin/tab/Setting.tab';
import { getAllRequestAdmin, getAllRequestCount } from '@/service/api/admin';

import { useRecoilState } from 'recoil';
import {
  AdminAllRequestAtom,
  AdminAllRequestCountAtom,
  isRefreshingRequestAtom,
} from '@/service/recoil/admin';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import { useDebounce, useLoadNamespace } from '@/utils/function';

import BookTab from '@/components/admin/tab/Book.tab';
import { AxiosError } from 'axios';
import useAlertModal, { AlertType } from '@/components/Modals/Alert';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AdminHomePage({
  currentTab,
}: {
  currentTab: AdminTab;
}) {
  const [isFetched, setIsFetched] = useState(false);

  const [_, setAllRequests] = useRecoilState(AdminAllRequestAtom);
  const [__, setAllRequestsCount] = useRecoilState(AdminAllRequestCountAtom);
  const [___, setIsRefreshing] = useRecoilState(isRefreshingRequestAtom);
  const [____, setAllBooks] = useRecoilState(AllBooksAtom);

  // initialize
  const router = useRouter();
  const { AlertModal, showAlert } = useAlertModal();

  // handling page routing
  const [tab, setTab] = useState(currentTab);

  const handlePageRouting = (tab: AdminTab) => {
    router.push(`/admin/${tab}`, undefined, {
      shallow: true,
      locale: router.locale,
    });
  };
  useEffect(() => {
    const tab = router.query.tab;
    if (tab) {
      setTab(tab as AdminTab);
    }
  }, [router.query.tab, setTab]);
  // end: handling page routing
  useLoadNamespace('homepage');

  const initializeData = async () => {
    try {
      const [requestsResult, countResult] = await Promise.allSettled([
        getAllRequestAdmin(),
        getAllRequestCount(),
      ]);
      if (requestsResult.status === 'fulfilled') {
        setAllRequests(requestsResult.value);
      }
      if (countResult.status === 'fulfilled') {
        setAllRequestsCount(countResult.value);
      }
    } catch (err) {
      console.log('====================================');
      console.log('error', err);
      console.log('====================================');
    } finally {
      setIsFetched(true);
    }
  };

  // initialize tab state
  useEffect(() => {
    setTab(currentTab);

    initializeData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshRequest = useDebounce(async () => {
    setIsRefreshing(true);
    try {
      const [requestsResult, countResult] = await Promise.allSettled([
        getAllRequestAdmin(),
        getAllRequestCount(),
      ]);
      if (requestsResult.status === 'fulfilled') {
        setAllRequests(requestsResult.value);
      }
      if (countResult.status === 'fulfilled') {
        setAllRequestsCount(countResult.value);
      }
    } catch (err) {
      console.log('====================================');
      console.log('error', err);
      console.log('====================================');
      if (err instanceof AxiosError) {
        showAlert({
          title: 'Error',
          subtitle:
            err.response?.data.error ||
            'Something went wrong. Please try again later.',
          type: AlertType.ERROR,
          onModalClose: () => handleRefreshRequest(),
        });
      }
    } finally {
      setIsRefreshing(false);
    }
  }, 100);

  const handleRefreshBooks = useDebounce(() => {
    setIsRefreshing(true);
    getAllBooks()
      .then((books: Book[]) => {
        setAllBooks(books);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, 100);

  return (
    <>
      <AlertModal />

      <AdminLayout currentTab={tab} handlePageRouting={handlePageRouting}>
        {!isFetched && (
          <div className='w-full flex-1 flex gap-4 justify-center items-center'>
            <div className='text-center text-primary font-medium'>
              Fetching the data
            </div>
            <SpinningLoadingSvg className='w-8 h-8 text-primary' />
          </div>
        )}

        {isFetched && (
          <AnimatePresence mode='sync' initial={false} presenceAffectsLayout>
            {tab === AdminTab.DASHBOARD && (
              <DashboardTab handleRefreshRequest={handleRefreshRequest} />
            )}
            {tab === AdminTab.UPLOAD && (
              <UploadTab handleRefreshRequest={handleRefreshBooks} />
            )}
            {tab === AdminTab.BOOKS && <BookTab />}
            {tab === AdminTab.INCOMING_REQUEST && (
              <IncomingTab handleRefreshRequest={handleRefreshRequest} />
            )}
            {tab === AdminTab.ACTIVE_REQUEST && (
              <ActiveTab handleRefreshRequest={handleRefreshRequest} />
            )}
            {tab === AdminTab.ARCHIVED_REQUEST && (
              <ArchivedTab handleRefreshRequest={handleRefreshRequest} />
            )}
            {tab === AdminTab.RENTER && (
              <RenterTab handleRefreshRequest={handleRefreshRequest} />
            )}
            {tab === AdminTab.SETTING && <SettingTab />}
          </AnimatePresence>
        )}
      </AdminLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let tab = context.query.tab as string;

  // check is tab in AdminTab enum
  // if (!Object.values(AdminTab).includes(tab as AdminTab)) {
  //   // if not, redirect to dashboard
  //   return {
  //     redirect: {
  //       destination: `/admin/${AdminTab.DASHBOARD}`,
  //       permanent: false
  //     }
  //   };
  // }

  // const token = context.req.cookies.accessToken;
  // const requests = await getAllRequestAdmin(token);

  const locale = context.locale as string;

  return {
    props: {
      currentTab: tab || AdminTab.DASHBOARD,
      ...(await serverSideTranslations(locale, ['admin', 'common'])),
    },
  };
}
