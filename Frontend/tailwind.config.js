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
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(180, 180, 220, 0.3)',
        'soft-lg': '0 6px 30px -4px rgba(180, 180, 220, 0.4)',
        'soft-xs': '0 2px 10px -1px rgba(180, 180, 220, 0.2)'
      }
    },
  },
  plugins: [],
}