import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

import { HomePageTab } from '@/utils/enum';

import HomeLayout from '@/components/layout/HomeLayout';
import HomeTab from '@/components/Tabs/Home.tab';
import SavedTab from '@/components/Tabs/Saved.tab';
import RequestStatusTab from '@/components/Tabs/RequestStatus.tab';
import Profile from '@/components/Tabs/Profile.tab';
import { processUserToken } from '@/service/token';

import { useRecoilState } from 'recoil';
import { AllBooksAtom, AuthAtom } from '@/service/recoil';
import { AuthStore } from '@/types/auth';
import { Book } from '@/types';
import { getAllBooks } from '@/service/api/book';

export default function Home({
  currentTab,
  authStore
}: {
  currentTab: HomePageTab;
  authStore: AuthStore;
}) {
  // atoms
  const [_, setAuthObj] = useRecoilState(AuthAtom);

  // initialize
  const router = useRouter();

  // handling page routing
  const [tab, setTab] = useState(currentTab);

  const handlePageRouting = (tab: HomePageTab) => {
    router.push(`/?tab=${tab}`, undefined, { shallow: true, scroll: false });
  };
  useEffect(() => {
    const tab = router.query.tab;
    if (tab) {
      setTab(tab as HomePageTab);
    }
  }, [router.query.tab, setTab]);
  // end: handling page routing

  // initialize tab state
  useEffect(() => {
    setTab(currentTab);
    setAuthObj(authStore);

    console.log('====================================');
    console.log('authStore', authStore);
    console.log('====================================');

    // prefetching
    if (authStore.isAdmin) router.prefetch('/admin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full bg-primary'>
      <HomeLayout currentTab={tab} handlePageRouting={handlePageRouting}>
        {tab === HomePageTab.HOME && <HomeTab />}
        {tab === HomePageTab.SAVED && (
          <SavedTab
            onClickExplore={() => handlePageRouting(HomePageTab.HOME)}
          />
        )}
        {tab === HomePageTab.REQUEST_STATUS && (
          <RequestStatusTab
            onClickExplore={() => handlePageRouting(HomePageTab.HOME)}
          />
        )}
        {tab === HomePageTab.PROFILE && <Profile />}
      </HomeLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {
    tab
  }: {
    tab: HomePageTab;
  } = context.query;

  if (!tab) {
    return {
      redirect: {
        destination: `/?tab=${HomePageTab.HOME}`,
        permanent: true
      }
    };
  }

  // check if user is admin
  const token = context.req.cookies.accessToken;
  const authObj = await processUserToken(token);

  return {
    props: {
      currentTab: tab,
      authStore: authObj
    }
  };
};
