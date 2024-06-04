/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(16rem, 18rem) 1fr',
      },
    },
    plugins: [],
  },
}
