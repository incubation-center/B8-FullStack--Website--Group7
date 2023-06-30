import { isRefreshingRequestAtom } from '@/service/recoil/admin';
import { useRecoilValue } from 'recoil';

import { motion } from 'framer-motion';

import SpinningLoadingSvg from '../icon/SpinningLoadingSvg';

export default function AdminTabLayout({
  children,
  title,
  handleRefreshRequest
}: {
  children: React.ReactNode;
  title: string;
  handleRefreshRequest?: () => void;
}) {
  const isRefreshing = useRecoilValue(isRefreshingRequestAtom);

  return (
    <div className='p-4 md:p-8 min-h-full w-full overflow-y-scroll flex flex-grow flex-col'>
      <div className='flex justify-between items-center  mb-4'>
        <h1 className='text-xl xl:text-2xl text-primary font-bold'>{title}</h1>

        {handleRefreshRequest && (
          <motion.button
            initial={{ width: 100 }}
            animate={{ width: isRefreshing ? 140 : 100 }}
            onClick={handleRefreshRequest}
            disabled={isRefreshing}
            className={`bg-primary text-white rounded-full px-4 py-2 flex justify-center items-center 
            ${
              isRefreshing
                ? 'opacity-80 cursor-not-allowed'
                : 'hover:bg-primary-light'
            }
            `}
          >
            <span>{isRefreshing ? 'Refreshing' : 'Refresh'}</span>

            {isRefreshing && (
              <motion.div
                initial={{ x: 1 }}
                animate={{ x: 0 }}
                transition={{
                  delay: 0.3
                }}
              >
                <SpinningLoadingSvg className='w-5 h-fit ml-2' />
              </motion.div>
            )}
          </motion.button>
        )}
      </div>
      <div className='w-full flex-1'>{children}</div>
    </div>
  );
}
