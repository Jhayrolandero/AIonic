/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Mona_Sans" : ["Mona Sans"],
        "lato" : ["Lato"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}