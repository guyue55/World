import { formatArchiveLifeStage, formatArchiveNodeType, getLifeStages, getNodeTypes, getPopularTags } from '@/lib/archive'
import type { PublicWorldObjectIndex } from '@/lib/public-world-objects'
import { getWorldSceneAsset, type WorldSceneAsset } from '@/lib/world-scene-assets'

export type ArchiveRecordView = {
  id: string
  slug: string
  href: string
  title: string
  summary: string
  areaId: string
  areaTitle: string
  type: string
  typeLabel: string
  lifeStage: string
  lifeStageLabel: string
  tags: string[]
  date: string
  shelfId: string
  drawer: number
}

export type ArchiveShelfView = {
  id: string
  areaId: string
  title: string
  realName: string
  x: number
  y: number
  recordIds: string[]
}

export type ArchiveViewModel = {
  title: string
  arrivalLine: string
  asset: WorldSceneAsset
  shelves: ArchiveShelfView[]
  records: ArchiveRecordView[]
  options: {
    types: Array<{ value: string; label: string }>
    lifeStages: Array<{ value: string; label: string }>
    tags: Array<{ value: string; label: string }>
  }
}

const shelfPositions = [
  { x: 12, y: 29 }, { x: 12, y: 50 }, { x: 12, y: 71 }, { x: 35, y: 35 },
  { x: 88, y: 29 }, { x: 88, y: 50 }, { x: 88, y: 71 }, { x: 65, y: 35 },
]

export function buildArchiveViewModel(index: PublicWorldObjectIndex): ArchiveViewModel {
  const primaryAreas = index.areas.filter((area) => area.level === 1).sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
  const shelfByArea = new Map(primaryAreas.map((area) => [area.id, `shelf-${area.id}`]))
  const referenceById = new Map(index.nodeRefs.map((reference) => [reference.id, reference]))
  const records = [...index.nodes]
    .sort((left, right) => (right.updatedAt ?? right.createdAt).localeCompare(left.updatedAt ?? left.createdAt) || left.id.localeCompare(right.id))
    .map((node, recordIndex) => {
      const area = index.areaById.get(node.areaId)
      const reference = referenceById.get(node.id)
      return {
        id: node.id,
        slug: node.slug,
        href: `/node/${node.slug}`,
        title: reference?.title ?? node.worldTitle ?? node.title,
        summary: reference?.aiReadableSummary ?? node.summary ?? '',
        areaId: node.areaId,
        areaTitle: area?.worldName ?? node.areaId,
        type: node.type,
        typeLabel: formatArchiveNodeType(node.type),
        lifeStage: node.lifeStage,
        lifeStageLabel: formatArchiveLifeStage(node.lifeStage),
        tags: node.tags,
        date: node.updatedAt ?? node.createdAt,
        shelfId: shelfByArea.get(node.areaId) ?? 'shelf-archive',
        drawer: recordIndex,
      }
    })
  const shelves = primaryAreas.map((area, areaIndex) => ({
    id: `shelf-${area.id}`,
    areaId: area.id,
    title: area.worldName,
    realName: area.realName,
    ...shelfPositions[areaIndex % shelfPositions.length],
    recordIds: records.filter((record) => record.areaId === area.id).map((record) => record.id),
  }))

  return {
    title: '月下档案馆',
    arrivalLine: '在书架、抽屉和索引台之间找到已经放行的世界卷宗。',
    asset: getWorldSceneAsset('archive'),
    shelves,
    records,
    options: {
      types: getNodeTypes(index.nodes).map((type) => ({ value: type, label: formatArchiveNodeType(type) })),
      lifeStages: getLifeStages(index.nodes).map((stage) => ({ value: stage, label: formatArchiveLifeStage(stage) })),
      tags: getPopularTags(index.nodes, 16).map((item) => ({ value: item.tag, label: `#${item.tag} · ${item.count}` })),
    },
  }
}
