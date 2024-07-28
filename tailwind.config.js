/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('./public/assets/HomeBg.jpg')",
        'tut-bg': "url('./public/assets/tutbg.jpg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

