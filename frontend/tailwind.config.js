/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0F2621',
        surface: '#F4F7F6',
        line: '#DAE3E0',
        clinical: {
          50: '#EAF3F1',
          100: '#D3E6E2',
          300: '#7FB3A9',
          500: '#0B5D52',
          600: '#094A42',
          700: '#073A34',
        },
        risk: {
          50: '#FBEAE8',
          300: '#DE9089',
          500: '#B3392F',
          600: '#8F2C25',
        },
        clear: {
          50: '#E9F5EE',
          300: '#84C7A2',
          500: '#1B7A4A',
          600: '#15613B',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 38, 33, 0.06), 0 8px 24px -12px rgba(15, 38, 33, 0.18)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
