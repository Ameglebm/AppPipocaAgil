/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 1px 2px rgba(12, 12, 13, 0.30)',
      }
    },
  },
  plugins: [],
}