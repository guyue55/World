
import { checkRequiredFiles, checkStage, failIfErrors } from './check-r3-content-life-common'

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles(["data/r3-content-life/roadmap.json", "data/r3-content-life/world-nodes.json", "src/features/r3-content-life/data.ts", "docs/10-development-history/r3-content-life/stage-01-report.md"]),
]

failIfErrors(errors)
console.log('R3 content life stage 01 check passed.')
