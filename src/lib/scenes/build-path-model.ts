import { getRecommendedPathOrder } from '@/lib/path-guidance'
import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getWorldSceneAsset } from '@/lib/world-scene-assets'
import publicCuration from '../../../data/domains/content/world-public-curation.json'

export type JourneyStepView = {
  index: number
  slug: string
  title: string
  summary: string
  areaId: string
  areaTitle: string
  href: string
  x: number
  y: number
  mobileY: number
  contentRevisionSha256: string | null
}

export type JourneyPathView = {
  id: string
  href: string
  title: string
  description: string
  audienceLabel: string
  estimatedMinutes: number
  areaTitles: string[]
  steps: JourneyStepView[]
  routeD: string
  routeIndex: number
}

export type PathsOverviewModel = {
  title: string
  arrivalLine: string
  featured: JourneyPathView[]
  allPaths: JourneyPathView[]
  asset: ReturnType<typeof getWorldSceneAsset>
}

export type PathDetailModel = JourneyPathView & {
  nextPaths: Array<{ id: string; href: string; title: string }>
  asset: ReturnType<typeof getWorldSceneAsset>
}

const audienceLabels = { 'first-time': '初次抵达', tech: '技术探索', life: '生活回望', 'deep-dive': '深度潜行', creator: '创作者维护' } as const
const overviewRoutes = [
  'M 12 72 C 28 58, 34 30, 54 23 S 78 31, 90 16',
  'M 9 80 C 31 82, 34 55, 53 54 S 72 45, 91 50',
  'M 11 30 C 28 39, 36 70, 55 74 S 74 70, 91 82',
  'M 8 58 C 26 45, 35 48, 49 34 S 72 18, 92 28',
  'M 10 20 C 26 17, 37 31, 50 46 S 73 68, 91 64',
  'M 11 88 C 29 67, 39 78, 56 59 S 75 32, 92 38',
]
const stationPositions = [
  { x: 13, y: 78 }, { x: 25, y: 64 }, { x: 38, y: 71 }, { x: 49, y: 48 }, { x: 62, y: 55 }, { x: 73, y: 33 }, { x: 87, y: 22 },
  { x: 92, y: 44 }, { x: 78, y: 73 }, { x: 58, y: 82 }, { x: 35, y: 36 }, { x: 18, y: 27 },
]

function buildPath(index: PublicWorldObjectIndex, pathId: string, routeIndex: number): JourneyPathView | null {
  const path = index.paths.find((item) => item.id === pathId)
  if (!path) return null
  const refs = path.nodeSlugs.map((slug) => index.nodeRefs.find((node) => node.slug === slug)).filter((node): node is NonNullable<typeof node> => Boolean(node))
  const steps = refs.map((node, stepIndex) => {
    const position = stationPositions[stepIndex % stationPositions.length]
    return { index: stepIndex, slug: node.slug, title: node.title, summary: node.aiReadableSummary, areaId: node.areaId, areaTitle: node.areaTitle, href: `/node/${node.slug}?fromPath=${path.id}&step=${stepIndex}`, x: position.x, y: position.y, mobileY: 24 + stepIndex * Math.min(11, 62 / Math.max(1, refs.length - 1)), contentRevisionSha256: node.contentRevisionSha256 }
  })
  return {
    id: path.id,
    href: `/paths/${path.id}`,
    title: path.title,
    description: path.description,
    audienceLabel: audienceLabels[path.audience],
    estimatedMinutes: path.estimatedMinutes ?? Math.max(6, refs.length * 3),
    areaTitles: [...new Set(refs.map((node) => node.areaTitle))],
    steps,
    routeD: overviewRoutes[routeIndex % overviewRoutes.length],
    routeIndex,
  }
}

export function buildPathsOverviewModel(index: PublicWorldObjectIndex): PathsOverviewModel {
  const ordered = getRecommendedPathOrder(index.paths)
  const allPaths = ordered.map((path, routeIndex) => buildPath(index, path.id, routeIndex)).filter((path): path is JourneyPathView => Boolean(path))
  const byId = new Map(allPaths.map((path) => [path.id, path]))
  const featured = publicCuration.featuredPathIds.map((id) => byId.get(id)).filter((path): path is JourneyPathView => Boolean(path))
  return { title: '星路岔口', arrivalLine: '选择一条路，不必先理解整个世界。', featured, allPaths, asset: getWorldSceneAsset('paths') }
}

export function buildPathDetailModel(index: PublicWorldObjectIndex, pathId: string): PathDetailModel | null {
  const routeIndex = Math.max(0, index.paths.findIndex((path) => path.id === pathId))
  const path = index.paths.find((item) => item.id === pathId)
  const view = buildPath(index, pathId, routeIndex)
  if (!path || !view) return null
  const nextPaths = (path.nextPathIds ?? []).map((id) => index.paths.find((item) => item.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item)).map((item) => ({ id: item.id, href: `/paths/${item.id}`, title: item.title }))
  return { ...view, nextPaths, asset: getWorldSceneAsset('paths') }
}
