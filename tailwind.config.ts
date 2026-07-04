import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#25302a',
        paper: '#f7f1e6',
        mist: '#d8e2d0',
        moss: '#71816d',
        lake: '#7d9aa2',
        night: '#17211d',
        gold: '#c5a46d',
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
