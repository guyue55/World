import { z } from 'zod'
import curationData from '../../data/domains/content/world-public-curation.json'
import type { PublicWorldObjectIndex } from './public-world-objects'

const curationSchema = z.object({
  version: z.string(),
  updatedAt: z.string(),
  gatewayNodeIds: z.array(z.string()).min(6),
  representativeNodeIdsByArea: z.record(z.string(), z.array(z.string()).min(3)),
  onboardingPathIds: z.array(z.string()).min(1),
  archiveOnlyNodeIds: z.array(z.string()),
  rationaleById: z.record(z.string(), z.string().min(8)),
})

export type PublicWorldCuration = z.infer<typeof curationSchema>

const curation = curationSchema.parse(curationData)

export function getPublicWorldCuration(): PublicWorldCuration {
  return curation
}

export function getPublicWorldCurationIssues(index: PublicWorldObjectIndex): string[] {
  const issues: string[] = []
  const representativeIds = Object.values(curation.representativeNodeIdsByArea).flat()
  const featuredIds = new Set([...curation.gatewayNodeIds, ...representativeIds])

  if (representativeIds.length < 24) issues.push(`代表节点不足 24 个：${representativeIds.length}`)
  for (const area of index.areas.filter((entry) => entry.level === 1)) {
    const ids = curation.representativeNodeIdsByArea[area.id] ?? []
    if (ids.length < 3) issues.push(`一级区域缺少三个代表节点：${area.id}`)
    for (const id of ids) {
      const node = index.nodeById.get(id)
      if (!node) issues.push(`策展引用不存在或非公开节点：${area.id} -> ${id}`)
      else if (node.areaId !== area.id) issues.push(`代表节点区域不匹配：${id} -> ${node.areaId}`)
    }
  }
  for (const id of featuredIds) {
    if (!index.nodeById.has(id)) issues.push(`精选节点不存在或非公开：${id}`)
    if (!curation.rationaleById[id]) issues.push(`精选节点缺少策展理由：${id}`)
    if (curation.archiveOnlyNodeIds.includes(id)) issues.push(`精选节点同时被标为 Archive-only：${id}`)
  }
  for (const id of curation.archiveOnlyNodeIds) {
    if (!index.nodeById.has(id)) issues.push(`Archive-only 节点不存在或非公开：${id}`)
  }
  for (const id of curation.onboardingPathIds) {
    if (!index.paths.some((entry) => entry.id === id && entry.visibility === 'public')) issues.push(`新手路径不存在或非公开：${id}`)
  }
  return issues
}
