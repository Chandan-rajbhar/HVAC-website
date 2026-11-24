/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        steel: {
          DEFAULT: '#6D6E71',
          50: '#F5F5F6',
          100: '#E6E6E8',
          200: '#CBCDD0',
          300: '#B0B2B6',
          400: '#8A8C90',
          500: '#6D6E71', // PDF Primary Steel Gray
          600: '#58595C',
          700: '#434446',
          800: '#2E2E30',
          900: '#1D1E1F',
          950: '#121314',
        },
        military: {
          DEFAULT: '#A4A77E', // PDF Accent Light Military Green
          50: '#F6F7EE',
          100: '#EBEDDB',
          200: '#D7DAC0',
          300: '#C0C59F',
          400: '#B1B58C',
          500: '#A4A77E',
          600: '#898C64',
          700: '#6C6F4D',
          800: '#515339',
          900: '#383A27',
          950: '#232418',
        },
        tan: {
          DEFAULT: '#C2B59B', // PDF Highlight Army Tan
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#E7DCstandard',
          300: '#D9CBBB',
          400: '#CEBEA8',
          500: '#C2B59B',
          600: '#A6987E',
          700: '#827660',
          800: '#5F5645',
          900: '#3F392E',
        },
        camo: {
          battleship: '#7C887E',
          sage: '#91967F',
          sand: '#BAB79F',
          desert: '#D3D2CD',
          warmtaupe: '#A08D83',
          darkslate: '#726870',
          darkbrown: '#4A4132',
          olive: '#656039',
          deepbronze: '#3B412E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
