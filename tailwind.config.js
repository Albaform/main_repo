/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      plugins: [require('@tailwindcss/line-clamp')],
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        gray: '0 1px 4px 2px rgba(152,152,152,0.08)',
      },
      screens: {
        s: '320px',
        xs: '480px',
        md: '768px',
        lg: '1199px',
        xlg: '1920px',
      },
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        red: 'var(--red)',

        black100: 'var(--black100)',
        black200: 'var(--black200)',
        black300: 'var(--black300)',
        black400: 'var(--black400)',
        black500: 'var(--black500)',

        gray100: 'var(--gray100)',
        gray200: 'var(--gray200)',
        gray300: 'var(--gray300)',
        gray400: 'var(--gray400)',
        gray500: 'var(--gray500)',

        primary: {
          orange100: 'var(--primary-orange100)',
          orange200: 'var(--primary-orange200)',
          orange300: 'var(--primary-orange300)',
          orange400: 'var(--primary-orange400)',
          orange500: 'var(--primary-orange500)',
          blue100: 'var(--primary-blue100)',
          blue200: 'var(--primary-blue200)',
          blue300: 'var(--primary-blue300)',
        },

        background: {
          100: 'var(--background100)',
          200: 'var(--background200)',
          300: 'var(--background300)',
        },

        line: {
          100: 'var(--line100)',
          200: 'var(--line200)',
        },
      },
      keyframes: {
        pulseStretchLeft: {
          '0%, 100%': {
            transform: 'scaleX(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scaleX(0.6)',
            opacity: '0.4',
          },
        },
        pulseStretchLeftReserve: {
          '0%': {
            transform: 'scaleX(0.6)',
            opacity: '0.4',
          },
          '50%': {
            transform: 'scaleX(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scaleX(0.6)',
            opacity: '0.4',
          },
        },
      },
      animation: {
        pulseStretchLeft: 'pulseStretchLeft 3.5s ease-in-out infinite',
        pulseStretchLeftReserve:
          'pulseStretchLeftReserve 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const delays = {
        '.delay-0': { animationDelay: '0s' },
        '.delay-100': { animationDelay: '0.1s' },
        '.delay-200': { animationDelay: '0.2s' },
        '.delay-300': { animationDelay: '0.3s' },
        '.delay-400': { animationDelay: '0.4s' },
        '.delay-500': { animationDelay: '0.5s' },
      };
      addUtilities(delays);
    },
  ],
};
