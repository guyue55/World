import fs from 'node:fs'
import path from 'node:path'
import phaseThreePlanningCharter from '../data/phase-three-planning-charter.json'
import phaseThreeArchitectureContract from '../data/phase-three-architecture-contract.json'
import phaseThreeRoadmap from '../data/phase-three-roadmap.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseThreePlanningCharter.tracks.length < 5) {
    errors.push('phase three planning must include at least five tracks')
  }

  if (phaseThreePlanningCharter.nonGoals.includes('不宣称 release-ready') === false) {
    errors.push('phase three non-goals must forbid claiming release-ready')
  }

  if (phaseThreeArchitectureContract.layers.length < 6) {
    errors.push('phase three architecture layers too few')
  }

  if (phaseThreeRoadmap.batches.length !== 4) {
    errors.push('phase three planning roadmap must define four batches')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('phase three planning must preserve not-ready-for-release decision')
  }

  if (releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length < 1) {
    errors.push('phase three planning must preserve open release blockers')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('PhaseThreePlanningPanel')) {
    errors.push('status groups must include PhaseThreePlanningPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-three-planning']) errors.push('package missing check:phase-three-planning')
  if (!pkg.scripts['phase-three:print']) errors.push('package missing phase-three:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase three planning check passed.')
}

main()
