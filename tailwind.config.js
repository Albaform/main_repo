/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'min-s': { min: '320px' },
        'max-s': { max: '320px' },
        'min-xs': { min: '480px' },
        'max-xs': { max: '480px' },
        'min-md': { min: '768px' },
        'max-md': { max: '768px' },
        'min-lg': { min: '1199px' },
        'max-lg': { max: '1199px' },
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
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
