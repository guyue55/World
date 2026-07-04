import areaExplainersData from '../../../data/r7-world-evolution/area-explainers.json'
import awakeningPlanData from '../../../data/r7-world-evolution/awakening-plan.json'
import dailyWorldData from '../../../data/r7-world-evolution/daily-world.json'
import evolutionBoundaryData from '../../../data/r7-world-evolution/evolution-boundary.json'
import lifecycleRulesData from '../../../data/r7-world-evolution/lifecycle-rules.json'
import lowLightModeData from '../../../data/r7-world-evolution/low-light-mode.json'
import maintenanceQueueData from '../../../data/r7-world-evolution/maintenance-queue.json'
import maintenanceRitualsData from '../../../data/r7-world-evolution/maintenance-rituals.json'
import r8HandoffData from '../../../data/r7-world-evolution/r8-handoff.json'
import reflectionCyclesData from '../../../data/r7-world-evolution/reflection-cycles.json'
import roadmapData from '../../../data/r7-world-evolution/roadmap.json'
import worldHealthData from '../../../data/r7-world-evolution/world-health.json'
import worldLogData from '../../../data/r7-world-evolution/world-log.json'
import worldStateData from '../../../data/r7-world-evolution/world-state.json'
import type { R7LifecycleState, R7MaintenanceQueueItem, R7Summary, R7WorldLogEvent, R7WorldState } from './types'

export const r7Roadmap = roadmapData
export const r7Stages = roadmapData.stages
export const r7Batches = roadmapData.batches
export const r7WorldState = worldStateData as R7WorldState
export const r7LifecycleStates = lifecycleRulesData.states as R7LifecycleState[]
export const r7LifecycleRules = lifecycleRulesData.rules
export const r7DailyWorld = dailyWorldData
export const r7WorldHealth = worldHealthData
export const r7HealthMetrics = worldHealthData.metrics
export const r7MaintenanceRituals = maintenanceRitualsData.rituals
export const r7MaintenanceQueue = maintenanceQueueData.items as R7MaintenanceQueueItem[]
export const r7LowLightMode = lowLightModeData
export const r7AwakeningPlan = awakeningPlanData
export const r7WorldLog = worldLogData.events as R7WorldLogEvent[]
export const r7ReflectionCycles = reflectionCyclesData.cycles
export const r7AreaExplainers = areaExplainersData.areas
export const r7EvolutionBoundary = evolutionBoundaryData
export const r7R8Handoff = r8HandoffData.items

export function getR7Summary(): R7Summary {
  return {
    stages: r7Stages.length,
    batches: r7Batches.length,
    lifecycleStates: r7LifecycleStates.length,
    maintenanceItems: r7MaintenanceQueue.length,
    healthScore: Number(r7WorldHealth.score),
    worldLogEvents: r7WorldLog.length,
    productionLive: Boolean(r7Roadmap.productionLive),
    releaseReady: Boolean(r7Roadmap.releaseReady),
    cleanProductionReady: Boolean(r7Roadmap.cleanProductionReady),
  }
}

export function getR7PublicWorldLog(): R7WorldLogEvent[] {
  return r7WorldLog.filter((event) => event.visibility === 'public' || event.visibility === 'public-summary')
}

export function getR7HighRiskMaintenanceItems(): R7MaintenanceQueueItem[] {
  return r7MaintenanceQueue.filter((item) => item.risk === 'high' || item.risk === 'critical')
}

export function getR7LowEffortMaintenanceItems(): R7MaintenanceQueueItem[] {
  return r7MaintenanceQueue.filter((item) => item.effort === 'low')
}
