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
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...colors,
        ...{
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          'alt-secondary': 'var(--color-alt-secondary)',
          action: 'var(--color-action)',
          success: '#52B788',
          warning: '#fcd34d',
          danger: '#ef4444',
          background: '#D9D9D9'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
};
