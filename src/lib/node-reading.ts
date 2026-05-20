import nodeReadingContract from '../../data/domains/experience/node-reading-contract.json'
import nodeReadingQualityGate from '../../data/domains/experience/node-reading-quality-gate.json'
import type { Node } from './types'
import { getPublicNodes } from './nodes'
import { getBacklinks, getForwardLinks } from './backlinks'

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

export function getNodeExplorationGroups(node: Node) {
  const forward = getForwardLinks(node.id).slice(0, 3)
  const backlinks = getBacklinks(node.id).slice(0, 3)
  const sameArea = getSameAreaNodes(node, 3)

  return [
    {
      id: 'forward',
      title: '从这里可以去哪里',
      description: '前向星线代表这颗星继续照亮的方向。',
      nodes: forward,
    },
    {
      id: 'backlinks',
      title: '哪些节点提到它',
      description: '反向星线代表其他星体如何回望这里。',
      nodes: backlinks,
    },
    {
      id: 'same-area',
      title: '同一片星域',
      description: '如果星线暂时稀疏，就从同一片星域继续探索。',
      nodes: sameArea,
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
