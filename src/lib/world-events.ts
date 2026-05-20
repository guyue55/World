import events from '../../data/world-events.json'
import state from '../../data/world-state.json'
import type { WorldEvent, WorldState } from './types'

export function getAllWorldEvents(): WorldEvent[] {
  return [...(events as WorldEvent[])].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPublicWorldEvents(): WorldEvent[] {
  return getAllWorldEvents().filter((event) => event.visibility !== 'private')
}

export function getRecentWorldEvents(limit = 5): WorldEvent[] {
  return getPublicWorldEvents().slice(0, limit)
}

export function getWorldState(): WorldState {
  return state as WorldState
}
