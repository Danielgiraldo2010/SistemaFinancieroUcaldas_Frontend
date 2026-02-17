/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ucaldas-blue': '#002D57',
        'ucaldas-gold': '#C5A059',
        'ucaldas-bg': '#F4F7F9',
      },
    },
  },
  plugins: [],
};
