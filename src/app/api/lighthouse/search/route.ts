// 用途：灯塔搜索 API，只读公开世界索引，返回匹配节点

import { NextResponse } from 'next/server'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'

export const dynamic = 'force-static'

const MAX_RESULTS = 20

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()

  if (!q) {
    return NextResponse.json({ results: [], query: '' })
  }

  const publicWorld = getPublicWorldObjectIndex()
  const results = publicWorld.nodeRefs
    .filter((node) => {
      const title = node.title.toLowerCase()
      return title.includes(q)
    })
    .slice(0, MAX_RESULTS)
    .map((node) => ({
      id: node.id,
      slug: node.slug,
      title: node.title,
      href: node.href,
      areaTitle: node.areaTitle,
    }))

  return NextResponse.json({ results, query: q })
}
