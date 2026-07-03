import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

const nextConfig: NextConfig = {
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
}

export default withMDX(nextConfig)
