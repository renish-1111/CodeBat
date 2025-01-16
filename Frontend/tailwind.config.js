/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('./assets/HomeBg.jpg')",
        'tut-bg': "url('./assets/tutbg.jpg')",
      }
    },
  },
  plugins: [],
}

