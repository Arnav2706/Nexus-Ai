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
        'primary-dark': '#2563eb',
        'accent-dark': '#7c3aed',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(10, 10, 15, 0) 60%)',
        'card-glow': 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 60%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(59,130,246,0.3)',
        'glow': '0 0 30px rgba(59,130,246,0.4)',
        'glow-lg': '0 0 60px rgba(59,130,246,0.5)',
        'glow-accent': '0 0 30px rgba(139,92,246,0.4)',
        'glass': '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '60px',
      },
    },
  },
  plugins: [],
}
