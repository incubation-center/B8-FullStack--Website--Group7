/** @type {import('next-i18next').UserConfig} */

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
    'reset-password'
  ],
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
