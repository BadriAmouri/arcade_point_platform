/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cyber: ['Cyberjunkies', 'sans-serif'],
        Ocr : ['OCR ' , 'sans-serif'],
      },
    },
  },
  plugins: [],
}