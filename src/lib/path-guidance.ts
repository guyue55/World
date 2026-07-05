import pathProductizationContract from '../../data/domains/experience/path-productization-contract.json'
import pathQualityGate from '../../data/domains/experience/path-quality-gate.json'
import type { Node, Path, PathAudience } from './types'
import { getNodeBySlug } from './nodes'
import { getAllPaths, getPathById } from './paths'
import { isPublicVisible } from './visibility'

const audienceCopy: Record<PathAudience, { label: string; description: string }> = {
  'first-time': {
    label: '第一次来',
    description: '不用先理解全部世界，按短路径完成一次抵达。',
  },
  tech: {
    label: '技术与 AI',
    description: '从工程、AI、Agent 和工具链进入技术星域。',
  },
  life: {
    label: '生活与记忆',
    description: '从记忆、片段和低光状态进入柔软的一面。',
  },
  creator: {
    label: '创作者视角',
    description: '理解世界如何被维护、策展和长期演化。',
  },
  'deep-dive': {
    label: '深潜结构',
    description: '适合想看清节点、星线、边界和系统骨架的人。',
  },
}

export function getPathProductizationContract() {
  return pathProductizationContract
}

export function getPathQualityGate() {
  return pathQualityGate
}

export function getPathNodes(path: Path): Node[] {
  return path.nodeSlugs
    .map((slug) => getNodeBySlug(slug))
    .filter((node): node is Node => Boolean(node && isPublicVisible(node.visibility)))
}

export function getNextPaths(path: Path): Path[] {
  return (path.nextPathIds ?? [])
    .map((id) => getPathById(id))
    .filter((item): item is Path => Boolean(item && item.visibility === 'public'))
}

export function getPathEntryNode(path: Path): Node | undefined {
  return getPathNodes(path)[0]
}

export function getAudienceSummary(paths: Path[]) {
  return Array.from(new Set(paths.map((path) => path.audience))).map((audience) => ({
    audience,
    label: formatPathAudience(audience),
    description: describePathAudience(audience),
    count: paths.filter((path) => path.audience === audience).length,
  }))
}

export function getRecommendedPathOrder(paths: Path[]) {
  const order = ['first-time', 'tech', 'life', 'creator', 'deep-dive']
  return [...paths].sort((a, b) => order.indexOf(a.audience) - order.indexOf(b.audience) || a.title.localeCompare(b.title))
}

export function formatPathAudience(audience: PathAudience) {
  return audienceCopy[audience]?.label ?? audience
}

export function describePathAudience(audience: PathAudience) {
  return audienceCopy[audience]?.description ?? '按自己的兴趣选择一条公开路径。'
}
