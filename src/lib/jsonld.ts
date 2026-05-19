import type { Node } from './types'
import { site } from './site'

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: 'zh-CN',
  }
}

export function nodeArticleJsonLd(node: Node) {
  return {
    '@context': 'https://schema.org',
    '@type': node.type === 'project' ? 'CreativeWork' : 'Article',
    headline: node.title,
    alternativeHeadline: node.worldTitle,
    description: node.summary,
    datePublished: node.createdAt,
    dateModified: node.updatedAt ?? node.createdAt,
    keywords: node.tags.join(', '),
    author: {
      '@type': 'Person',
      name: site.author,
    },
    mainEntityOfPage: new URL(`/node/${node.slug}`, site.url).toString(),
  }
}
