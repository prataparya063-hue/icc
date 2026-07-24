/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        card: '#171717',
        'card-foreground': '#ededed',
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        muted: '#262626',
        'muted-foreground': '#a3a3a3',
        border: '#262626',
      }
    },
  },
  plugins: [],
}
