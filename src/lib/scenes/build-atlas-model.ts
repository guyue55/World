import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getPublicWorldCuration } from '@/lib/public-world-curation'
import { getAllAreaCoordinates, type SpatialCoordinate } from '@/lib/spatial'
import { getWorldSceneAsset, type WorldSceneAsset } from '@/lib/world-scene-assets'

export type AtlasAreaView = {
  id: string
  title: string
  realName: string
  description: string
  icon: string
  x: number
  y: number
  radius: number
  color: string
  publicNodeCount: number
  representativeNodeIds: string[]
}

export type AtlasNodeView = {
  id: string
  slug: string
  href: string
  title: string
  summary: string
  areaId: string
  x: number
  y: number
  importance: number
  relationReasons: string[]
  contentRevisionSha256: string | null
}

export type AtlasLinkView = {
  id: string
  from: string
  to: string
  reason: string
}

export type AtlasViewModel = {
  title: string
  arrivalLine: string
  asset: WorldSceneAsset
  areas: AtlasAreaView[]
  nodes: AtlasNodeView[]
  links: AtlasLinkView[]
  totalPublicNodeCount: number
}

type AtlasViewport = { width: number; height: number }

const zoneAnchors: Record<string, { x: number; y: number }> = {
  center: { x: 50, y: 51 },
  'north-west': { x: 27, y: 30 },
  'north-east': { x: 76, y: 30 },
  'upper-cloud': { x: 50, y: 14 },
  lake: { x: 23, y: 68 },
  river: { x: 50, y: 81 },
  library: { x: 76, y: 66 },
  beacon: { x: 50, y: 35 },
}

const areaColors = ['#f0c979', '#92c9d0', '#e29a67', '#b8b4d8', '#87b7aa', '#e3c36d', '#cba36b', '#f2d98c']
const nodeOffsets = [
  { x: -4.2, y: 4.4 },
  { x: 4.4, y: 4.1 },
  { x: 0.3, y: -5.1 },
]

function projectCoordinate(coordinate: SpatialCoordinate, viewport: AtlasViewport) {
  const semanticAnchor = coordinate.zone ? zoneAnchors[coordinate.zone] : undefined
  const fallback = {
    x: 50 + coordinate.x * 13,
    y: 24 + coordinate.y * 18,
  }
  const point = semanticAnchor ?? fallback
  return {
    x: (point.x / 100) * viewport.width,
    y: (point.y / 100) * viewport.height,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function buildAtlasViewModel(
  index: PublicWorldObjectIndex,
  viewport: AtlasViewport = { width: 100, height: 100 },
): AtlasViewModel {
  const curation = getPublicWorldCuration()
  const coordinateByArea = new Map(getAllAreaCoordinates().map((coordinate) => [coordinate.areaId, coordinate]))
  const primaryAreas = index.areas
    .filter((area) => area.level === 1)
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0))

  const areas = primaryAreas.flatMap((area, areaIndex) => {
    const coordinate = coordinateByArea.get(area.id)
    if (!coordinate) return []
    const point = projectCoordinate(coordinate, viewport)
    const latestNodeId = index.nodeRefs
      .filter((node) => node.areaId === area.id)
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.id.localeCompare(right.id))[0]?.id
    const representativeNodeIds = [...new Set([...(curation.representativeNodeIdsByArea[area.id] ?? []), latestNodeId].filter(Boolean))]
      .filter((id): id is string => index.nodeById.has(id as string))

    return [{
      id: area.id,
      title: area.worldName,
      realName: area.realName,
      description: area.description,
      icon: area.icon ?? '✦',
      x: point.x,
      y: point.y,
      radius: area.id === 'origin' ? 8.4 : 6.5,
      color: areaColors[areaIndex % areaColors.length],
      publicNodeCount: index.nodes.filter((node) => node.areaId === area.id).length,
      representativeNodeIds,
    }]
  })

  const areaById = new Map(areas.map((area) => [area.id, area]))
  const nodes = areas.flatMap((area) => area.representativeNodeIds.flatMap((nodeId, nodeIndex) => {
    const reference = index.nodeRefs.find((node) => node.id === nodeId)
    if (!reference) return []
    const offset = nodeOffsets[nodeIndex % nodeOffsets.length]
    return [{
      id: reference.id,
      slug: reference.slug,
      href: reference.href,
      title: reference.title,
      summary: reference.aiReadableSummary,
      areaId: area.id,
      x: clamp(area.x + (offset.x / 100) * viewport.width, 4, viewport.width - 4),
      y: clamp(area.y + (offset.y / 100) * viewport.height, 5, viewport.height - 5),
      importance: nodeIndex === 0 ? 1 : nodeIndex === 1 ? 0.8 : 0.6,
      relationReasons: reference.relationReasons,
      contentRevisionSha256: reference.contentRevisionSha256,
    }]
  }))

  const links = index.areaLinks
    .filter((link) => areaById.has(link.from) && areaById.has(link.to))
    .map((link) => ({ id: link.id, from: link.from, to: link.to, reason: link.label }))

  return {
    title: '古月浮屿星图',
    arrivalLine: '选择一座浮屿，沿星线进入它正在生长的地点。',
    asset: getWorldSceneAsset('atlas'),
    areas,
    nodes,
    links,
    totalPublicNodeCount: index.nodes.length,
  }
}
