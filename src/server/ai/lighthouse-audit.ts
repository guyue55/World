import { createHash } from 'node:crypto'

export type LighthouseAuditRecord = {
  requestId: string
  questionDigest: string
  mode: 'live-provider' | 'low-light'
  providerStatus: string
  sourceCount: number
  elapsedMs: number
  cached: boolean
}

const recentAudits: LighthouseAuditRecord[] = []

export function digestLighthouseQuestion(question: string) {
  return createHash('sha256').update(question).digest('hex').slice(0, 16)
}

export function recordLighthouseAudit(record: LighthouseAuditRecord) {
  recentAudits.unshift(record)
  recentAudits.splice(30)
  return record
}

export function getRecentLighthouseAudits() { return [...recentAudits] }
