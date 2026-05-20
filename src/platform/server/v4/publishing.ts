import { assertV4Permission, type V4Actor } from './auth'
import { V4AuditRecorder } from './audit'

export type V4PublishingJob = {
  id: string
  channel: 'static-site' | 'rss' | 'markdown-bundle' | 'json-api' | 'worldbook' | 'pdf' | 'epub'
  status: 'draft' | 'review-required' | 'approved'
  checksum?: string
}

export function requestV4PublishingReview(actor: V4Actor, job: V4PublishingJob, audit: V4AuditRecorder): V4PublishingJob {
  assertV4Permission(actor, 'publish.approve')
  const next = { ...job, status: 'review-required' as const }
  audit.record({ id: `audit-${job.id}-review`, actorId: actor.id, action: 'publish.review', status: 'review-required' })
  return next
}

export function approveV4PublishingJob(actor: V4Actor, job: V4PublishingJob, audit: V4AuditRecorder): V4PublishingJob {
  assertV4Permission(actor, 'publish.approve')
  if (!job.checksum) throw new Error('Publishing job requires checksum before approval')
  const next = { ...job, status: 'approved' as const }
  audit.record({ id: `audit-${job.id}-approve`, actorId: actor.id, action: 'publish.approve', status: 'allowed' })
  return next
}
