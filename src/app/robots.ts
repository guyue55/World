import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

const privateAndOwnerRoutes = [
  '/forbidden',
  '/private-archive',
  '/private-ai',
  '/r4-creator',
  '/r6-service',
  '/r7-evolution',
  '/api/r6/',
  '/api/r7/maintenance',
  '/api/v2/vault',
  '/api/v2/audit',
  '/api/v2/export',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: privateAndOwnerRoutes,
    },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  }
}
