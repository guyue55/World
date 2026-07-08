// 用途：灯塔推荐引擎，基于公开节点、路径和关系生成推荐

import type { Node, Path, Relation } from './types'
import { isPublicVisible } from './visibility'

export type Recommendation = {
  type: 'node' | 'path'
  node?: { slug: string; title: string; worldTitle?: string; href: string; summary: string | undefined }
  path?: { id: string; title: string; href: string; description: string }
  reason: string
}

function sharedTags(a: Node, b: Node) {
  const bTags = new Set(b.tags)
  return a.tags.filter((tag) => bTags.has(tag)).slice(0, 3)
}

function relationReason(currentNode: Node, targetNode: Node, relations: Relation[]) {
  const relation = relations.find((item) =>
    (item.from === currentNode.id && item.to === targetNode.id)
    || (item.to === currentNode.id && item.from === targetNode.id),
  )
  if (relation?.note) return relation.note
  const tags = sharedTags(currentNode, targetNode)
  if (tags.length) return `共享 ${tags.join('、')} 标签，适合作为下一步阅读。`
  if (currentNode.areaId === targetNode.areaId) return `同属 ${currentNode.areaId} 区域，可以继续理解相邻主题。`
  return '由公开关系网络推荐，适合作为下一步探索。'
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
      reason: relationReason(currentNode, n, allRelations),
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
      reason: relationReason(currentNode, n, allRelations),
    })
  }

  const pathMatches = allPaths
    .filter((path) => path.visibility === 'public' && path.nodeSlugs.includes(currentNode.slug))
    .slice(0, 1)

  for (const path of pathMatches) {
    recommendations.push({
      type: 'path',
      path: { id: path.id, title: path.title, href: `/paths/${path.id}`, description: path.description },
      reason: `当前节点位于「${path.title}」路径中，可以沿路径继续阅读。`,
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
      reason: n.featured?.pathCore
        ? '路径核心节点，适合快速进入世界主线。'
        : `精选代表节点，覆盖 ${n.areaId} 区域，适合快速了解世界全貌。`,
    })
  }

  return recommendations.slice(0, limit)
}
