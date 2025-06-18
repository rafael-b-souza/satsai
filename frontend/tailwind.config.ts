import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,css,js,jsx,md,mdx}',
    './node_modules/@myorg/ui/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@myorg/ui/dist/**/*.{html,css}',
    './node_modules/@myorg/ui/dist/**/*.{md,mdx}',
    './node_modules/@myorg/ui/dist/**/*.{vue,vue3}',
    './node_modules/@myorg/ui/dist/**/*.{svelte,svelte3}',
    './node_modules/@myorg/ui/dist/**/*.{astro,astro3}',
    './node_modules/@myorg/ui/dist/**/*.{elm,elm3}',
    './node_modules/@myorg/ui/dist/**/*.{lit,lit-html}',
    './node_modules/@myorg/ui/dist/**/*.{solid,solid-js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
      },
      borderColor: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
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
