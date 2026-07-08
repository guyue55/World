// 用途：灯塔推荐引擎，基于公开节点、路径和关系生成推荐

import type { Node, Path, Relation } from './types'
import { isPublicVisible } from './visibility'

export type Recommendation = {
  type: 'node' | 'path'
  node?: { slug: string; title: string; worldTitle?: string; href: string; summary: string | undefined }
  path?: { id: string; title: string; href: string; description: string }
  reason: string
}

export function getRecommendationsForNode(
  currentNode: Node,
  allNodes: Node[],
  allPaths: Path[],
  allRelations: Relation[],
  limit = 4,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  const sameAreaNodes = allNodes
    .filter((n) => n.areaId === currentNode.areaId && n.id !== currentNode.id && isPublicVisible(n.visibility))
    .slice(0, 2)

  for (const n of sameAreaNodes) {
    recommendations.push({
      type: 'node',
      node: { slug: n.slug, title: n.title, worldTitle: n.worldTitle ?? undefined, href: `/node/${n.slug}`, summary: n.summary ?? undefined },
      reason: `同属一个区域，主题相关。`,
    })
  }

  const relatedNodeIds = new Set(
    allRelations
      .filter((r) => r.from === currentNode.id || r.to === currentNode.id)
      .map((r) => (r.from === currentNode.id ? r.to : r.from)),
  )

  const relatedNodes = allNodes
    .filter((n) => relatedNodeIds.has(n.id) && isPublicVisible(n.visibility))
    .slice(0, 2)

  for (const n of relatedNodes) {
    recommendations.push({
      type: 'node',
      node: { slug: n.slug, title: n.title, worldTitle: n.worldTitle ?? undefined, href: `/node/${n.slug}`, summary: n.summary ?? undefined },
      reason: `通过关系星线相连。`,
    })
  }

  return recommendations.slice(0, limit)
}

export function getRecommendationsForHome(
  allNodes: Node[],
  allPaths: Path[],
  limit = 4,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  const firstPath = allPaths.find((p) => p.audience === 'first-time' && p.visibility === 'public')
  if (firstPath) {
    recommendations.push({
      type: 'path',
      path: { id: firstPath.id, title: firstPath.title, href: `/paths/${firstPath.id}`, description: firstPath.description },
      reason: `推荐第一次到访的旅人从这条路径开始。`,
    })
  }

  const featuredNodes = allNodes
    .filter((n) => isPublicVisible(n.visibility) && (n.featured?.representative || n.featured?.home))
    .slice(0, 3)

  for (const n of featuredNodes) {
    recommendations.push({
      type: 'node',
      node: { slug: n.slug, title: n.title, worldTitle: n.worldTitle ?? undefined, href: `/node/${n.slug}`, summary: n.summary ?? undefined },
      reason: `精选代表节点，适合快速了解世界全貌。`,
    })
  }

  return recommendations.slice(0, limit)
}
