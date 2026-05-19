import type { MetadataRoute } from 'next'
import { getPublicNodes } from '@/lib/nodes'
import { getAllPaths } from '@/lib/paths'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/atlas',
    '/skeleton',
    '/timeline',
    '/archive',
    '/paths',
    '/ask',
    '/about',
    '/manifesto',
    '/status',
  ]

  const staticItems = staticRoutes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.7,
  }))

  const nodeItems = getPublicNodes().map((node) => ({
    url: new URL(`/node/${node.slug}`, site.url).toString(),
    lastModified: node.updatedAt ? new Date(node.updatedAt) : new Date(node.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const pathItems = getAllPaths().map((path) => ({
    url: new URL(`/paths/${path.id}`, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))

  return [...staticItems, ...nodeItems, ...pathItems]
}
