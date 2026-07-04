import fs from 'node:fs'
import path from 'node:path'
import {
  getCiReadinessContract,
  getFinalAcceptanceChecklist,
  getReleasePreviewChecklist,
  getStageCompletionGate,
  validateStageAcceptance,
} from '../src/lib/stage-acceptance'

function main() {
  const issues = validateStageAcceptance()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const ci = getCiReadinessContract()
  if (!fs.existsSync(path.join(process.cwd(), ci.workflow))) {
    errors.push(`missing CI workflow: ${ci.workflow}`)
  }

  const gateIds = new Set(getStageCompletionGate().completionGates.map((gate) => gate.id))
  ;['gate-build', 'gate-visual-qa', 'gate-performance-measurement', 'gate-preview-deploy'].forEach((gate) => {
    if (!gateIds.has(gate)) errors.push(`missing completion gate: ${gate}`)
  })

  const previewIds = new Set(getReleasePreviewChecklist().requiredChecks.map((item) => item.id))
  ;['home-route', 'public-index', 'manifest'].forEach((item) => {
    if (!previewIds.has(item)) errors.push(`missing preview check: ${item}`)
  })

  const areas = new Set(getFinalAcceptanceChecklist().acceptanceAreas.map((item) => item.id))
  ;['foundation', 'architecture', 'privacy-ai', 'performance', 'experience', 'content', 'operations', 'release'].forEach((area) => {
    if (!areas.has(area)) errors.push(`missing acceptance area: ${area}`)
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Stage acceptance check passed. warnings=${warnings.length}`)
}

main()
