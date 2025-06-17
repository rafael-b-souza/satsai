import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        lg: '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
