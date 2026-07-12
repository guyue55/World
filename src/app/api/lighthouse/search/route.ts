// 用途：灯塔搜索 API，只读公开世界索引，返回匹配节点

import { NextResponse } from 'next/server'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'

export const dynamic = 'force-static'

const MAX_RESULTS = 20

function scoreNode(query: string, title: string, summary: string, contentSearchText: string, areaTitle: string): number {
  const q = query.toLowerCase()
  const t = title.toLowerCase()
  const s = summary.toLowerCase()
  const a = areaTitle.toLowerCase()
  const c = contentSearchText.toLowerCase()
  let score = 0
  if (t.includes(q)) score += 10
  if (t.startsWith(q)) score += 5
  if (s.includes(q)) score += 3
  if (a.includes(q)) score += 2
  if (c.includes(q)) score += 2
  return score
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()

  if (!q) {
    return NextResponse.json({ results: [], query: '', total: 0 })
  }

  const publicWorld = getPublicWorldObjectIndex()
  const results = publicWorld.nodeRefs
    .map((node) => {
      const summary = node.aiReadableSummary
      const score = scoreNode(q, node.title, summary, node.contentSearchText, node.areaTitle)
      return { node, summary, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((item) => ({
      id: item.node.id,
      slug: item.node.slug,
      title: item.node.title,
      summary: item.summary,
      href: item.node.href,
      areaTitle: item.node.areaTitle,
      areaId: item.node.areaId,
      score: item.score,
      contentRevisionSha256: item.node.contentRevisionSha256,
    }))

  return NextResponse.json({ results, query: q, total: results.length })
}
