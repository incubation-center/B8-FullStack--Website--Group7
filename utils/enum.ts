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

export const themes = [
  {
    title: 'Default',
    name: 'default',
    primary: '#523a28',
    secondary: '#a47551',
    altSecondary: '#d0b49f'
  },
  {
    title: 'Muted Black',
    name: 'muted-black',
    primary: '#262626',
    secondary: '#f1eee3',
    altSecondary: '#000'
  },
  {
    title: 'Muted Blue',
    name: 'muted-blue',
    primary: '#4e8d99',
    secondary: '#000',
    altSecondary: '#f1f1f1'
  },
  {
    title: 'Muted Gray',
    name: 'muted-gray',
    primary: '#c8c5bb',
    secondary: '#000',
    altSecondary: '#f1eee3'
  },
  {
    title: 'Muted Yellow',
    name: 'muted-yellow',
    primary: '#f4e8d0',
    secondary: '#000',
    altSecondary: '#faf3ee'
  }
];
