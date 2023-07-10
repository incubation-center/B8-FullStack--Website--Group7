import { BookRequest, RequestCount } from '@/types';
import { atom, selector, selectorFamily } from 'recoil';

export const AdminAllRequestAtom = atom<BookRequest[]>({
  key: 'AdminAllRequestAtom',
  default: []
});

export const AdminAllRequestCountAtom = atom<RequestCount>({
  key: 'AdminAllRequestCountAtom',
  default: {
    PENDING: {
      total: 0,
      today: 0,
      yesterday: 0
    },
    ACCEPTED: {
      total: 0,
      today: 0,

      yesterday: 0
    },
    RENTER: {
      total: 0,
      today: 0,
      yesterday: 0
    },
    ARCHIVED: {
      total: 0,
      today: 0,
      yesterday: 0
    }
  }
});

export const isRefreshingRequestAtom = atom<boolean>({
  key: 'isRefreshingRequestAtom',
  default: false
});
