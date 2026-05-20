import fs from 'node:fs'
import path from 'node:path'
import aiOperationsAssistantPlan from '../data/ai-operations-assistant-plan.json'
import phaseNineContentBrandFinalReport from '../data/phase-nine-content-brand-final-report.json'
import phaseTenEntryGate from '../data/phase-ten-entry-gate.json'
import phaseTenIntelligentOpsScopeContract from '../data/phase-ten-intelligent-ops-scope-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseTenEntryGate.entryDecision !== 'phase-ten-planning-allowed-intelligent-operations-and-multi-device-expansion-not-started') {
    errors.push('phase ten entry decision mismatch')
  }

  if (phaseNineContentBrandFinalReport.contentDecision !== 'content-ecosystem-structure-ready-real-publication-not-started') {
    errors.push('phase nine content decision mismatch')
  }

  if (phaseTenIntelligentOpsScopeContract.focus.length < 8) errors.push('phase ten focus too small')
  if (!phaseTenIntelligentOpsScopeContract.nonGoals.includes('AI autonomous publishing')) errors.push('must forbid AI autonomous publishing')

  if (aiOperationsAssistantPlan.assistantReady !== false) errors.push('assistantReady must remain false')
  if (aiOperationsAssistantPlan.capabilities.length < 5) errors.push('AI ops capabilities too few')
  if (aiOperationsAssistantPlan.capabilities.some((item) => item.humanReviewRequired !== true)) errors.push('all AI ops capabilities must require human review')
  if (!aiOperationsAssistantPlan.forbiddenActions.includes('auto-claim-release-ready')) errors.push('must forbid auto release-ready claim')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-ten-intelligent-ops-scope']) errors.push('package missing check:phase-ten-intelligent-ops-scope')
  if (!pkg.scripts['phase-ten-intelligent-ops-scope:print']) errors.push('package missing phase-ten-intelligent-ops-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase ten intelligent ops scope check passed.')
}

main()
