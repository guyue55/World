import fs from 'node:fs'
import path from 'node:path'
import contentCalendarPlan from '../data/content-calendar-plan.json'
import contentColumnOperationsPlan from '../data/content-column-operations-plan.json'
import contentCommunicationChannels from '../data/content-communication-channels.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (contentCalendarPlan.publicationReady !== false) errors.push('publicationReady must remain false')
  if (contentCalendarPlan.monthlyPlan.length < 4) errors.push('monthly plan too small')
  if (contentCalendarPlan.monthlyPlan.some((item) => item.visibility !== 'public')) errors.push('calendar must be public')
  if (contentCalendarPlan.monthlyPlan.some((item) => item.humanReviewRequired !== true)) errors.push('calendar must require human review')
  if (contentColumnOperationsPlan.columns.length < 6) errors.push('columns too few')
  if (contentColumnOperationsPlan.columns.some((item) => item.visibility !== 'public')) errors.push('columns must be public')
  if (contentCommunicationChannels.channels.length < 5) errors.push('channels too few')
  ;[
    'src/app/content-ecosystem/page.tsx',
    'src/lib/phase-nine-content.ts',
    'src/components/content-ecosystem/ContentEcosystemHero.tsx',
    'src/components/content-ecosystem/TopicPillarsPanel.tsx',
    'src/components/content-ecosystem/ContentCalendarPanel.tsx',
    'src/components/content-ecosystem/ColumnsChannelsPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing content ecosystem file: ${file}`)
  })
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-nine-content-calendar']) errors.push('package missing check:phase-nine-content-calendar')
  if (!pkg.scripts['phase-nine-content-calendar:print']) errors.push('package missing phase-nine-content-calendar:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase nine content calendar check passed.')
}

main()
