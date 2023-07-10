/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

// these colors are deprecated and being delete to remove the warning when building in production
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...{
          primary: '#523A28',
          secondary: '#A47551',
          'alt-secondary': '#D0B49F',
          action: '#EBEBEB',
          success: '#52B788',
          warning: '#fcd34d',
          danger: '#ef4444',
          background: '#D9D9D9'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        kantumruy: ['Kantumruy Pro', 'sans-serif']
      }
    }
  },
  plugins: []
};
