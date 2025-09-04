import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#00C7B1'
      },
      fontFamily: {
        sans: ['InterVar', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', 'Helvetica Neue', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: []
} satisfies Config
