/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'encrypted-tbn2.gstatic.com']
  },
  i18n
};

module.exports = nextConfig;
