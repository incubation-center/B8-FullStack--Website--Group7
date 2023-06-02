import { HomePageTab } from '@/utils/enum';
import { atom } from 'recoil';

// homepage
export const homePageTabAtom = atom<HomePageTab>({
  key: 'homePageTab',
  default: HomePageTab.HOME
});

export const homePageSearchAtom = atom<string>({
  key: 'homePageSearch',
  default: ''
});
