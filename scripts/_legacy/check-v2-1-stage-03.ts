import fs from 'node:fs'
import path from 'node:path'
import dashboard from '../data/v2-1/stage-03-integration-dashboard.json'
import { getV21Status } from '../src/lib/v2-1/status'

const errors: string[] = []
const status = getV21Status()

if (dashboard.dashboardRoute !== '/v2-console') errors.push('dashboard route mismatch')
if (!fs.existsSync(path.join(process.cwd(), 'src/app/v2-console/page.tsx'))) {
  errors.push('v2 console page missing')
}
if (status.summary.routes < 5) errors.push('routes below 5')
if (status.permissions.viewer.includes('vault.read')) errors.push('viewer must not read vault')
if (!status.permissions.owner.includes('vault.read')) errors.push('owner must read vault')
if (status.summary.v3Allowed !== false) errors.push('v3Allowed must remain false before final gate')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2.1 stage 03 integration dashboard check passed.')
