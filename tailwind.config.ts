import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy -> midnight blue foundation
        night: {
          950: '#020617',
          900: '#04102a',
          800: '#07152f',
          700: '#0b2447',
          600: '#123566',
        },
        // Electric cyan accent
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Restrained blue-violet secondary accent
        violetish: {
          400: '#818cf8',
          500: '#6366f1',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -12px rgba(34, 211, 238, 0.35)',
        card: '0 18px 40px -24px rgba(2, 6, 23, 0.9)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'trace-line': {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 3.2s ease-in-out infinite',
        'trace-line': 'trace-line 4s linear infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
