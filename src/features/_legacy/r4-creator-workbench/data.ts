import auditLogData from '../../../data/r4-creator-workbench/audit-log.json'
import consolePanelsData from '../../../data/r4-creator-workbench/console-panels.json'
import exportPlanData from '../../../data/r4-creator-workbench/export-plan.json'
import inboxItemsData from '../../../data/r4-creator-workbench/inbox-items.json'
import maintenanceTasksData from '../../../data/r4-creator-workbench/maintenance-tasks.json'
import nodeOperationsData from '../../../data/r4-creator-workbench/node-operations.json'
import permissionRisksData from '../../../data/r4-creator-workbench/permission-risks.json'
import r5HandoffData from '../../../data/r4-creator-workbench/r5-handoff.json'
import roadmapData from '../../../data/r4-creator-workbench/roadmap.json'
import worldHealthData from '../../../data/r4-creator-workbench/world-health.json'
import type { R4AuditEvent, R4ConsolePanel, R4InboxItem, R4MaintenanceTask, R4NodeOperation, R4PermissionRisk, R4Summary } from './types'

export const r4Roadmap = roadmapData
export const r4Stages = roadmapData.stages
export const r4Batches = roadmapData.batches
export const r4InboxItems = inboxItemsData.items as R4InboxItem[]
export const r4ConsolePanels = consolePanelsData.panels as R4ConsolePanel[]
export const r4NodeOperations = nodeOperationsData.operations as R4NodeOperation[]
export const r4MaintenanceTasks = maintenanceTasksData.tasks as R4MaintenanceTask[]
export const r4PermissionRisks = permissionRisksData.risks as R4PermissionRisk[]
export const r4ForbiddenActions = permissionRisksData.forbiddenActions
export const r4AuditEvents = auditLogData.events as R4AuditEvent[]
export const r4ExportPlans = exportPlanData.plans
export const r4WorldHealth = worldHealthData.worldHealth
export const r4R5Handoff = r5HandoffData.items

export function getR4Summary(): R4Summary {
  return {
    stages: r4Stages.length,
    batches: r4Batches.length,
    inboxItems: r4InboxItems.length,
    panels: r4ConsolePanels.length,
    tasks: r4MaintenanceTasks.length,
    risks: r4PermissionRisks.length,
    openRisks: r4PermissionRisks.filter((risk) => risk.status === 'open').length,
    auditEvents: r4AuditEvents.length,
    worldHealth: r4WorldHealth.score,
    productionLive: Boolean(r4Roadmap.productionLive),
    releaseReady: Boolean(r4Roadmap.releaseReady),
    cleanProductionReady: Boolean(r4Roadmap.cleanProductionReady),
  }
}

export function getR4LowEnergyTasks(): R4MaintenanceTask[] {
  return r4MaintenanceTasks.filter((task) => task.energy === 'low')
}

export function getR4GuardedOperations(): R4NodeOperation[] {
  return r4NodeOperations.filter((operation) => operation.requiresConfirmation)
}
