/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Onest: ["Onest", "serif"],
      },
      colors: {
        "dowear-red": "#DE0F3F"
      },
    },
  },
  plugins: [],
}

