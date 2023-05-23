/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        satoshi:['Satoshi', 'sans-sherif'],
        inter: ['inter', 'sans-sherif']
        
      }
    },
  },
  plugins: [],
}