import events from '../../data/core/world-events.json'
import state from '../../data/core/world-state.json'
import type { WorldEvent, WorldState } from './types'
import { isPublicVisible } from './visibility'

export function getAllWorldEvents(): WorldEvent[] {
  return [...(events as WorldEvent[])].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPublicWorldEvents(): WorldEvent[] {
  return getAllWorldEvents().filter((event) => !event.visibility || isPublicVisible(event.visibility))
}

export function getRecentWorldEvents(limit = 5): WorldEvent[] {
  return getPublicWorldEvents().slice(0, limit)
}

export function getWorldState(): WorldState {
  return state as WorldState
}
