import fs from 'node:fs'
import { getRealContentSafetyIssues, isV5ContentLocallyReady, realContentCollections, realContentItems, realExhibitions, realReadingPaths, realTimelineEvents } from '../src/features/real-content-v5'

const errors: string[] = []

for (let batch = 1; batch <= 16; batch += 1) {
  const padded = String(batch).padStart(2, '0')
  const script = `scripts/check-v5-content-${padded}.ts`
  if (!fs.existsSync(script)) errors.push(`missing ${script}`)
}

for (const stage of ['01', '02', '03', '04']) {
  const script = `scripts/check-v5-content-stage-${stage}.ts`
  if (!fs.existsSync(script)) errors.push(`missing ${script}`)
}

const required = [
  'data/v5-real-content/plan.json',
  'data/v5-real-content/final-report.json',
  'docs/10-development-history/v5-real-content/README.md',
  'docs/10-development-history/v5-real-content/final-closure.md',
  'src/app/real-content/page.tsx',
  'src/features/real-content-v5/model.ts',
  'src/features/real-content-v5/data.ts',
  'src/features/real-content-v5/media.ts',
  'src/features/real-content-v5/world-links.ts',
  'src/features/real-content-v5/safety.ts',
]
for (const item of required) if (!fs.existsSync(item)) errors.push(`missing ${item}`)

const finalReport = JSON.parse(fs.readFileSync('data/v5-real-content/final-report.json', 'utf8'))
if (finalReport.status !== 'complete') errors.push('final report must be complete')
if (finalReport.completedStages !== 4 || finalReport.completedBatches !== 16) errors.push('final report counts invalid')
if (finalReport.productionLive !== false) errors.push('productionLive must remain false')

if (realContentItems.length < 5) errors.push('real content items too few')
if (realContentCollections.length < 3) errors.push('real content collections too few')
if (realTimelineEvents.length < 3) errors.push('real timeline events too few')
if (realExhibitions.length < 2) errors.push('real exhibitions too few')
if (realReadingPaths.length < 2) errors.push('real reading paths too few')
if (getRealContentSafetyIssues().length !== 0) errors.push('real content safety issues found')
if (!isV5ContentLocallyReady()) errors.push('V5 content must be locally ready')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V5 content checks passed.')
