/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './src/**/*.{js,ts,jsx,tsx}',
  ],
 theme: {
    extend: {
      fontFamily: {
        custom: ['monospace','Roboto','Times New Roman'], 
      },
      fontSize: {
        'tiny': '0.7rem', // Define a custom font size named 'tiny'
      },
    },
  },
  plugins: [],
  purge: false,
}

