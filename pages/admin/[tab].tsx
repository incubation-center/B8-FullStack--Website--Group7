import AdminLayout from '@/components/layout/AdminLayout';
import { AdminTab } from '@/utils/enum';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import DashboardTab from '@/components/admin/tab/Dashboard.tab';
import UploadTab from '@/components/admin/tab/Upload.tab';
import IncomingTab from '@/components/admin/tab/Incoming.tab';
import ActiveTab from '@/components/admin/tab/Active.tab';
import ArchivedTab from '@/components/admin/tab/Archived.tab';
import RenterTab from '@/components/admin/tab/Renter.tab';
import SettingTab from '@/components/admin/tab/Setting.tab';

export default function AdminHomePage({
  currentTab
}: {
  currentTab: AdminTab;
}) {
  // initialize
  const router = useRouter();

  // handling page routing
  const [tab, setTab] = useState(currentTab);

  const handlePageRouting = (tab: AdminTab) => {
    router.push(`/admin/${tab}`, undefined, { shallow: true });
  };
  useEffect(() => {
    const tab = router.query.tab;
    if (tab) {
      setTab(tab as AdminTab);
    }
  }, [router.query.tab, setTab]);
  // end: handling page routing

  // initialize tab state
  useEffect(() => {
    setTab(currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout currentTab={tab} handlePageRouting={handlePageRouting}>
      <AnimatePresence mode='sync' initial={false} presenceAffectsLayout>
        {tab === AdminTab.DASHBOARD && <DashboardTab />}
        {tab === AdminTab.UPLOAD && <UploadTab />}
        {tab === AdminTab.INCOMING_REQUEST && <IncomingTab />}
        {tab === AdminTab.ACTIVE_REQUEST && <ActiveTab />}
        {tab === AdminTab.ARCHIVED_REQUEST && <ArchivedTab />}
        {tab === AdminTab.RENTER && <RenterTab />}
        {tab === AdminTab.SETTING && <SettingTab />}
      </AnimatePresence>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let tab = context.query.tab as string;

  // check is tab in AdminTab enum
  if (!Object.values(AdminTab).includes(tab as AdminTab)) {
    // if not, redirect to dashboard
    return {
      redirect: {
        destination: `/admin/${AdminTab.DASHBOARD}`,
        permanent: false
      }
    };
  }

  return {
    props: {
      currentTab: tab || AdminTab.DASHBOARD
    }
  };
}
