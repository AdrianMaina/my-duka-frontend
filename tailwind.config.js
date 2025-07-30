/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0077B6',
        'accent-yellow': '#FFD60A',
        'support-green': '#00B894',
        'soft-gray': '#F5F5F5',
        'alert-red': '#E63946',
        'text-dark': '#4A4A4A',
        'text-light': '#FFFFFF',
        'border-color': '#e0e0e0',
      }
    },
  },
  plugins: [],
}
