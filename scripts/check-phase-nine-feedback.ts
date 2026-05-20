import fs from 'node:fs'
import path from 'node:path'
import communityFeedbackLoopPlan from '../data/community-feedback-loop-plan.json'
import contentQualityReviewStandard from '../data/content-quality-review-standard.json'
import publicWorldBookPublishingPlan from '../data/public-world-book-publishing-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (publicWorldBookPublishingPlan.worldBookReady !== false) errors.push('worldBookReady must remain false')
  if (publicWorldBookPublishingPlan.sections.length < 6) errors.push('world book sections too few')
  if (publicWorldBookPublishingPlan.sections.some((item) => item.visibility !== 'public')) errors.push('world book sections must be public')
  if (contentQualityReviewStandard.criteria.length < 7) errors.push('quality criteria too few')
  if (contentQualityReviewStandard.criteria.some((item) => item.required !== true)) errors.push('quality criteria must be required')
  if (communityFeedbackLoopPlan.feedbackChannels.length < 4) errors.push('feedback channels too few')
  if (communityFeedbackLoopPlan.loopSteps.length < 6) errors.push('feedback steps too few')
  ;[
    'src/lib/phase-nine-feedback.ts',
    'src/components/content-ecosystem/WorldBookPanel.tsx',
    'src/components/content-ecosystem/QualityReviewPanel.tsx',
    'src/components/content-ecosystem/FeedbackLoopPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing feedback file: ${file}`)
  })
  const page = read('src/app/content-ecosystem/page.tsx')
  if (!page.includes('WorldBookPanel') || !page.includes('QualityReviewPanel') || !page.includes('FeedbackLoopPanel')) {
    errors.push('content ecosystem page missing feedback panels')
  }
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-nine-feedback']) errors.push('package missing check:phase-nine-feedback')
  if (!pkg.scripts['phase-nine-feedback:print']) errors.push('package missing phase-nine-feedback:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase nine feedback check passed.')
}

main()
