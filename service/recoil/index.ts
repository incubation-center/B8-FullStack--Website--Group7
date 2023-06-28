import { Book, BookRequest } from '@/types';
import { AuthStore } from '@/types/auth';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { atom, selector, selectorFamily } from 'recoil';
import { getAllRequest } from '../api/request';

// fetching
export const isMakingRequestAtom = atom<boolean>({
  key: 'isMakingRequestAtom',
  default: false
});

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
    user: null,
    isFetched: false
  }
});

// books
export const AllBooksAtom = atom<Book[]>({
  key: 'AllBooksAtom',
  default: []
});

export const isBookAlreadySaved = selectorFamily<boolean, string>({
  key: 'isBookAlreadySaved',
  get:
    (bookId: string) =>
    ({ get }) => {
      const { user } = get(AuthAtom);

      if (!user) return false;

      let isSaved = false;

      user.favoriteBooks.forEach((book) => {
        if (book.id === bookId) {
          isSaved = true;
          return;
        }
      });

      return isSaved;
    }
});
