/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: { yellow: '#fbbf24', purple: '#7C3AED' },
        gray: { custom: '#1f2937', light: '#f3f4f6' }
      },
      spacing: { 'header-x': '5rem', 'button-x': '1.25rem', 'button-y': '0.5rem' },
      borderRadius: { button: '0.375rem' }
    }
  },
  plugins: [],
  safelist: ['bg-primary-yellow','bg-primary-purple']
};
