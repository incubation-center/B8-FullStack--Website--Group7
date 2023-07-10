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
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        ...{
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          'alt-secondary': 'rgb(var(--color-alt-secondary) / <alpha-value>)',
          background: 'rgb(var(--color-background) / <alpha-value>)',
          icon: 'rgb(var(--color-icon) / <alpha-value>)',
          'icon-active': 'rgb(var(--color-icon-active) / <alpha-value>)',
          't-primary': 'rgb(var(--text-color-primary) / <alpha-value>)',
          't-secondary': 'rgb(var(--text-color-secondary) / <alpha-value>)',
          action: '#EBEBEB',
          success: '#52B788',
          warning: '#fcd34d',
          danger: '#ef4444'
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
