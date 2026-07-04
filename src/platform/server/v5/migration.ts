import { V5AuditRecorder } from './audit'

export type V5MigrationPlan = {
  id: string
  fromVersion: 'v4'
  toVersion: 'v5'
  checksum: string
  importReviewRequired: true
}

export function createV5MigrationPlan(id: string, audit: V5AuditRecorder): V5MigrationPlan {
  audit.record({ id: `audit-${id}-migration`, actorId: 'system', action: 'migration.plan', status: 'review-required' })
  return {
    id,
    fromVersion: 'v4',
    toVersion: 'v5',
    checksum: `checksum-${id}`,
    importReviewRequired: true,
  }
}
