import fs from 'node:fs'
import path from 'node:path'
import phaseThreeContentGrowthContract from '../data/phase-three-content-growth-contract.json'
import themeExhibitionMap from '../data/theme-exhibition-map.json'
import contentGrowthBoard from '../data/content-growth-board.json'
import releasePreparationFinalReport from '../data/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseThreeContentGrowthContract.growthModules.length < 5) {
    errors.push('content growth modules too few')
  }

  if (themeExhibitionMap.exhibitions.length < 4) {
    errors.push('theme exhibitions too few')
  }

  if (!themeExhibitionMap.exhibitions.some((item) => item.visibility === 'planning-only')) {
    errors.push('theme exhibition map must include planning-only boundary')
  }

  if (contentGrowthBoard.lanes.length < 5) {
    errors.push('content growth board lanes too few')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('content growth must preserve not-ready-for-release')
  }

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('ContentGrowthPanel')) {
    errors.push('status groups must include ContentGrowthPanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:content-growth']) errors.push('package missing check:content-growth')
  if (!pkg.scripts['content-growth:print']) errors.push('package missing content-growth:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Content growth check passed.')
}

main()
