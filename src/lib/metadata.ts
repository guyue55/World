import type { Metadata } from 'next'
import { site } from './site'

export function createPageMetadata({
  title,
  description,
  path = '/',
}: {
  title?: string
  description?: string
  path?: string
} = {}): Metadata {
  const pageTitle = title ? `${title}｜${site.name}` : site.title
  const pageDescription = description ?? site.description
  const url = new URL(path, site.url).toString()

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: site.keywords,
    authors: [{ name: site.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: site.name,
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
    },
  }
}
