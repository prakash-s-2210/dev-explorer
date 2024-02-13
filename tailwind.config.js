/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        'white': '0 1px 6px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}