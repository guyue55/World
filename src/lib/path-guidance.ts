import pathProductizationContract from '../../data/path-productization-contract.json'
import pathQualityGate from '../../data/path-quality-gate.json'
import type { Node, Path } from './types'
import { getNodeBySlug } from './nodes'
import { getAllPaths, getPathById } from './paths'

export function getPathProductizationContract() {
  return pathProductizationContract
}

export function getPathQualityGate() {
  return pathQualityGate
}

export function getPathNodes(path: Path): Node[] {
  return path.nodeSlugs
    .map((slug) => getNodeBySlug(slug))
    .filter((node): node is Node => Boolean(node && node.visibility === 'public'))
}

export function getNextPaths(path: Path): Path[] {
  return (path.nextPathIds ?? [])
    .map((id) => getPathById(id))
    .filter((item): item is Path => Boolean(item))
}

export function getPathEntryNode(path: Path): Node | undefined {
  return getPathNodes(path)[0]
}

export function getAudienceSummary(paths: Path[]) {
  return Array.from(new Set(paths.map((path) => path.audience))).map((audience) => ({
    audience,
    count: paths.filter((path) => path.audience === audience).length,
  }))
}

export function getRecommendedPathOrder(paths: Path[]) {
  const order = ['first-time', 'tech', 'life', 'creator', 'deep-dive']
  return [...paths].sort((a, b) => order.indexOf(a.audience) - order.indexOf(b.audience) || a.title.localeCompare(b.title))
}
