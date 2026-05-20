import fs from 'node:fs'
import path from 'node:path'
import releaseDryRunContract from '../data/release-dry-run-contract.json'
import realExecutionLandingFinalReport from '../data/real-execution-landing-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseDryRunContract.dryRunSteps.length < 6) {
    errors.push('release dry-run steps too few')
  }

  if (!releaseDryRunContract.rules.some((rule) => rule.includes('不执行生产部署'))) {
    errors.push('release dry-run must forbid production deployment')
  }

  if (releaseDryRunContract.output !== 'reports/release-dry-run-summary.json') {
    errors.push('unexpected dry-run output')
  }

  if (realExecutionLandingFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('release decision must remain not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['release:dry-run']) errors.push('package missing release:dry-run')
  if (!pkg.scripts['check:release-dry-run']) errors.push('package missing check:release-dry-run')
  if (!pkg.scripts['release-dry-run:print']) errors.push('package missing release-dry-run:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release dry-run check passed.')
}

main()
