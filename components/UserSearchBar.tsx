import Image from 'next/image';

import { useRecoilState } from 'recoil';
import { searchKeywordAtom } from '@/service/recoil';
import { HomePageTab } from '@/utils/enum';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchSvg from './icon/Search';

export default function UserSearchBar({
  currentTab
}: {
  currentTab: HomePageTab;
}) {
  const [searchText, setSearchText] = useRecoilState(searchKeywordAtom);
  const [isShow, setIsShow] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'Search book by Title, Author'
  );

  useEffect(() => {
    setSearchText('');
    setIsShow(true);
    if (currentTab === HomePageTab.HOME) {
      setPlaceholder('Title, Author');
    } else if (currentTab === HomePageTab.SAVED) {
      setPlaceholder('Title, Author, Category');
    } else if (currentTab === HomePageTab.REQUEST_STATUS) {
      setPlaceholder('Title, Author, Category, Status');
    } else if (currentTab === HomePageTab.PROFILE) {
      setPlaceholder('');
      setIsShow(false);
    }
  }, [currentTab, setSearchText]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='
            w-full max-w-[500px] xl:max-w-[700px]  mx-auto
            flex justify-center items-center
          bg-action 
            p-2 px-4 rounded-xl space-x-6
            box-border border-2 focus-within:border-primary
            transition-colors
          '
        >
          <SearchSvg className='h-6 w-6 fill-primary ' />

          <input
            type='text'
            className='
              w-full bg-transparent ml-2 pt-[1px]
              focus:outline-none
              placeholder-gray-400
            '
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
