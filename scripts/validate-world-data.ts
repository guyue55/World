// 用途：验证world data
import areas from '../data/domains/experience/areas.json'
import nodes from '../data/domains/experience/nodes.json'
import relations from '../data/core/relations.json'
import paths from '../data/domains/experience/paths.json'
import events from '../data/core/world-events.json'
import state from '../data/core/world-state.json'
import {
  areasSchema,
  nodesSchema,
  relationsSchema,
  pathsSchema,
  worldEventsSchema,
  worldStateSchema,
} from '../src/lib/schemas'

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  values.forEach((value) => {
    if (seen.has(value)) duplicates.add(value)
    seen.add(value)
  })

  if (duplicates.size > 0) {
    throw new Error(`${label} duplicated: ${Array.from(duplicates).join(', ')}`)
  }
}

function main() {
  const parsedAreas = areasSchema.parse(areas)
  const parsedNodes = nodesSchema.parse(nodes)
  const parsedRelations = relationsSchema.parse(relations)
  const parsedPaths = pathsSchema.parse(paths)
  const parsedEvents = worldEventsSchema.parse(events)
  worldStateSchema.parse(state)

  assertUnique(parsedAreas.map((area) => area.id), 'area.id')
  assertUnique(parsedNodes.map((node) => node.id), 'node.id')
  assertUnique(parsedNodes.map((node) => node.slug), 'node.slug')

  const areaIds = new Set(parsedAreas.map((area) => area.id))
  const nodeIds = new Set(parsedNodes.map((node) => node.id))
  const nodeSlugs = new Set(parsedNodes.map((node) => node.slug))

  parsedNodes.forEach((node) => {
    if (!areaIds.has(node.areaId)) {
      throw new Error(`Node ${node.id} references missing areaId: ${node.areaId}`)
    }

    if (node.visibility === 'public' && !node.summary) {
      throw new Error(`Public node ${node.id} must have summary`)
    }

    if (node.ai?.generated && !node.ai.reviewed && node.visibility === 'public') {
      throw new Error(`AI generated node ${node.id} is public but not reviewed`)
    }
  })

  parsedRelations.forEach((relation) => {
    if (!nodeIds.has(relation.from)) throw new Error(`Relation from missing node: ${relation.from}`)
    if (!nodeIds.has(relation.to)) throw new Error(`Relation to missing node: ${relation.to}`)
  })

  parsedPaths.forEach((path) => {
    path.nodeSlugs.forEach((slug) => {
      if (!nodeSlugs.has(slug)) throw new Error(`Path ${path.id} references missing node slug: ${slug}`)
    })
  })

  parsedEvents.forEach((event) => {
    event.nodeIds?.forEach((id) => {
      if (!nodeIds.has(id)) throw new Error(`WorldEvent ${event.id} references missing node: ${id}`)
    })
    event.areaIds?.forEach((id) => {
      if (!areaIds.has(id)) throw new Error(`WorldEvent ${event.id} references missing area: ${id}`)
    })
  })

  console.log('World data validation passed.')
}

main()
