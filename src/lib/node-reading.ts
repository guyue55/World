import nodeReadingContract from '../../data/domains/experience/node-reading-contract.json'
import nodeReadingQualityGate from '../../data/domains/experience/node-reading-quality-gate.json'
import type { Node, Relation } from './types'
import { getNodeById, getPublicNodes } from './nodes'
import { getRelationsFrom, getRelationsTo } from './relations'
import { isPublicVisible } from './visibility'

export function getNodeReadingContract() {
  return nodeReadingContract
}

export function getNodeReadingQualityGate() {
  return nodeReadingQualityGate
}

export function getSameAreaNodes(node: Node, limit = 3): Node[] {
  return getPublicNodes()
    .filter((item) => item.id !== node.id && item.areaId === node.areaId)
    .slice(0, limit)
}

function relationReason(relation: Relation, fallback: string) {
  return relation.note ?? fallback
}

function visibleRelationItem(relation: Relation, direction: 'forward' | 'backlink') {
  const relatedNode = getNodeById(direction === 'forward' ? relation.to : relation.from)
  if (!relatedNode || !isPublicVisible(relatedNode.visibility)) return null

  return {
    node: relatedNode,
    reason: relationReason(
      relation,
      direction === 'forward'
        ? '这条星线从当前节点继续延展，适合沿着同一问题往前走。'
        : '这个节点回望当前内容，能帮助你理解它在世界里的上下文。',
    ),
  }
}

export function getNodeExplorationGroups(node: Node) {
  const forward = getRelationsFrom(node.id).map((relation) => visibleRelationItem(relation, 'forward')).filter((item): item is NonNullable<typeof item> => Boolean(item)).slice(0, 3)
  const backlinks = getRelationsTo(node.id).map((relation) => visibleRelationItem(relation, 'backlink')).filter((item): item is NonNullable<typeof item> => Boolean(item)).slice(0, 3)
  const sameArea = getSameAreaNodes(node, 3).map((item) => ({
    node: item,
    reason: '它位于同一片星域，适合作为关系暂时稀疏时的下一步。',
  }))

  return [
    {
      id: 'forward',
      title: '从这里可以去哪里',
      description: '前向星线代表这颗星继续照亮的方向。',
      items: forward,
    },
    {
      id: 'backlinks',
      title: '哪些节点提到它',
      description: '反向星线代表其他星体如何回望这里。',
      items: backlinks,
    },
    {
      id: 'same-area',
      title: '同一片星域',
      description: '如果星线暂时稀疏，就从同一片星域继续探索。',
      items: sameArea,
    },
  ]
}

export function estimateReadingMinutes(content: string | null) {
  if (!content) return null

  const words = content.replace(/```[\s\S]*?```/g, '').trim().split(/\s+/).filter(Boolean)
  const chineseChars = content.match(/[\u4e00-\u9fff]/g)?.length ?? 0
  const estimatedUnits = words.length + chineseChars / 2

  return Math.max(1, Math.ceil(estimatedUnits / 250))
}
