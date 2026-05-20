import { createAuditEvent } from '../src/server/v2/audit'
import { getDemoActor } from '../src/server/v2/context'
import { requirePermission } from '../src/server/v2/permissions'
import { v2Repository } from '../src/server/v2/repository'

const errors: string[] = []

const owner = getDemoActor('owner')
const viewer = getDemoActor('viewer')

if (!requirePermission(owner, 'vault.read').allowed) errors.push('owner must read vault')
if (requirePermission(viewer, 'vault.read').allowed) errors.push('viewer must not read vault')
if (v2Repository.listPublicContent().length < 1) errors.push('public seed content missing')

const audit = createAuditEvent({
  actor: viewer,
  action: 'vault.read',
  resource: 'vault:test',
  allowed: false,
  reason: 'viewer denied',
})

if (audit.allowed !== false || audit.resource !== 'vault:test') errors.push('audit event mismatch')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2.1 stage 01 service foundation check passed.')
