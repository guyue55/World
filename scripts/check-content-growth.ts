// 用途：检查内容增长
import fs from 'node:fs'
import path from 'node:path'
import phaseThreeContentGrowthContract from '../data/domains/content/phase-three-content-growth-contract.json'
import themeExhibitionMap from '../data/domains/experience/theme-exhibition-map.json'
import contentGrowthBoard from '../data/domains/content/content-growth-board.json'
import contentColumnOperationsPlan from '../data/domains/content/content-column-operations-plan.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'
import { getContentGrowthSummary } from '../src/lib/content-growth'

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

  if (contentColumnOperationsPlan.columns.length < 6) errors.push('content operation columns too few')
  for (const column of contentColumnOperationsPlan.columns) {
    if (column.visibility !== 'public') errors.push(`content operation column must remain public: ${column.id}`)
    if (!column.cadence) errors.push(`content operation column missing cadence: ${column.id}`)
  }

  const summary = getContentGrowthSummary()
  if (summary.weeklyColumns < 1) errors.push('content operations must include weekly column')
  if (summary.monthlyColumns < 1) errors.push('content operations must include monthly column')
  if (summary.cadenceKinds < 3) errors.push('content operations cadence kinds too few')

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('content growth must preserve not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:content-growth']) errors.push('package missing check:content-growth')
  if (!pkg.scripts['content-growth:print']) errors.push('package missing content-growth:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Content growth check passed.')
}

main()
