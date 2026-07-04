import { V5AuditRecorder } from './audit'

export type V5Agent = {
  id: string
  kind: 'content-curator' | 'memory-organizer' | 'risk-reviewer' | 'publishing-assistant' | 'ops-monitor'
  costLimit: number
  canPublishWithoutOwner: false
  canReadVaultRaw: false
}

export type V5RuntimeTask = {
  id: string
  agentId: string
  action: string
  status: 'planned' | 'review-required' | 'approved' | 'rejected' | 'rolled-back'
}

export function planV5AgentTask(agent: V5Agent, action: string, audit: V5AuditRecorder): V5RuntimeTask {
  const task = { id: `task-${agent.id}-${action}`, agentId: agent.id, action, status: 'review-required' as const }
  audit.record({ id: `audit-${task.id}`, actorId: agent.id, action: 'agent.plan', status: 'review-required' })
  return task
}

export function approveV5AgentTask(task: V5RuntimeTask, ownerId: string, audit: V5AuditRecorder): V5RuntimeTask {
  audit.record({ id: `audit-${task.id}-approve`, actorId: ownerId, action: 'agent.approve', status: 'allowed' })
  return { ...task, status: 'approved' }
}
