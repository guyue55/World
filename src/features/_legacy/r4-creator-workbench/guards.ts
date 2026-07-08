import { r4ConsolePanels, r4ForbiddenActions, r4InboxItems, r4MaintenanceTasks, r4NodeOperations, r4PermissionRisks, r4Roadmap, r4R5Handoff } from './data'

export function assertR4CreatorWorkbenchBoundary(): string[] {
  const errors: string[] = []

  if (r4Roadmap.productionLive !== false) errors.push('R4 must keep productionLive false until real external deployment is signed off')
  if (r4Roadmap.releaseReady !== false) errors.push('R4 must keep releaseReady false without preview/production smoke and manual signoff')
  if (r4Roadmap.cleanProductionReady !== false) errors.push('R4 must not claim clean production readiness in this local package')
  if (r4Roadmap.stages.length !== 4) errors.push('R4 must contain exactly 4 stages')
  if (r4Roadmap.batches.length !== 16) errors.push('R4 must contain exactly 16 batches')
  if (r4InboxItems.length < 6) errors.push('R4 must include at least 6 inbox seed items')
  if (r4ConsolePanels.length < 6) errors.push('R4 must include at least 6 creator console panels')
  if (r4MaintenanceTasks.length < 6) errors.push('R4 must include at least 6 maintenance tasks')
  if (r4PermissionRisks.length < 5) errors.push('R4 must include at least 5 privacy or permission risks')

  for (const item of r4InboxItems) {
    if (!item.rawInput || !item.suggestedArea || !item.suggestedVisibility || !item.nextAction) errors.push(`inbox item ${item.id} missing creator placement data`)
    if ((item.kind === 'memory' || item.kind === 'ai-draft') && item.suggestedVisibility === 'public') errors.push(`sensitive inbox item ${item.id} cannot default to public`)
  }

  for (const operation of r4NodeOperations) {
    if ((operation.dangerLevel === 'danger' || operation.dangerLevel === 'critical') && !operation.requiresConfirmation) errors.push(`dangerous operation ${operation.id} must require confirmation`)
    if (operation.id === 'delete' && operation.description.includes('物理删除') && !operation.description.includes('不允许')) errors.push('R4 delete operation must remain non-destructive')
  }

  for (const forbiddenAction of ['autoPublish', 'autoDelete', 'overwriteOriginal', 'sendPrivateToPublicAI']) {
    if (!r4ForbiddenActions.includes(forbiddenAction)) errors.push(`missing forbidden action ${forbiddenAction}`)
  }

  if (!r4R5Handoff.some((item) => item.id === 'r5-001' && item.status === 'ready')) errors.push('R4 must hand off public-only AI index contract to R5')

  return errors
}
