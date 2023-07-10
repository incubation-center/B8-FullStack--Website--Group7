/** @type {import('next-i18next').UserConfig} */

const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'kh']
  },
  ns: [
    'common',
    'homepage',
    'book-detail',
    'forgot-password',
    'reset-password',
    'login',
    'signup'
  ],
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
