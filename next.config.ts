import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
  distDir: process.env.WORLDOS_DIST_DIR || '.next',
  images: {
    qualities: [78, 82],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  eslint: {
    // lint is enforced by npm run lint; keep build focused on production compilation.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // type safety is enforced by npm run typecheck before build.
    ignoreBuildErrors: true,
  },
  outputFileTracingExcludes: {
    '/*': ['.git/**/*', 'docs/**/*', 'reports/**/*', 'coverage/**/*', '.next/**/*', 'node_modules/**/*'],
    '/api/**/*': ['.git/**/*', 'docs/**/*', 'reports/**/*', 'coverage/**/*', '.next/**/*', 'node_modules/**/*'],
  },
  experimental: {
    mdxRs: true,
    cpus: 2,
  },
  async redirects() {
    return [
      { source: '/world-map', destination: '/atlas', permanent: true },
      { source: '/time-river', destination: '/timeline', permanent: true },
      { source: '/lighthouse', destination: '/ask', permanent: true },
      { source: '/r8-public', destination: '/status', permanent: true },
      { source: '/world', destination: '/atlas', permanent: true },
      { source: '/r2-world', destination: '/atlas', permanent: true },
      { source: '/r3-content-life', destination: '/archive', permanent: true },
      { source: '/r4-creator', destination: '/forbidden', permanent: true },
      { source: '/r5-lighthouse', destination: '/ask', permanent: true },
      { source: '/r6-service', destination: '/forbidden', permanent: true },
      { source: '/r7-evolution', destination: '/forbidden', permanent: true },
      { source: '/private-archive', destination: '/forbidden', permanent: false },
      { source: '/private-archive/:path*', destination: '/forbidden', permanent: false },
    ]
  },
}

export default withMDX(nextConfig)
