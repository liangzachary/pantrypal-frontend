/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comiccat: ['ComicCAT', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],

      },
    },
  },
  plugins: [],
}
