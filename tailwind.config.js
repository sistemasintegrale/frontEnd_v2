/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");


module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

