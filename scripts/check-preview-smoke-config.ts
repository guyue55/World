import fs from 'node:fs'
import path from 'node:path'
import previewSmokeChecks from '../data/release/preview-smoke-checks.json'
import previewDeploymentRecord from '../data/release/preview-deployment-record.json'
import performanceRunbook from '../data/engineering/performance-runbook.json'

function main() {
  const errors: string[] = []

  if (!previewSmokeChecks.env.baseUrl) {
    errors.push('preview smoke base URL env is missing')
  }

  const routeIds = new Set(previewSmokeChecks.routes.map((route) => route.id))
  ;['home', 'atlas', 'archive', 'paths', 'ask', 'status', 'skeleton'].forEach((id) => {
    if (!routeIds.has(id)) errors.push(`missing smoke route: ${id}`)
  })

  const endpointIds = new Set(previewSmokeChecks.endpoints.map((endpoint) => endpoint.id))
  ;['world-index', 'world-manifest'].forEach((id) => {
    if (!endpointIds.has(id)) errors.push(`missing smoke endpoint: ${id}`)
  })

  if (previewDeploymentRecord.status !== 'pending') {
    errors.push('preview deployment record should remain pending before real deploy')
  }

  if (!performanceRunbook.requiredRoutes.includes('/')) {
    errors.push('performance runbook must include home route')
  }

  if (!fs.existsSync(path.join(process.cwd(), 'scripts/run-preview-smoke.mjs'))) {
    errors.push('missing preview smoke runner')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Preview smoke config check passed.')
}

main()
