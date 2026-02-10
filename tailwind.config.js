/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#475569',
        surface: '#334155',
        'surface-elevated': '#64748B',
        border: '#475569',
        primary: '#3B82F6',
        'primary-hover': '#2563EB',
        'primary-light': '#60A5FA',
        success: '#10B981',
        error: '#FB7185',
        warning: '#F59E0B',
        selected: '#FCD34D',
        'text-primary': '#F1F5F9',
        'text-secondary': '#CBD5E1',
        'text-tertiary': '#94A3B8',
      },
    },
  },
  plugins: [],
}
