import fs from 'node:fs'
import { getV6AiApprovalItems, getV6AiAuditEvents, getV6AiRedactedMemoryGraph } from '../src/features/private-ai-v6'

const errors: string[] = []
for (const path of [
  'data/v6-private-ai/stage-03-approval-audit-memory.json',
  'data/v6-private-ai/approval-queue.json',
  'data/v6-private-ai/audit-ledger.json',
  'data/v6-private-ai/redacted-memory-graph.json',
]) {
  if (!fs.existsSync(path)) errors.push(`missing ${path}`)
}
if (getV6AiApprovalItems().some((item) => item.allowedExecution)) errors.push('approval queue cannot allow AI auto execution')
if (getV6AiAuditEvents().some((event) => event.rawPrivateContentAccessed)) errors.push('audit ledger cannot report raw private content access')
const graph = getV6AiRedactedMemoryGraph()
if (graph.nodes.length < 3 || graph.edges.length < 2) errors.push('redacted memory graph too small')
if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 private AI stage 03 checks passed.')
