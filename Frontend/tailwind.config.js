/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'ivory-50': '#f9f6f0',
        'charcoal-800': '#33312e',
        'charcoal-600': '#4a4845',
        'charcoal-300': '#c0beb9',
        'terracotta-500': '#b36a5e',
        'terracotta-600': '#9c5a4e',
        'terracotta-700': '#854a3e',
        'sage-500': '#8a9b6e',
        'sage-600': '#738557'
      }
    },
  },
  plugins: [],
}