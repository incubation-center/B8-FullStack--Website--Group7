const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'encrypted-tbn2.gstatic.com',
      'i.pinimg.com'
    ]
  },
  i18n
};

module.exports = nextConfig;
