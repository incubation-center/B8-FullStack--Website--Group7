import { Book } from '@/types';
import { AuthStore } from '@/types/auth';
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
  default: ''
});

// auth
export const RememberMeAtom = atom<boolean>({
  key: 'RememberMeAtom',
  default: false
});

// admin
export const AuthAtom = atom<AuthStore>({
  key: 'AuthAtom',
  default: {
    isLoggedIn: false,
    isAdmin: false,
    user: null
  }
});

// books
export const AllBooksAtom = atom<Book[]>({
  key: 'AllBooksAtom',
  default: []
});
