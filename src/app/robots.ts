import type { MetadataRoute } from 'next'
import { PRODUCT_INTERNAL_EXACT_ROUTES, PRODUCT_PRIVATE_ROUTES } from '@/lib/product-routes'
import { site } from '@/lib/site'

const blockedRoutes = [
  ...PRODUCT_PRIVATE_ROUTES,
  ...PRODUCT_INTERNAL_EXACT_ROUTES,
  '/forbidden',
  '/_legacy/',
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
      disallow: Array.from(new Set(blockedRoutes)),
    },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  }
}
