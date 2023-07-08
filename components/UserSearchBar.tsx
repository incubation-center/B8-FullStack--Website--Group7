import Image from 'next/image';

import { useRecoilState } from 'recoil';
import { searchKeywordAtom } from '@/service/recoil';
import { HomePageTab } from '@/utils/enum';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchSvg from './icon/Search';
import { useTranslation } from 'react-i18next';

export default function UserSearchBar({
  currentTab,
  initialAnimation = false
}: {
  currentTab: HomePageTab;
  initialAnimation?: boolean;
}) {
  const { t } = useTranslation('common');

  const [searchText, setSearchText] = useRecoilState(searchKeywordAtom);
  const [isShow, setIsShow] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'Search book by Title, Author'
  );

  useEffect(() => {
    setSearchText('');
    setIsShow(true);
    if (currentTab === HomePageTab.HOME) {
      setPlaceholder(t('search-placeholder.home-tab', 'Title, Author'));
    } else if (currentTab === HomePageTab.SAVED) {
      setPlaceholder(
        t('search-placeholder.saved-tab', 'Title, Author, Category')
      );
    } else if (currentTab === HomePageTab.REQUEST_STATUS) {
      setPlaceholder(
        t('search-placeholder.request-tab', 'Title, Author, Category')
      );
    } else if (currentTab === HomePageTab.PROFILE) {
      setPlaceholder('');
      setIsShow(false);
    }
  }, [currentTab, setSearchText, t]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={initialAnimation && { y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='
            w-full max-w-[500px] xl:max-w-[700px] w-inherit
            flex justify-center items-center
          bg-white 
            p-2 px-4 rounded-xl space-x-6
            box-border border-2 border-primary border-opacity-60 focus-within:border-opacity-100
            transition-colors
            group
          '
        >
          <SearchSvg className='h-6 w-6 fill-primary opacity-60 group-focus-within:opacity-100 transition-all duration-300' />

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
