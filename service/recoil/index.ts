import { Book, BookRequest } from '@/types';
import { AuthStore } from '@/types/auth';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { atom, selector, selectorFamily } from 'recoil';
import { getAllRequest } from '../api/request';
import { getBookById } from '../api/book';

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

export const getBookByIdAtom = selectorFamily<Book | null, string>({
  key: 'getBookById',
  get:
    (bookId: string) =>
    async ({ get }) => {
      const books = get(AllBooksAtom);

      let book = null;

      // all books data is not fetched yet
      books.forEach((b) => {
        if (b.id == bookId) {
          book = b;
          return;
        }
      });

      if (!book) {
        try {
          book = (await getBookById(bookId)) || null;
        } catch (err) {
          console.log(err);
        }
      }

      return book;
    }
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
