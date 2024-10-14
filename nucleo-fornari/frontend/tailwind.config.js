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
        gray: '#f2f0f0'
      },
      black: {
        main: '#141414'
      }     
    },
    extend: {
      height: {
        '10':'10%',
        '67':'67px'
      },
      width:{
        '100' : '100px'
      }
    },
  },
  plugins: [],
}

