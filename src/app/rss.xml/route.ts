import { getPublicNodes } from '@/lib/nodes'

export async function GET() {
  const nodes = getPublicNodes()

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>古月浮屿</title>
    <link>https://worldos.local</link>
    <description>一张书桌，连接一片星河。</description>
    ${nodes
      .slice(0, 20)
      .map(
        (node) => `
    <item>
      <title>${node.title}</title>
      <link>https://worldos.local/node/${node.slug}</link>
      <description>${node.summary}</description>
      <pubDate>${new Date(node.date ?? Date.now()).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
