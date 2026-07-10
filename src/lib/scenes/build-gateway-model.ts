import { getPublicWorldCuration, getPublicWorldCurationIssues } from '@/lib/public-world-curation'
import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getWorldSceneAsset, type WorldSceneAsset } from '@/lib/world-scene-assets'
import type { SceneDestination } from './scene-destination'

export type GatewayPlace = {
  id: string
  href: string
  title: string
  summary: string
  areaId: string
  areaTitle: string
}

export type GatewayDirection = SceneDestination & {
  title: string
  shortLabel: string
  description: string
}

export type GatewayViewModel = {
  asset: WorldSceneAsset
  title: string
  arrivalLine: string
  directions: GatewayDirection[]
  featuredPlaces: GatewayPlace[]
  onboardingPathIds: string[]
}

export function buildGatewayModel(index: PublicWorldObjectIndex): GatewayViewModel {
  const curation = getPublicWorldCuration()
  const issues = getPublicWorldCurationIssues(index)
  if (issues.length > 0) throw new Error(`Gateway curation is invalid:\n${issues.join('\n')}`)

  const featuredPlaces = curation.gatewayNodeIds.map((id) => {
    const node = index.nodeById.get(id)
    const area = node ? index.areaById.get(node.areaId) : null
    if (!node) throw new Error(`Gateway node is missing: ${id}`)
    return {
      id: node.id,
      href: `/node/${node.slug}`,
      title: node.worldTitle ?? node.title,
      summary: node.summary ?? '',
      areaId: node.areaId,
      areaTitle: area?.worldName ?? node.areaId,
    }
  })

  const directions: GatewayDirection[] = [
    {
      href: '/atlas',
      sceneId: 'atlas',
      transitionObject: 'island',
      accessibleLabel: '进入星图，选择一座浮屿',
      title: '群岛星图',
      shortLabel: '看见世界',
      description: '从区域、节点和星线开始探索。',
    },
    {
      href: `/paths/${curation.onboardingPathIds[0]}`,
      sceneId: 'paths',
      objectId: curation.onboardingPathIds[0],
      transitionObject: 'waypoint',
      accessibleLabel: '沿第一次来到古月浮屿路径出发',
      title: '初访星路',
      shortLabel: '沿路前行',
      description: '沿一条短路抵达代表地点。',
    },
    {
      href: '/archive',
      sceneId: 'archive',
      transitionObject: 'document',
      accessibleLabel: '进入档案馆检索公开内容',
      title: '记忆档案馆',
      shortLabel: '直接寻找',
      description: '按关键词、区域和类型查找卷宗。',
    },
  ]

  return {
    asset: getWorldSceneAsset('gateway'),
    title: '古月浮屿',
    arrivalLine: '月门已亮。先推门，再选择一条路。',
    directions,
    featuredPlaces,
    onboardingPathIds: curation.onboardingPathIds,
  }
}
