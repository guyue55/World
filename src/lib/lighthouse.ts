import lighthouseProductizationContract from '../../data/domains/ai/lighthouse-productization-contract.json'
import lighthouseQualityGate from '../../data/domains/ai/lighthouse-quality-gate.json'
import lighthousePrompts from '../../data/domains/ai/lighthouse-prompts.json'
import type { Node, Path } from './types'
import { isPublicVisible } from './visibility'

export type LighthousePrompt = {
  id: string
  label: string
  intent: 'path' | 'archive' | 'atlas'
  href: string
  tags: string[]
}

export function getLighthouseProductizationContract() {
  return lighthouseProductizationContract
}

export function getLighthouseQualityGate() {
  return lighthouseQualityGate
}

export function getLighthousePrompts(): LighthousePrompt[] {
  return lighthousePrompts.prompts as LighthousePrompt[]
}

export function getLighthouseRecommendedNodes(nodes: Node[], limit = 6) {
  const preferredTags = new Set(['ai', 'world', 'lighthouse', 'agent', 'no-ai', 'atlas', 'space', 'engineering'])

  return nodes
    .filter((node) => isPublicVisible(node.visibility))
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => preferredTags.has(tag)).length + (a.featured?.representative ? 2 : 0)
      const bScore = b.tags.filter((tag) => preferredTags.has(tag)).length + (b.featured?.representative ? 2 : 0)

      return bScore - aScore || a.title.localeCompare(b.title)
    })
    .slice(0, limit)
}

export function getLighthouseRecommendedPaths(paths: Path[], limit = 3) {
  const order = ['first-time', 'tech', 'deep-dive', 'creator', 'life']

  return [...paths]
    .sort((a, b) => order.indexOf(a.audience) - order.indexOf(b.audience) || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export function getLighthouseStats(nodes: Node[], paths: Path[]) {
  return {
    recommendedNodeCount: getLighthouseRecommendedNodes(nodes).length,
    recommendedPathCount: getLighthouseRecommendedPaths(paths).length,
    promptCount: getLighthousePrompts().length,
  }
}
