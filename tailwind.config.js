/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(16rem, 18rem) 1fr',
      },

      keyframes: {
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: {
            transform: 'translateY(-100%)',
          },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        hide: 'hide 200ms ease-in',
        slideIn: 'slideIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
}
