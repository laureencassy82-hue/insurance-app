/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Angular templates
  ],
  theme: {
    extend: {
      fontFamily: {
      khmer: ['"Noto Sans Khmer"', 'sans-serif'],
    },

      colors: {
        // Primary colors
        'primary-yellow': '#fbbf24', // yellow accent
        'primary-purple': '#6a32cb', // purple accent
        'secondary-purple': '#4B0082', // darker purple
        'gray-custom': '#1f2937',
        'gray-light': '#f3f4f6',
        'background-lightBlue': '#D6E6F5'
      },
      spacing: {
        'header-x': '5rem',    // desktop header padding
        'button-x': '1.25rem', // button padding-x
        'button-y': '0.5rem',  // button padding-y
        '10xl': '1440px'       // optional max width
      },
      borderRadius: {
        'button': '0.375rem',
        'card': '1rem'
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0,0,0,0.1)',
        'card-hover': '0 6px 12px rgba(0,0,0,0.15)'
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      }
    }
  },
  plugins: [],
  safelist: [
    'bg-primary-yellow',
    'bg-primary-purple',
    'text-primary-purple',
    'text-secondary-purple',
    'bg-background-lightBlue'
  ]
}
