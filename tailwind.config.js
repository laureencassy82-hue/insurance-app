/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          yellow: '#fbbf24', // yellow accent
          purple: '#6a32cbff', // purple accent
        },
        secondary: {
          purple: '#4B0082', // darker purple
        },
        gray: {
          custom: '#1f2937',
          light: '#f3f4f6'
        },
        background: {
          lightBlue: '#D6E6F5'
        }
      },
      spacing: {
        'header-x': '5rem',
        'button-x': '1.25rem',
        'button-y': '0.5rem',
        '10xl': '1440px' // for max width usage
      },
      borderRadius: {
        button: '0.375rem',
        card: '1rem'
      },
      boxShadow: {
        card: '0 4px 6px rgba(0,0,0,0.1)',
        cardHover: '0 6px 12px rgba(0,0,0,0.15)'
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
