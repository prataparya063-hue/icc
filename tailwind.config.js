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
        background: '#f0f4f9',
        foreground: '#1f1f1f',
        card: '#ffffff',
        'card-foreground': '#1f1f1f',
        primary: '#0b57d0',
        'primary-foreground': '#ffffff',
        muted: '#e8f0fe',
        'muted-foreground': '#444746',
        border: '#e0e0e0',
      }
    },
  },
  plugins: [],
}
