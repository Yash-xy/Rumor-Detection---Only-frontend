/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gov-Tech 2026 palette
        navy: {
          50:  '#e8eef6',
          100: '#c5d4e8',
          200: '#9fb8d8',
          300: '#789bc8',
          400: '#5a85bb',
          500: '#3d6fae',
          600: '#2e5a9a',
          700: '#1e3a5f',
          800: '#152c4a',
          900: '#0c1e35',
          950: '#060f1a',
        },
        teal: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        govbg: {
          dark:    '#0a0f1e',
          surface: '#111827',
          card:    '#1a2332',
          border:  '#1e3a5f',
          light:   '#f0f4f8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gov-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #1e3a5f 50%, #0d9488 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(30,58,95,0.4) 0%, rgba(13,148,136,0.1) 100%)',
        'hero-grid':
          'radial-gradient(circle at 20% 50%, rgba(13,148,136,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(30,58,95,0.3) 0%, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glow-teal': '0 0 20px rgba(13,148,136,0.4)',
        'glow-navy': '0 0 20px rgba(30,58,95,0.6)',
        'card': '0 2px 16px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
