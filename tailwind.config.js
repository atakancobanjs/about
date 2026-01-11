/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
"xl": ["0 20px 13px rgba(127, 0, 255,.5)"],
        "2xl": [ "0 25px 25px rgba(127, 0, 255,.5)" ],
        '3xl': [
          '0 25px 35px rgba(127, 0, 255,.5)',
        ],
        '4xl': [
            '0 35px 35px rgb(127, 0, 255)',
            '0 45px 65px rgb(127, 0, 255)'
        ]
      }
    },
  },
  plugins: [],
}

