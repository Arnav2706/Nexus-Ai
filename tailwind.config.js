/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#16161e',
        primary: '#3b82f6',
        accent: '#8b5cf6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(10, 10, 15, 0) 50%)',
      }
    },
  },
  plugins: [],
}
