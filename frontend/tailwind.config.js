/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sam: {
          DEFAULT: '#C1440E',
          hover: '#a33a0c',
          light: '#C1440E18',
        },
        cream: '#F5EFE6',
        coral: '#E8735A',
        salmon: '#D4521A',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}