import timelineProductizationContract from '../../data/domains/experience/timeline-productization-contract.json'
import timelineQualityGate from '../../data/domains/experience/timeline-quality-gate.json'
import type { Area, Node, WorldEvent } from './types'

export type TimelineFilters = {
  type: string
  actor: string
}

export function getTimelineProductizationContract() {
  return timelineProductizationContract
}

export function getTimelineQualityGate() {
  return timelineQualityGate
}

export function getPublicWorldEvents(events: WorldEvent[]) {
  return events.filter((event) => event.visibility !== 'private')
}

export function getTimelineStats(events: WorldEvent[]) {
  const publicEvents = getPublicWorldEvents(events)
  const eventTypes = new Set(publicEvents.map((event) => event.type))
  const actors = new Set(publicEvents.map((event) => event.actor ?? 'system'))
  const linkedNodeIds = new Set(publicEvents.flatMap((event) => event.nodeIds ?? []))
  const linkedAreaIds = new Set(publicEvents.flatMap((event) => event.areaIds ?? []))

  return {
    publicEventCount: publicEvents.length,
    eventTypeCount: eventTypes.size,
    actorCount: actors.size,
    linkedNodeCount: linkedNodeIds.size,
    linkedAreaCount: linkedAreaIds.size,
  }
}

export function getTimelineFilterOptions(events: WorldEvent[]) {
  const publicEvents = getPublicWorldEvents(events)

  return {
    types: Array.from(new Set(publicEvents.map((event) => event.type))).sort(),
    actors: Array.from(new Set(publicEvents.map((event) => event.actor ?? 'system'))).sort(),
  }
}

export function filterTimelineEvents(events: WorldEvent[], filters: TimelineFilters) {
  return getPublicWorldEvents(events).filter((event) => {
    const actor = event.actor ?? 'system'

    return (filters.type === 'all' || event.type === filters.type)
      && (filters.actor === 'all' || actor === filters.actor)
  })
}

export function groupTimelineEventsByDate(events: WorldEvent[]) {
  const groups = new Map<string, WorldEvent[]>()

  events.forEach((event) => {
    const group = groups.get(event.date) ?? []
    group.push(event)
    groups.set(event.date, group)
  })

  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({
      date,
      events: items.sort((a, b) => a.title.localeCompare(b.title)),
    }))
}

export function getEventLinkedNames(event: WorldEvent, nodes: Node[], areas: Area[]) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node.title]))
  const areaMap = new Map(areas.map((area) => [area.id, area.worldName]))

  return {
    nodes: (event.nodeIds ?? []).map((id) => nodeMap.get(id) ?? id),
    areas: (event.areaIds ?? []).map((id) => areaMap.get(id) ?? id),
  }
}
