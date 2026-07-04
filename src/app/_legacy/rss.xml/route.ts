import { getPublicNodes } from '@/lib/nodes'
import { buildRssFeed } from '@/lib/rss'

export const dynamic = 'force-static'

export function GET() {
  const feed = buildRssFeed(getPublicNodes())

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
