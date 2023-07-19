import { isRefreshingRequestAtom } from '@/service/recoil/admin';
import { useRecoilValue } from 'recoil';

import { motion } from 'framer-motion';

import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';
import { useTranslation } from 'next-i18next';

export default function AdminTabLayout({
  children,
  title,
  handleRefresh
}: {
  children: React.ReactNode;
  title: string;
  handleRefresh?: () => void;
}) {
  const { t } = useTranslation('admin');
  const isRefreshing = useRecoilValue(isRefreshingRequestAtom);

  return (
    <div className='admin-tab-width p-4 md:p-8 min-h-full w-full overflow-y-scroll flex flex-grow flex-col '>
      <div className='left-0 z-10 flex justify-between items-center mb-4'>
        <h1 className='text-xl xl:text-2xl text-primary font-bold'>{title}</h1>

        {handleRefresh && (
          <motion.button
            initial={{ width: 150 }}
            animate={{ width: isRefreshing ? 170 : 150 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`bg-primary text-white rounded-full px-4 py-2 flex justify-center items-center 
            ${
              isRefreshing
                ? 'opacity-80 cursor-not-allowed'
                : 'hover:bg-primary-light'
            }
            whitespace-nowrap
            `}
          >
            <span>
              {isRefreshing ? t('btns.refreshing-btn') : t('btns.refresh-btn')}
            </span>

            {isRefreshing && (
              <motion.div
                initial={{ x: 1 }}
                animate={{ x: 0 }}
                transition={{
                  delay: 0.3
                }}
              >
                <SpinningLoadingSvg className='w-5 h-fit ml-2 ' />
              </motion.div>
            )}
          </motion.button>
        )}
      </div>
      <div className='w-full flex-1'>{children}</div>
    </div>
  );
}
