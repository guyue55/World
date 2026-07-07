// 用途：检查真实执行手册
import fs from 'node:fs'
import path from 'node:path'
import realExecutionRunbookContract from '../data/engineering/real-execution-runbook-contract.json'
import realEvidenceExecutionAssistFinalReport from '../data/release/real-evidence-execution-assist-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const steps = realExecutionRunbookContract.orderedSteps.map((step) => step.id)

  if (steps[0] !== 'install') {
    errors.push('runbook must start with install')
  }

  ;['dependency-probe', 'evidence-capture', 'world-core', 'release-gate', 'browser-qa', 'blocker-review'].forEach((id) => {
    if (!steps.includes(id)) errors.push(`missing runbook step: ${id}`)
  })

  if (realExecutionRunbookContract.failureHandling.length < 4) {
    errors.push('failure handling rules too few')
  }

  if (realEvidenceExecutionAssistFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:real-execution-runbook']) errors.push('package missing check:real-execution-runbook')
  if (!pkg.scripts['real-execution-runbook:print']) errors.push('package missing real-execution-runbook:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real execution runbook check passed.')
}

main()
