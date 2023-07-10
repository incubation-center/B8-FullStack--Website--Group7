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
  BOOKS = 'book-lists',
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
    VALIDATE_TOKEN: (id: string) => '/auth/validate-token/' + id,
    REFRESH_TOKEN: '/auth/refresh-token/',
    VALIDATE_RESET_PASSWORD_TOKEN: (token: string) =>
      '/user/validate/reset-password-token/?resetPwdToken=' + token
  },
  USER: {
    INFO: (id: string) => '/user/' + id,
    CHANGE_PASSWORD: (id: string) => `/user/${id}/password`,
    BOOK_TO_FAVORITES: (id: string, bookId: string) =>
      `/user/${id}/favorites/${bookId}`,
    FORGOT_PASSWORD: (email: string) => '/user/forgot-password?email=' + email,
    RESET_PASSWORD: '/user/forgot-password/update'
  },
  BOOK: {
    GET_ALL_BOOKS: '/book',
    GET_BOOK_BY_ID: (id: string) => '/book/' + id,
    GET_BOOK_BY_TITLE: (title: string) => '/book/title?title=' + title,
    GET_BOOK_BY_AUTHOR: (author: string) => '/book/author?author=' + author,
    CREATE_BOOK: '/book',
    UPDATE_BOOK_BY_ID: (id: string) => '/book/' + id,
    DELETE_BOOK_BY_ID: (id: string) => '/book/' + id
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

export type Themes = {
  title: string;
  name: string;
  primary: string;
  secondary: string;
  altSecondary: string;
  background: string;
  iconColor: string;
  iconColorActive: string;
  textColorPrimary: string;
  textColorSecondary: string;
};

export const themes: Themes[] = [
  {
    title: 'Default',
    name: 'default',
    primary: '#523a28',
    secondary: '#a47551',
    altSecondary: '#d0b49f',
    background: '#ebebeb',
    iconColor: '#a47551',
    iconColorActive: '#523a28',
    textColorPrimary: '#523a28',
    textColorSecondary: '#a47551'
  },
  {
    title: 'Muted Black',
    name: 'muted-black',
    primary: '#262626',
    secondary: '#f1eee3',
    altSecondary: '#000',
    background: '#171717',
    iconColor: '#a47551',
    iconColorActive: '#523a28',
    textColorPrimary: '#fff',
    textColorSecondary: '#f1eee3'
  },
  {
    title: 'Muted Blue',
    name: 'muted-blue',
    primary: '#4e8d99',
    secondary: '#000',
    altSecondary: '#f1f1f1',
    background: '#ebebeb',
    iconColor: '#a47551',
    iconColorActive: '#523a28',
    textColorPrimary: '#4e8d99',
    textColorSecondary: '#000'
  },
  {
    title: 'Muted Gray',
    name: 'muted-gray',
    primary: '#c8c5bb',
    secondary: '#000',
    altSecondary: '#f1eee3',
    background: '#ebebeb',
    iconColor: '#a47551',
    iconColorActive: '#523a28',
    textColorPrimary: '#c8c5bb',
    textColorSecondary: '#000'
  },
  {
    title: 'Muted Yellow',
    name: 'muted-yellow',
    primary: '#f4e8d0',
    secondary: '#000',
    altSecondary: '#faf3ee',
    background: '#ebebeb',
    iconColor: '#a47551',
    iconColorActive: '#523a28',
    textColorPrimary: '#f4e8d0',
    textColorSecondary: '#000'
  }
];
