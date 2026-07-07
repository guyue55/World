import admin from '../data/v2/stage-03/09-v2-admin-content-boundary.json'
import exportWorker from '../data/v2/stage-03/11-v2-export-worker.json'
import finalReport from '../data/v2/stage-03/12-v2-stage-three-final.json'
import vault from '../data/v2/stage-03/10-v2-private-vault-service.json'

const errors: string[] = []

if (!admin.modules.includes('publish-workflow')) errors.push('publish workflow missing')
if (!vault.privacyDefaults.includes('deny-by-default')) errors.push('deny-by-default missing')
if (!vault.privacyDefaults.includes('audit-all-access')) errors.push('audit-all-access missing')
if (!exportWorker.jobs.includes('vault-owner-export')) errors.push('vault owner export missing')
if (finalReport.decision !== 'v2-admin-vault-export-structure-complete-stage-four-allowed') {
  errors.push('stage three final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 stage 03 check passed.')
