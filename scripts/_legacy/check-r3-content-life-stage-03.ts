
import { checkRequiredFiles, checkStage, failIfErrors } from './check-r3-content-life-common'

const errors = [
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkRequiredFiles(["data/r3-content-life/content-paths.json", "data/r3-content-life/timeline-events.json", "data/r3-content-life/area-density.json", "docs/10-development-history/r3-content-life/stage-03-report.md"]),
]

failIfErrors(errors)
console.log('R3 content life stage 03 check passed.')
