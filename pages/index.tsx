import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

import { BookCategory, HomePageTab } from '@/utils/enum';

import HomeLayout from '@/components/layout/HomeLayout';
import HomeTab from '@/components/Tabs/Home.tab';
import SavedTab from '@/components/Tabs/Saved.tab';
import RequestStatusTab from '@/components/Tabs/RequestStatus.tab';
import Profile from '@/components/Tabs/Profile.tab';
import { processUserToken } from '@/service/token';

import { useRecoilState } from 'recoil';
import {
  AllBooksAtom,
  AuthAtom,
  UserRequestAtom,
  homePageTabAtom
} from '@/service/recoil';
import { AuthStore } from '@/types/auth';
import SpinningLoadingSvg from '@/components/icon/SpinningLoadingSvg';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home({
  currentTab,
  authStore
}: {
  currentTab: HomePageTab;
  authStore: AuthStore;
}) {
  // atoms
  const [_, setAuthObj] = useRecoilState(AuthAtom);
  const [__, setCurrentTab] = useRecoilState(homePageTabAtom);

  const [tab, setTab] = useState(currentTab);

  // initialize
  const router = useRouter();

  const updateTab = (tab: HomePageTab) => {
    setTab(tab as HomePageTab);
    setCurrentTab(tab);
  };

  // handling page routing
  const handlePageRouting = (tab: HomePageTab) => {
    if (tab === HomePageTab.HOME) {
      router.push(
        `/?tab=${tab}#${BookCategory.EDUCATION.toLowerCase()}`,
        undefined,
        {
          shallow: true,
          scroll: false
        }
      );
      return;
    }

    router.push(`/?tab=${tab}`, undefined, { shallow: true, scroll: false });
  };
  useEffect(() => {
    const tab = router.query.tab;
    if (tab) {
      updateTab(tab as HomePageTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tab]);
  // end: handling page routing

  // initialize tab state
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    updateTab(currentTab);
    setAuthObj(authStore);

    setIsFetched(true);

    // prefetching
    if (authStore.isAdmin) router.prefetch('/admin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full bg-primary'>
      {!isFetched && (
        <div className='h-full w-full flex justify-center items-center gap-4'>
          <SpinningLoadingSvg className='h-8 w-8 text-white' />
          <div className='text-white text-lg font-normal'> Loading...</div>
        </div>
      )}
      {isFetched && (
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
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {
    tab
  }: {
    tab: HomePageTab;
  } = context.query;

  // check if user is admin
  const token = context.req.cookies.accessToken;
  const authObj = await processUserToken(token);

  const locale = context.locale as string;

  return {
    props: {
      currentTab: tab || HomePageTab.HOME,
      authStore: authObj,
      ...(await serverSideTranslations(locale))
    }
  };
};
