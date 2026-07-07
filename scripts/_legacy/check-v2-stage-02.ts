import audit from '../data/v2/stage-02/08-v2-audit-evidence-foundation.json'
import auth from '../data/v2/stage-02/06-v2-auth-session-boundary.json'
import dataModel from '../data/v2/stage-02/05-v2-data-model-db-boundary.json'
import rbac from '../data/v2/stage-02/07-v2-rbac-policy.json'

const errors: string[] = []

if (!dataModel.entities.includes('PrivateVaultItem')) errors.push('PrivateVaultItem missing')
if (!dataModel.entities.includes('AuditEvent')) errors.push('AuditEvent missing')
if (!auth.sessionRules.includes('no private token in client')) errors.push('client private token rule missing')
if (!rbac.roles.includes('owner')) errors.push('owner role missing')
if (!rbac.permissions.includes('vault.read')) errors.push('vault.read permission missing')
if (!audit.events.includes('vault.accessDenied')) errors.push('vault access denied audit missing')
if (audit.decision !== 'v2-data-auth-rbac-audit-structure-complete-stage-three-allowed') {
  errors.push('stage two final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 stage 02 check passed.')
