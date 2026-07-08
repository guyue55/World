// 用途：灯塔问答 API，低光模式下返回静态推荐，不调用真实 AI

import { NextResponse } from 'next/server'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getRecommendationsForHome } from '@/lib/lighthouse-recommend'

export const dynamic = 'force-static'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const question = (searchParams.get('q') ?? '').trim()

  if (!question) {
    return NextResponse.json({ error: '问题不能为空' }, { status: 400 })
  }

  const publicWorld = getPublicWorldObjectIndex()
  const q = question.toLowerCase()

  const matchedNodes = publicWorld.nodeRefs
    .filter((n) => n.title.toLowerCase().includes(q))
    .slice(0, 3)

  let answer: string
  let sources: { slug: string; title: string; href: string }[]

  if (matchedNodes.length > 0) {
    answer = `根据公开世界索引，以下内容可能与你的问题相关：${matchedNodes.map((n) => n.title).join('、')}。你可以点击来源链接查看详情。`
    sources = matchedNodes.map((n) => ({ slug: n.slug, title: n.title, href: n.href }))
  } else {
    answer = '灯塔当前以低光模式运行，无法进行 AI 问答。以下是世界推荐，你可以通过档案馆或世界地图自行探索。'
    const recommendations = getRecommendationsForHome(publicWorld.nodes, publicWorld.paths, 4)
    sources = recommendations.map((r) => {
      if (r.type === 'node' && r.node) {
        return { slug: r.node.slug, title: r.node.title, href: r.node.href }
      }
      if (r.type === 'path' && r.path) {
        return { slug: '', title: r.path.title, href: r.path.href }
      }
      return { slug: '', title: '', href: '' }
    })
  }

  return NextResponse.json({ answer, sources, mode: 'low-light' })
}
