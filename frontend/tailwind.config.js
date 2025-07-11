/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    //extend: {},
    fontFamily:{
     Roboto:['Roboto','sans-serif'],
     Poppins:['Poppins','sans-serif'],
    },
    extend: {
      screens:{
       "1000px":"1050px",
       "1100":"1110",
       "800px":"800px",
       "1300px":"1300px",
       "400px":"400px"
      },
    },
  },
  plugins: [],
}

