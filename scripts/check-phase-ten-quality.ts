import fs from 'node:fs'
import path from 'node:path'
import automatedQualityPatrolPlan from '../data/automated-quality-patrol-plan.json'
import intelligentOperationsFeedbackLoop from '../data/intelligent-operations-feedback-loop.json'
import longTermDataInsightPlan from '../data/long-term-data-insight-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (automatedQualityPatrolPlan.patrolReady !== false) errors.push('patrolReady must remain false')
  if (automatedQualityPatrolPlan.checks.length < 7) errors.push('patrol checks too few')
  if (automatedQualityPatrolPlan.checks.some((item) => item.humanReviewRequired !== true)) errors.push('patrol checks must require human review')
  if (longTermDataInsightPlan.insightReady !== false) errors.push('insightReady must remain false')
  if (longTermDataInsightPlan.signals.length < 5) errors.push('insight signals too few')
  if (intelligentOperationsFeedbackLoop.loopReady !== false) errors.push('loopReady must remain false')
  if (intelligentOperationsFeedbackLoop.steps.length < 6) errors.push('loop steps too few')
  ;[
    'src/lib/phase-ten-quality.ts',
    'src/components/intelligent-ops/QualityPatrolPanel.tsx',
    'src/components/intelligent-ops/DataInsightPanel.tsx',
    'src/components/intelligent-ops/OpsFeedbackLoopPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing quality file: ${file}`)
  })
  const page = read('src/app/intelligent-ops/page.tsx')
  if (!page.includes('QualityPatrolPanel') || !page.includes('DataInsightPanel') || !page.includes('OpsFeedbackLoopPanel')) {
    errors.push('intelligent ops page missing quality panels')
  }
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-ten-quality']) errors.push('package missing check:phase-ten-quality')
  if (!pkg.scripts['phase-ten-quality:print']) errors.push('package missing phase-ten-quality:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase ten quality check passed.')
}

main()
