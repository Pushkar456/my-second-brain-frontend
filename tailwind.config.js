/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        font1: 'Manrope', //for headers, body, etc
        font2: 'quintessential' //for design bits
      },
      colors: {
        primary: {
          1: "blue-500",
          2: "blue-400"
        },
        secondary: {
          1: "blue-600",
          2 : "blue-500"
        },
        cardColor: {
          1: 'black',
          2: 'black',
          3: 'black'
        },
        border: "black",
        logout:{
          1: 'rgb(0 20 28)',
          2: "rgb(0 28 8)"
        },
        text: "white",
        darkBackground: "#d62828"
    },
  },
  plugins: [],
  }
}