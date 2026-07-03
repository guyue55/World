
import { checkRequiredFiles, checkStage, failIfErrors } from './check-r3-content-life-common'

const errors = [
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles(["data/r3-content-life/public-index-policy.json", "src/app/r3-content-life/page.tsx", "docs/10-development-history/r3-content-life/handoff-to-r4.md", "docs/10-development-history/r3-content-life/stage-04-report.md"]),
]

failIfErrors(errors)
console.log('R3 content life stage 04 check passed.')
