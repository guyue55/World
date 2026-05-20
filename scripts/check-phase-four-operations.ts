import fs from 'node:fs'
import path from 'node:path'
import phaseFiveHandoffPreparation from '../data/release/phase-five-handoff-preparation.json'
import phaseFourOperationsBoard from '../data/operations/phase-four-operations-board.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourOperationsBoard.lanes.length < 4) errors.push('operations lanes too few')
  if (phaseFourOperationsBoard.metrics.length < 5) errors.push('operations metrics too few')
  if (!phaseFourOperationsBoard.rules.some((rule) => rule.includes('public visibility'))) errors.push('operations rules must protect public visibility')
  if (phaseFiveHandoffPreparation.phaseFiveCandidateFocus.length < 6) errors.push('phase five focus too few')
  if (!phaseFiveHandoffPreparation.rules.some((rule) => rule.includes('不得进入 public build'))) errors.push('phase five handoff must protect private content')

  ;[
    'src/lib/phase-four-operations.ts',
    'src/components/phase-four/OperationsBoardPanel.tsx',
    'src/components/phase-four/PhaseFiveHandoffPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing operations file: ${file}`)
  })

  const page = read('src/app/phase-four/page.tsx')
  if (!page.includes('OperationsBoardPanel') || !page.includes('PhaseFiveHandoffPanel')) {
    errors.push('phase-four page must include operations and phase-five handoff panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-operations']) errors.push('package missing check:phase-four-operations')
  if (!pkg.scripts['phase-four-operations:print']) errors.push('package missing phase-four-operations:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four operations check passed.')
}

main()
