/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "urbanist-medium": ["Urbanist-Medium"], 
        "urbanist-regular": ["Urbanist-Regular"],
      },
    },
  },
  plugins: [],
};
