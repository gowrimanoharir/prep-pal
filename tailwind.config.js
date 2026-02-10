/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          darkest: '#011627',
          dark: '#0B2942',
          medium: '#1D3B53',
          light: '#0E2A47',
          overlay: '#01203F',
        },
        primary: {
          DEFAULT: '#82AAFF',
          hover: '#5CA7FF',
          light: '#A7C5FF',
        },
        success: {
          DEFAULT: '#ADDB67',
          dark: '#8DC149',
        },
        error: {
          DEFAULT: '#F78C6C',
          dark: '#E5735B',
        },
        warning: {
          DEFAULT: '#FFCB6B',
          dark: '#E5B657',
        },
        purple: {
          DEFAULT: '#C792EA',
          dark: '#B07DD6',
        },
        teal: '#7FDBCA',
        text: {
          primary: '#D6DEEB',
          secondary: '#A599E9',
          tertiary: '#637777',
          accent: '#ECC48D',
        },
        border: {
          default: '#0E2A47',
          subtle: '#1A3A52',
          focus: '#82AAFF',
        },
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(130, 170, 255, 0.3)',
        'glow-success': '0 0 20px rgba(173, 219, 103, 0.3)',
        'glow-error': '0 0 20px rgba(247, 140, 108, 0.3)',
        'glow-warning': '0 0 20px rgba(255, 203, 107, 0.3)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'elevated': '0 4px 16px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
