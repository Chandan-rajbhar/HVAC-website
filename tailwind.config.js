import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [tailwindcssAnimate],
}
