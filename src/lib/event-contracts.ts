import type { WorldEvent, WorldEventType } from './types'
import { getAllWorldEvents } from './world-events'
import { getAllNodes } from './nodes'
import { getAllAreas } from './areas'

export type EventContractIssue = {
  eventId: string
  message: string
}

const REQUIRED_NODE_EVENTS: WorldEventType[] = [
  'node-created',
  'node-updated',
  'node-published',
  'node-archived',
  'node-revived',
]

const REQUIRED_AREA_EVENTS: WorldEventType[] = [
  'area-created',
  'area-awakened',
]

export function validateWorldEventContract(event: WorldEvent): EventContractIssue[] {
  const issues: EventContractIssue[] = []
  const nodeIds = new Set(getAllNodes().map((node) => node.id))
  const areaIds = new Set(getAllAreas().map((area) => area.id))

  if (REQUIRED_NODE_EVENTS.includes(event.type) && (!event.nodeIds || event.nodeIds.length === 0)) {
    issues.push({ eventId: event.id, message: `${event.type} must reference at least one node.` })
  }

  if (REQUIRED_AREA_EVENTS.includes(event.type) && (!event.areaIds || event.areaIds.length === 0)) {
    issues.push({ eventId: event.id, message: `${event.type} must reference at least one area.` })
  }

  ;(event.nodeIds ?? []).forEach((nodeId) => {
    if (!nodeIds.has(nodeId)) {
      issues.push({ eventId: event.id, message: `Missing node: ${nodeId}` })
    }
  })

  ;(event.areaIds ?? []).forEach((areaId) => {
    if (!areaIds.has(areaId)) {
      issues.push({ eventId: event.id, message: `Missing area: ${areaId}` })
    }
  })

  return issues
}

export function validateAllWorldEventContracts(events: WorldEvent[] = getAllWorldEvents()): EventContractIssue[] {
  return events.flatMap(validateWorldEventContract)
}
