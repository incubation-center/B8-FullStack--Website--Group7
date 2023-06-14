import AdminLayout from '@/components/layout/AdminLayout';
import { AdminTab } from '@/utils/enum';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

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

  // framer motion animate slide in and out based on tab order
  const variants = {
    hidden: {
      y: '-100%',
      width: '100vw',
      transition: {
        ease: 'easeInOut'
      }
    },
    visible: {
      y: 0,
      width: '100vw',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20
      }
    },
    exit: {
      y: '100%',
      transition: {
        ease: 'easeInOut'
      },
      width: '100vw'
    }
  };

  return (
    <AdminLayout currentTab={tab} handlePageRouting={handlePageRouting}>
      <AnimatePresence mode='sync' initial={false} presenceAffectsLayout>
        {tab === AdminTab.DASHBOARD && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={AdminTab.DASHBOARD}
            className='flex-1 h-full w-full'
          >
            <div>Dashboard</div>
          </motion.div>
        )}
        {tab === AdminTab.UPLOAD && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={AdminTab.UPLOAD}
            className='flex-1 h-full w-full'
          >
            Upload
          </motion.div>
        )}
        {tab === AdminTab.INCOMING_REQUEST && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={AdminTab.INCOMING_REQUEST}
            className='flex-1 h-full w-full'
          >
            Incoming
          </motion.div>
        )}
        {tab === AdminTab.ACTIVE_REQUEST && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={AdminTab.ACTIVE_REQUEST}
            className='flex-1 h-full w-full'
          >
            Active
          </motion.div>
        )}
        {tab === AdminTab.ARCHIVED_REQUEST && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            key={AdminTab.ARCHIVED_REQUEST}
            className='flex-1 h-full w-full'
          >
            Archived
          </motion.div>
        )}
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
