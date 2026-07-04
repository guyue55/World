import fs from 'node:fs'
import path from 'node:path'
import phaseEightEntryGate from '../data/release/phase-eight-entry-gate.json'
import phaseEightProductionEnvironmentMatrix from '../data/release/phase-eight-production-environment-matrix.json'
import phaseEightProductionScopeContract from '../data/release/phase-eight-production-scope-contract.json'
import phaseSevenReleaseFinalReport from '../data/release/phase-seven-release-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseEightEntryGate.entryDecision !== 'phase-eight-planning-allowed-real-production-release-not-started') {
    errors.push('phase eight entry decision mismatch')
  }

  if (phaseSevenReleaseFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('phase seven must still be not-ready-for-release')
  }

  if (phaseEightProductionScopeContract.focus.length < 7) errors.push('phase eight focus too small')

  if (!phaseEightProductionScopeContract.nonGoals.includes('claim production live without deployment evidence')) {
    errors.push('scope must forbid fake production claim')
  }

  const production = phaseEightProductionEnvironmentMatrix.environments.find((item) => item.id === 'production')
  if (!production) errors.push('missing production environment')
  if (production && production.requiresSignoff !== true) errors.push('production must require signoff')

  if (phaseEightProductionEnvironmentMatrix.productionRequirements.length < 7) {
    errors.push('production requirements too few')
  }

  const forbiddenSecret = phaseEightProductionEnvironmentMatrix.requiredSecrets.find((item) => item.visibility === 'secret-runtime' && item.name.includes('KEY'))
  if (forbiddenSecret) errors.push('raw secret key must not be documented as value')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eight-production-scope']) errors.push('package missing check:phase-eight-production-scope')
  if (!pkg.scripts['phase-eight-production-scope:print']) errors.push('package missing phase-eight-production-scope:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eight production scope check passed.')
}

main()
