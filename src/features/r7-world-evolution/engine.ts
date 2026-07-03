import { r7LifecycleStates, r7MaintenanceQueue, r7WorldHealth, r7WorldState } from './data'

export function describeR7WorldPulse(): string {
  return `${r7WorldState.mood} · ${r7WorldState.lightLevel} · health ${r7WorldHealth.score}`
}

export function getR7NextLifecycleState(current: string): string[] {
  return r7LifecycleStates.find((state) => state.id === current)?.next ?? []
}

export function getR7DailyLightTasks(limit = 3) {
  return r7MaintenanceQueue.filter((item) => item.effort === 'low').slice(0, limit)
}
