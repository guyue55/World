import fs from 'node:fs'
import path from 'node:path'
import phaseFourHandoffIndex from '../data/phase-four-handoff-index.json'
import phaseFourEntryGate from '../data/phase-four-entry-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourHandoffIndex.stageStatus.length < 6) {
    errors.push('handoff stage status too few')
  }

  if (!phaseFourHandoffIndex.stageStatus.some((item) => item.id === 'release-ready' && item.status === 'not-ready')) {
    errors.push('handoff must carry release-ready not-ready')
  }

  if (phaseFourHandoffIndex.keyDocuments.length < 6) {
    errors.push('key documents too few')
  }

  if (phaseFourHandoffIndex.keyCommands.length < 6) {
    errors.push('key commands too few')
  }

  if (phaseFourHandoffIndex.openEvidence.length < 5) {
    errors.push('open evidence too few')
  }

  if (phaseFourEntryGate.entryDecision !== 'phase-four-planning-allowed-release-ready-blocked') {
    errors.push('phase four entry gate decision mismatch')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-handoff-index']) errors.push('package missing check:phase-four-handoff-index')
  if (!pkg.scripts['phase-four-handoff:print']) errors.push('package missing phase-four-handoff:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four handoff index check passed.')
}

main()
