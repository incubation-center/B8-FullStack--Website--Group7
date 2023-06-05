import { BookCategory, HomePageTab } from '@/utils/enum';
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

export const homePageCategoryAtom = atom<string>({
  key: 'homePageCategory',
  default: BookCategory.ALL
});
