import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)',
        mist: 'var(--color-mist)',
        moss: 'var(--color-moss)',
        lake: 'var(--color-lake)',
        night: 'var(--color-night)',
        gold: 'var(--color-gold)',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(39, 48, 42, 0.12)',
      },
      borderRadius: {
        world: '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
