import fs from 'node:fs'
import path from 'node:path'
import aiPathExhibitionRecommendations from '../data/ai-path-exhibition-recommendations.json'
import aiPermissionMatrix from '../data/ai-permission-matrix.json'
import aiSuggestionAuditQueue from '../data/ai-suggestion-audit-queue.json'
import aiReadableProtocol from '../data/ai-readable-protocol.json'
import phaseSevenEntryGate from '../data/phase-seven-entry-gate.json'
import phaseSixAiFinalReport from '../data/phase-six-ai-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseSixAiFinalReport.completedBatches.length !== 4) {
    errors.push('phase six final report must record 4 batches')
  }

  if (phaseSixAiFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseSixAiFinalReport.phaseSevenEntryDecision !== 'phase-seven-planning-allowed-public-release-and-long-term-operations-not-started') {
    errors.push('phase seven entry decision mismatch')
  }

  if (!phaseSixAiFinalReport.notImplementedByDesign.includes('real AI service integration')) {
    errors.push('final report must state real AI service integration is not implemented')
  }

  if (!phaseSevenEntryGate.mustNotDo.includes('claim release-ready without real evidence')) {
    errors.push('phase seven gate must forbid fake release-ready')
  }

  if (!aiReadableProtocol.forbiddenTiers.includes('sealed') || !aiReadableProtocol.forbiddenTiers.includes('silent')) {
    errors.push('sealed and silent must remain forbidden tiers')
  }

  const unsafeAllowed = aiPermissionMatrix.permissions.filter((item) => item.default === 'allow' && !['read-public', 'read-semi-public'].includes(item.operation))
  if (unsafeAllowed.length > 0) {
    errors.push(`unsafe allowed permissions: ${unsafeAllowed.map((item) => item.operation).join(', ')}`)
  }

  if (aiSuggestionAuditQueue.items.some((item) => item.execution !== 'not-executed')) {
    errors.push('suggestion audit queue must remain not executed')
  }

  if (aiPathExhibitionRecommendations.recommendations.some((item) => item.execution !== 'not-executed')) {
    errors.push('AI recommendations must remain not executed')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-six-final']) errors.push('package missing check:phase-six-final')
  if (!pkg.scripts['phase-six-final:print']) errors.push('package missing phase-six-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase six final check passed.')
}

main()
