/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('./public/assets/HomeBg.jpg')",
        'tut-bg': "url('./public/assets/tutbg.jpg')",
      }
    },
  },
  plugins: [],
}

