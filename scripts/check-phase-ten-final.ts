import fs from 'node:fs'
import path from 'node:path'
import aiOperationsAssistantPlan from '../data/ai-operations-assistant-plan.json'
import automatedQualityPatrolPlan from '../data/automated-quality-patrol-plan.json'
import intelligentOperationsFeedbackLoop from '../data/intelligent-operations-feedback-loop.json'
import longTermDataInsightPlan from '../data/long-term-data-insight-plan.json'
import multiDeviceExperienceMatrix from '../data/multi-device-experience-matrix.json'
import multiDeviceExportPlan from '../data/multi-device-export-plan.json'
import phaseElevenEntryGate from '../data/phase-eleven-entry-gate.json'
import phaseTenIntelligentOpsFinalReport from '../data/phase-ten-intelligent-ops-final-report.json'
import pwaOfflineAccessPlan from '../data/pwa-offline-access-plan.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseTenIntelligentOpsFinalReport.completedBatches.length !== 4) {
    errors.push('phase ten final report must record 4 batches')
  }

  if (phaseTenIntelligentOpsFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseTenIntelligentOpsFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }

  if (phaseTenIntelligentOpsFinalReport.intelligentOpsDecision !== 'intelligent-ops-structure-ready-real-automation-not-started') {
    errors.push('intelligent ops decision mismatch')
  }

  const flags = [
    aiOperationsAssistantPlan.assistantReady,
    multiDeviceExperienceMatrix.deviceReady,
    pwaOfflineAccessPlan.pwaReady,
    multiDeviceExportPlan.exportReady,
    automatedQualityPatrolPlan.patrolReady,
    longTermDataInsightPlan.insightReady,
    intelligentOperationsFeedbackLoop.loopReady,
  ]

  if (flags.some((flag) => flag !== false)) {
    errors.push('all readiness flags must remain false')
  }

  if (phaseTenIntelligentOpsFinalReport.phaseElevenEntryDecision !== 'phase-eleven-planning-allowed-real-runtime-automation-and-growth-loop-not-started') {
    errors.push('phase eleven entry decision mismatch')
  }

  if (!phaseElevenEntryGate.mustNotDo.includes('AI autonomous publishing')) {
    errors.push('phase eleven gate must forbid AI autonomous publishing')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-ten-final']) errors.push('package missing check:phase-ten-final')
  if (!pkg.scripts['phase-ten-final:print']) errors.push('package missing phase-ten-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase ten final check passed.')
}

main()
