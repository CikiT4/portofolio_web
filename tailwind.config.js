/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './main.jsx', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#F5EFEB',  // Lightest beige (Main background)
          900: '#EAE1D9',  // Secondary background
          800: '#E1D7CD',  // Cards / Sections
          700: '#D1C4B8',
          600: '#BCAFA4',
          500: '#A4968C',
          400: '#8A7B72',  // Subtext
          300: '#605147',  // Main readable text
          200: '#42362E',
          100: '#2D231E',  // Darkest text / headings
        },
        gold: {
          DEFAULT: '#8B4332',      // Reddish brown main accent
          light: '#A35441',
          dark: '#6E3224',
          muted: 'rgba(139, 67, 50, 0.15)',
        }
      },
      fontFamily: {
        display: ['"Helvetica"', 'Arial', 'sans-serif'],
        sans: ['"Helvetica"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in': 'slideIn 0.6s ease forwards',
        'bar-fill': 'barFill 1.2s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        barFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: []
}
