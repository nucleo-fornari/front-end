const { paste } = require('@testing-library/user-event/dist/paste');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    colors: {
      blue: {
        main: '#3285fa',
        pastel: '#82aae5',
        dark: '#001438',
      },
      purple: {
        main: '#7d2afa',
        pastel: '#c7a8e7',
        dark: '#2a2041',
       claro: '#e6d4f9'
      },
      white: {
        main: '#edebeb',
        cinzabg: '#f2f0f0'
      },
      black: {
        main: '#141414'
      }     
    },

    extend: {
      width:{
        '100': '100px',
        '500':'500px'

      },
      height:{
        '67': '67px',
        '400':'400px'
      },
      backgroundImage: {
        'radial-custom': 'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(130, 170, 229, 1) 35%, rgba(130, 170, 229, 1) 68%, rgba(255, 255, 255, 1) 100%)',
      },
    },
  },
  plugins: [],
}

