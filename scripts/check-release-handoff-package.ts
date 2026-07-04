import fs from 'node:fs'
import path from 'node:path'
import releaseHandoffPackageContract from '../data/release/release-handoff-package-contract.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseHandoffPackageContract.requiredDocuments.length < 5) {
    errors.push('handoff required documents too few')
  }

  if (releaseHandoffPackageContract.requiredReports.length < 4) {
    errors.push('handoff required reports too few')
  }

  if (!releaseHandoffPackageContract.handoffRisks.some((risk) => risk.includes('release-ready'))) {
    errors.push('handoff risks must mention release-ready')
  }

  if (!releaseHandoffPackageContract.requiredCommands.includes('npm run release:dry-run')) {
    errors.push('handoff commands must include release:dry-run')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-handoff']) errors.push('package missing check:release-handoff')
  if (!pkg.scripts['release-handoff:print']) errors.push('package missing release-handoff:print')
  if (!pkg.scripts['release-handoff:manifest']) errors.push('package missing release-handoff:manifest')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release handoff package check passed.')
}

main()
