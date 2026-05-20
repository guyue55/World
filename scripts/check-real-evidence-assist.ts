import fs from 'node:fs'
import path from 'node:path'
import realEvidenceExecutionAssistFinalReport from '../data/real-evidence-execution-assist-final-report.json'
import realEvidenceExecutionAssistReadiness from '../data/real-evidence-execution-assist-readiness.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realEvidenceExecutionAssistFinalReport.completedBatches.length !== 4) {
    errors.push('execution assist final report must record 4 batches')
  }

  if (realEvidenceExecutionAssistFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('execution assist must keep not-ready-for-release')
  }

  if (realEvidenceExecutionAssistReadiness.status !== 'assist-ready-real-execution-pending') {
    errors.push('assist readiness status must remain assist-ready-real-execution-pending')
  }

  if (!realEvidenceExecutionAssistReadiness.items.some((item) => item.status === 'blocked')) {
    errors.push('assist readiness must include blocked release-ready item')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release preparation final report must remain not-ready-for-release')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('release blockers must remain visible')
  }

  const evidencePage = read('src/app/evidence/page.tsx')
  if (!evidencePage.includes('EvidenceAssistClosurePanel')) {
    errors.push('evidence page must include EvidenceAssistClosurePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:real-evidence-assist']) errors.push('package missing check:real-evidence-assist')
  if (!pkg.scripts['real-evidence-assist:print']) errors.push('package missing real-evidence-assist:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real evidence assist check passed.')
}

main()
