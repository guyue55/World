import type { Node } from './types'
import { site } from './site'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildRssFeed(nodes: Node[]) {
  const items = nodes
    .map((node) => {
      const url = new URL(`/node/${node.slug}`, site.url).toString()
      const pubDate = new Date(node.updatedAt ?? node.createdAt).toUTCString()

      return `
        <item>
          <title>${escapeXml(node.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid>${escapeXml(url)}</guid>
          <pubDate>${escapeXml(pubDate)}</pubDate>
          <description>${escapeXml(node.summary ?? '')}</description>
        </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escapeXml(site.title)}</title>
      <link>${escapeXml(site.url)}</link>
      <description>${escapeXml(site.description)}</description>
      <language>zh-CN</language>
      ${items}
    </channel>
  </rss>`
}
