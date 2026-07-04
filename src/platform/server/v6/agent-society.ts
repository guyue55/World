import { V6AuditRecorder } from './audit'

export type V6AgentMember = {
  id: string
  canSelfEscalate: false
  canAuthorizeOtherAgents: false
}

export type V6AutonomousTask = {
  id: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  status: 'planned' | 'review-required' | 'approved' | 'rejected'
}

export function planV6AutonomousTask(agent: V6AgentMember, taskId: string, riskLevel: V6AutonomousTask['riskLevel'], audit: V6AuditRecorder): V6AutonomousTask {
  const status = riskLevel === 'low' ? 'planned' : 'review-required'
  audit.record({ id: `audit-${taskId}-plan`, actorId: agent.id, action: 'agent-society.plan', status: status === 'planned' ? 'allowed' : 'review-required' })
  return { id: taskId, riskLevel, status }
}

export function approveV6AutonomousTask(task: V6AutonomousTask, ownerId: string, audit: V6AuditRecorder): V6AutonomousTask {
  audit.record({ id: `audit-${task.id}-approve`, actorId: ownerId, action: 'agent-society.approve', status: 'allowed' })
  return { ...task, status: 'approved' }
}
