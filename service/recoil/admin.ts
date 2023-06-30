import { BookRequest } from '@/types';
import { atom, selector, selectorFamily } from 'recoil';

export const AdminAllRequestAtom = atom<BookRequest[]>({
  key: 'AdminAllRequestAtom',
  default: []
});

export const isRefreshingRequestAtom = atom<boolean>({
  key: 'isRefreshingRequestAtom',
  default: false
});
