import {
  V5AuditRecorder,
  V5MetricsLedger,
  approveV5AgentTask,
  createV5CrossWorldSnapshot,
  createV5MigrationPlan,
  evaluateV5Budget,
  installV5Plugin,
  planV5AgentTask,
} from '../src/platform/server/v5'

const errors: string[] = []
const audit = new V5AuditRecorder()

const snapshot = createV5CrossWorldSnapshot({
  id: 'world-public',
  url: 'https://example.invalid/world-public',
  trustLevel: 'trusted',
}, audit)

if (snapshot.includesPrivateRawContent !== false) errors.push('federation snapshot leaked private raw content')

const task = planV5AgentTask({
  id: 'agent-risk-reviewer',
  kind: 'risk-reviewer',
  costLimit: 100,
  canPublishWithoutOwner: false,
  canReadVaultRaw: false,
}, 'review-publishing-risk', audit)

const approvedTask = approveV5AgentTask(task, 'owner-1', audit)
if (approvedTask.status !== 'approved') errors.push('agent task approval failed')

const installed = installV5Plugin({
  id: 'safe-rss-adapter',
  reviewStatus: 'approved',
  installed: false,
  enabled: false,
  highRisk: false,
}, 'owner-1', audit)

if (!installed.installed || !installed.enabled) errors.push('safe plugin should install and enable')

const ledger = new V5MetricsLedger()
ledger.add({ id: 'agent-cost-1', kind: 'agent-cost', value: 30, unit: 'credits' })
ledger.add({ id: 'plugin-cost-1', kind: 'plugin-execution', value: 20, unit: 'credits' })

const budget = evaluateV5Budget({ monthlyLimit: 100, highCostActionRequiresApproval: true }, ledger)
if (!budget.withinBudget) errors.push('budget should remain within limit')

const migration = createV5MigrationPlan('v4-to-v5-demo', audit)
if (migration.importReviewRequired !== true) errors.push('migration must require import review')

if (!audit.hasAction('federation.snapshot')) errors.push('federation audit missing')
if (!audit.hasAction('agent.plan')) errors.push('agent plan audit missing')
if (!audit.hasAction('plugin.install')) errors.push('plugin install audit missing')
if (!audit.hasAction('migration.plan')) errors.push('migration audit missing')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V5 real implementation minimum proof passed.')
