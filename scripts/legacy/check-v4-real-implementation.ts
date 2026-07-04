import {
  V4AuditRecorder,
  V4InMemoryWorldRepository,
  approveV4Draft,
  approveV4PublishingJob,
  createV4Actor,
  evaluateV4PluginExecution,
  submitV4Draft,
} from '../src/platform/server/v4'

const errors: string[] = []
const audit = new V4AuditRecorder()
const repo = new V4InMemoryWorldRepository()

const owner = createV4Actor('owner-1', 'owner')
const editor = createV4Actor('editor-1', 'editor')

const draft = submitV4Draft(editor, { id: 'draft-1', title: 'V4 proof draft', status: 'draft', ownerId: owner.id }, audit)
const approved = approveV4Draft(owner, draft, audit)

if (approved.status !== 'approved') errors.push('draft approval failed')
if (!audit.hasAction('draft.submit')) errors.push('draft submit audit missing')
if (!audit.hasAction('publish.approve')) errors.push('publish approve audit missing')

repo.upsertNode({ id: 'public-node', title: 'Public Node', visibility: 'public' })
repo.upsertNode({ id: 'private-node', title: 'Private Node', visibility: 'private' })

if (repo.listPublicNodes().length !== 1) errors.push('public node isolation failed')
if (repo.listPrivateNodesForAuditOnly().length !== 1) errors.push('private audit listing failed')

const forbiddenPlugin = evaluateV4PluginExecution(owner, {
  pluginName: 'vault-reader',
  riskLevel: 'critical',
  wantsVaultRawAccess: true,
  wantsExternalPublish: false,
}, audit)

if (forbiddenPlugin.allowed) errors.push('plugin raw vault access must be denied')

const safePlugin = evaluateV4PluginExecution(owner, {
  pluginName: 'safe-export-preview',
  riskLevel: 'low',
  wantsVaultRawAccess: false,
  wantsExternalPublish: false,
}, audit)

if (!safePlugin.allowed) errors.push('safe plugin should be allowed in sandbox')

const approvedPublish = approveV4PublishingJob(owner, {
  id: 'publish-1',
  channel: 'static-site',
  status: 'review-required',
  checksum: 'sha256-demo',
}, audit)

if (approvedPublish.status !== 'approved') errors.push('publishing approval failed')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V4 real implementation minimum proof passed.')
