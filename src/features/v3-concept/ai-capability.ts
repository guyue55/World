import workflow from '../../../data/v3-concept/04-ai-capability-audit-workflow.json'

export function getV3AiCapabilityAuditWorkflow() {
  return {
    workflow,
    summary: {
      layers: workflow.capabilityLayers.length,
      auditSteps: workflow.auditWorkflow.length,
      safetyRules: workflow.contextSafety.length,
      implementationTasks: workflow.implementationTasks.length,
      forbiddenCount:
        workflow.capabilityLayers.find((layer) => layer.level === 'L5')?.forbidden?.length ?? 0,
      ready: workflow.ready,
    },
  }
}
