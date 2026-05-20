import fs from 'node:fs'
import path from 'node:path'
import phaseFivePrivateFinalReport from '../data/phase-five-private-final-report.json'
import phaseSixEntryGate from '../data/phase-six-entry-gate.json'
import privateArchiveIndex from '../data/private-archive-index.json'
import inheritanceExportPlan from '../data/inheritance-export-plan.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFivePrivateFinalReport.completedBatches.length !== 4) {
    errors.push('phase five final report must record 4 batches')
  }

  if (phaseFivePrivateFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseFivePrivateFinalReport.phaseSixEntryDecision !== 'phase-six-planning-allowed-ai-boundary-must-inherit-private-policy') {
    errors.push('phase six entry decision mismatch')
  }

  if (!phaseFivePrivateFinalReport.notImplementedByDesign.includes('real private content storage')) {
    errors.push('final report must state real private content storage is not implemented')
  }

  if (!phaseSixEntryGate.mustNotDo.includes('summarize sealed or silent content')) {
    errors.push('phase six gate must forbid summarizing sealed/silent content')
  }

  if (privateArchiveIndex.items.some((item) => item.contentStored !== false)) {
    errors.push('private archive still must not store content')
  }

  if (inheritanceExportPlan.packages.some((item) => item.containsPrivate !== false)) {
    errors.push('inheritance packages must not contain private content')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-five-final']) errors.push('package missing check:phase-five-final')
  if (!pkg.scripts['phase-five-final:print']) errors.push('package missing phase-five-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase five final check passed.')
}

main()
