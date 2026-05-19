import snapshotPolicy from '../../data/snapshot-policy.json'
import { summarizeWorldCore } from './world-core'
import { evaluateWorldInvariants } from './world-invariants'
import { getSchemaVersionReport } from './schema-version'

export type SnapshotPlan = {
  name: string
  reason: string
  include: string[]
  exclude: string[]
  summary: ReturnType<typeof summarizeWorldCore>
  schema: ReturnType<typeof getSchemaVersionReport>
  invariants: ReturnType<typeof evaluateWorldInvariants>
}

export function createSnapshotPlan(reason: string, date = new Date()): SnapshotPlan {
  const ymd = date.toISOString().slice(0, 10)
  const safeReason = reason.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, '-').replace(/^-|-$/g, '') || 'manual'

  return {
    name: `${ymd}-v${getSchemaVersionReport().current}-${safeReason}`,
    reason,
    include: snapshotPolicy.include,
    exclude: snapshotPolicy.exclude,
    summary: summarizeWorldCore(),
    schema: getSchemaVersionReport(),
    invariants: evaluateWorldInvariants(),
  }
}

export function shouldSnapshotBefore(changeType: string): boolean {
  return snapshotPolicy.requiredBefore.includes(changeType)
}
