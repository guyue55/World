import fs from 'node:fs'
import path from 'node:path'
import manualSignoffPreparationChecklist from '../data/release/manual-signoff-preparation-checklist.json'
import realExecutionResultSummary from '../data/engineering/real-execution-result-summary.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (realExecutionResultSummary.realExecutionPassed !== false) errors.push('realExecutionPassed must remain false')
  if (realExecutionResultSummary.passed !== 0) errors.push('passed must remain 0')
  if (realExecutionResultSummary.totalRequired < 8) errors.push('totalRequired too small')
  if (manualSignoffPreparationChecklist.manualSignoffReady !== false) errors.push('manualSignoffReady must remain false')
  if (manualSignoffPreparationChecklist.items.length < 6) errors.push('manual signoff items too few')
  if (manualSignoffPreparationChecklist.items.some((item) => item.status === 'passed')) errors.push('manual signoff must not be pre-marked passed')

  ;[
    'src/app/evidence-sprint/page.tsx',
    'src/lib/phase-fourteen-evidence.ts',
    'src/components/evidence-sprint/EvidenceSprintHero.tsx',
    'src/components/evidence-sprint/ExecutionQueuePanel.tsx',
    'src/components/evidence-sprint/BlockerLedgerPanel.tsx',
    'src/components/evidence-sprint/ManualSignoffPanel.tsx',
    'src/components/evidence-sprint/ReleaseTransitionPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing evidence sprint file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-fourteen-evidence-dashboard']) errors.push('package missing check:phase-fourteen-evidence-dashboard')
  if (!pkg.scripts['phase-fourteen-evidence-dashboard:print']) errors.push('package missing phase-fourteen-evidence-dashboard:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase fourteen evidence dashboard check passed.')
}

main()
