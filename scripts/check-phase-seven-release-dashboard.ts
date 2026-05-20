import fs from 'node:fs'
import path from 'node:path'
import phaseSevenReleaseDashboard from '../data/phase-seven-release-dashboard.json'
import phaseSevenReleaseEvidenceLedger from '../data/phase-seven-release-evidence-ledger.json'
import phaseSevenSeoAnalyticsPlan from '../data/phase-seven-seo-analytics-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseSevenReleaseDashboard.releaseReady !== false) errors.push('release dashboard must keep releaseReady=false')
  if (phaseSevenReleaseDashboard.cards.length < 5) errors.push('dashboard cards too few')
  if (phaseSevenSeoAnalyticsPlan.seoChecks.length < 6) errors.push('SEO checks too few')
  if (phaseSevenSeoAnalyticsPlan.analyticsPlan.length < 4) errors.push('analytics plan too small')
  if (phaseSevenReleaseEvidenceLedger.items.some((item) => item.status === 'passed')) {
    errors.push('release evidence must not be pre-marked passed')
  }

  ;[
    'src/app/release/page.tsx',
    'src/lib/phase-seven-release.ts',
    'src/components/release/ReleaseHero.tsx',
    'src/components/release/ReleaseDashboardPanel.tsx',
    'src/components/release/ReleaseEvidencePanel.tsx',
    'src/components/release/SeoAnalyticsPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing release file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-seven-release-dashboard']) errors.push('package missing check:phase-seven-release-dashboard')
  if (!pkg.scripts['phase-seven-release-dashboard:print']) errors.push('package missing phase-seven-release-dashboard:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase seven release dashboard check passed.')
}

main()
