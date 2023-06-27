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
export const API_ENDPOINT = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VALIDATE_TOKEN: `/auth/validate-token`
  }
};
