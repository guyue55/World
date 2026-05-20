import atlasProductizationContract from '../../data/domains/experience/atlas-productization-contract.json'
import atlasQualityGate from '../../data/domains/experience/atlas-quality-gate.json'
import areaLinks from '../../data/domains/experience/area-links.json'
import type { Area, Node } from './types'
import { isPublicVisible } from './visibility'

export type AreaLink = {
  id: string
  from: string
  to: string
  type: string
  label: string
}

export function getAtlasProductizationContract() {
  return atlasProductizationContract
}

export function getAtlasQualityGate() {
  return atlasQualityGate
}

export function getAreaLinks(): AreaLink[] {
  return areaLinks.links as AreaLink[]
}

export function getAtlasStats(areas: Area[], nodes: Node[]) {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicAreaIds = new Set(areas.filter((area) => area.defaultVisibility === 'public').map((area) => area.id))
  const nodesByArea = new Map<string, number>()

  areas.forEach((area) => nodesByArea.set(area.id, 0))
  publicNodes.forEach((node) => {
    nodesByArea.set(node.areaId, (nodesByArea.get(node.areaId) ?? 0) + 1)
  })

  return {
    areaCount: areas.length,
    publicAreaCount: publicAreaIds.size,
    publicNodeCount: publicNodes.length,
    areaLinkCount: getAreaLinks().length,
    nodesByArea,
  }
}

export function getAtlasAreaRows(areas: Area[], nodes: Node[]) {
  const stats = getAtlasStats(areas, nodes)

  return areas.map((area) => ({
    area,
    publicNodeCount: stats.nodesByArea.get(area.id) ?? 0,
    linksFrom: getAreaLinks().filter((link) => link.from === area.id),
    linksTo: getAreaLinks().filter((link) => link.to === area.id),
  }))
}

export function getVisibleAreaLinks(areas: Area[]) {
  const areaIds = new Set(areas.map((area) => area.id))

  return getAreaLinks().filter((link) => areaIds.has(link.from) && areaIds.has(link.to))
}
