import type { MetadataRoute } from 'next'
import { getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { PRODUCT_PUBLIC_ROUTES } from '@/lib/product-routes'
import { site } from '@/lib/site'

const sitemapStaticRoutes = PRODUCT_PUBLIC_ROUTES.filter((route) => route !== '/status')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticItems = sitemapStaticRoutes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.75,
  }))

  const nodeItems = getPublicNodes().map((node) => ({
    url: new URL(`/node/${node.slug}`, site.url).toString(),
    lastModified: node.updatedAt ? new Date(node.updatedAt) : new Date(node.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.62,
  }))

  const pathItems = getAllPaths().map((path) => ({
    url: new URL(`/paths/${path.id}`, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.58,
  }))

  return [...staticItems, ...nodeItems, ...pathItems]
}
