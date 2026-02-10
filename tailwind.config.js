/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4338ca', // Deep Indigo
        'secondary': '#F9FAFB', // Soft Gray Surface
        'accent': '#FF5841', // Coral
        'dark': '#111827',
        'light': '#F3F3F3',
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        'primary': ["Montserrat", "sans-serif"],
        'secondary': ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
}

