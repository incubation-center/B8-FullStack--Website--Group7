import { User } from '../types';

// homepage
export enum HomePageTab {
  HOME = 'home',
  SAVED = 'saved',
  REQUEST_STATUS = 'request-status',
  PROFILE = 'profile'
}

export const BookCategory = {
  EDUCATION: 'Education',
  BUSINESS: 'Business',
  HISTORY: 'History',
  DRAMA: 'Drama',
  FANTASY: 'Fantasy',
  SELF_DEVELOPMENT: 'Self Development'
};

// admin homepage tab
export enum AdminTab {
  DASHBOARD = 'dashboard',
  UPLOAD = 'upload',
  BOOKS = 'books',
  INCOMING_REQUEST = 'incoming-request',
  ACTIVE_REQUEST = 'active-request',
  ARCHIVED_REQUEST = 'archived-request',
  RENTER = 'renter',
  SETTING = 'setting'
}

// auths
export enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password'
}

// api endpoints
// some key is a function, so we can pass params to it
export const API_ENDPOINT = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VALIDATE_TOKEN: (id: string) => '/auth/validate-token/' + id,
    REFRESH_TOKEN: '/auth/refresh-token/'
  },
  USER: {
    INFO: (id: string) => '/user/' + id,
    CHANGE_PASSWORD: (id: string) => `/user/${id}/password`,
    BOOK_TO_FAVORITES: (id: string, bookId: string) =>
      `/user/${id}/favorites/${bookId}`
  },
  BOOK: {
    GET_ALL_BOOKS: '/book',
    GET_BOOK_BY_ID: (id: string) => '/book/' + id,
    GET_BOOK_BY_TITLE: (title: string) => '/book/title?title=' + title,
    GET_BOOK_BY_AUTHOR: (author: string) => '/book/author?author=' + author
  },
  REQUEST: {
    GET_ALL_REQUEST: (userId: string) => '/request/user?userId=' + userId,
    CREATE_REQUEST: '/request'
  },
  ADMIN: {
    GET_ALL_REQUEST_COUNT: '/request/count',
    GET_ALL_REQUEST: '/request',
    APPROVE_INCOMING_REQUEST: (id: string) => '/request/' + id + '/accept',
    REJECT_INCOMING_REQUEST: (id: string) => '/request/' + id + '/reject',
    RECEIVE_BOOK: (id: string) => '/request/' + id + '/return'
  }
};
