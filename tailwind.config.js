/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
       container:{
          center: true
       },
       spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}

