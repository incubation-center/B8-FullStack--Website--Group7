import { Book, BookRequest } from '@/types';
import { AuthStore } from '@/types/auth';
import { BookCategory, HomePageTab } from '@/utils/enum';
import { atom, selector, selectorFamily } from 'recoil';
import { getAllRequest } from '../api/request';
import { getBookById } from '../api/book';
import Fuse from 'fuse.js';
import { title } from 'process';

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

export const searchKeywordAtom = atom<string>({
  key: 'searchKeyword',
  default: ''
});

export const homePageCategoryAtom = atom<string>({
  key: 'homePageCategory',
  default: ''
});

export const UserRequestAtom = atom<BookRequest[]>({
  key: 'UserRequestAtom',
  default: undefined
});

export const filteredUserRequestAtom = selector<BookRequest[]>({
  key: 'filteredUserRequestAtom',
  get: ({ get }) => {
    const requests = get(UserRequestAtom);
    const keyword = get(searchKeywordAtom);
    const tab = get(homePageTabAtom);

    if (tab !== HomePageTab.REQUEST_STATUS || keyword === '') return requests;

    const options = {
      includeScore: true,
      useExtendedSearch: true,
      threshold: 0.5,
      keys: ['book.title', 'book.author', 'book.category']
    };

    const fuse = new Fuse(requests, options);

    const fuseResult = fuse.search(
      keyword.toLowerCase().replace(/\s/g, '').trim()
    );

    return fuseResult.map((item) => item.item);
  }
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

export const filteredBooksAtom = selector<Book[] | undefined>({
  key: 'filteredBooksAtom',
  get: ({ get }) => {
    const books = get(AllBooksAtom);
    const keyword = get(searchKeywordAtom);
    const tab = get(homePageTabAtom);

    if (tab !== HomePageTab.HOME || keyword === '') return undefined;

    const options = {
      includeScore: true,
      useExtendedSearch: true,
      threshold: 0.5,
      keys: ['title', 'author']
    };

    const fuse = new Fuse(books, options);

    const fuseResult = fuse.search(
      keyword.toLowerCase().replace(/\s/g, '').trim()
    );

    return fuseResult.map((item) => item.item);
  }
});

export const filteredSavedBooksAtom = selector<Book[]>({
  key: 'filteredSavedBooksAtom',
  get: ({ get }) => {
    const savedBooks = get(AuthAtom).user?.favoriteBooks ?? [];
    const keyword = get(searchKeywordAtom);
    const tab = get(homePageTabAtom);

    if (tab !== HomePageTab.SAVED || keyword === '') return savedBooks;

    if (savedBooks.length === 0) return [];

    const options = {
      includeScore: true,
      useExtendedSearch: true,
      threshold: 0.5,
      keys: ['title', 'author', 'category']
    };

    const fuse = new Fuse(savedBooks, options);

    const fuseResult = fuse.search(
      keyword.toLowerCase().replace(/\s/g, '').trim()
    );

    return fuseResult.map((item) => item.item);
  }
});

export const getBookByIdAtom = selectorFamily<Book | null, string>({
  key: 'getBookById',
  get:
    (bookId: string) =>
    async ({ get }) => {
      const books = get(AllBooksAtom);

      let book = null;

      console.log('====================================');
      console.log('books length', books.length);
      console.log('===================================');

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
