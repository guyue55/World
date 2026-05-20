import previewSmokeChecks from '../data/release/preview-smoke-checks.json'
import previewDeploymentRecord from '../data/release/preview-deployment-record.json'
import performanceRunbook from '../data/engineering/performance-runbook.json'

function main() {
  console.log(`${previewSmokeChecks.name}`)
  console.log(`routes=${previewSmokeChecks.routes.length}`)
  console.log(`endpoints=${previewSmokeChecks.endpoints.length}`)
  console.log(`previewStatus=${previewDeploymentRecord.status}`)
  console.log(`performanceRoutes=${performanceRunbook.requiredRoutes.join(', ')}`)
}

main()
