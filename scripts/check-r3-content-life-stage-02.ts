
import { checkRequiredFiles, checkStage, failIfErrors } from './check-r3-content-life-common'

const errors = [
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles(["data/r3-content-life/relation-graph.json", "data/r3-content-life/lifecycle-rules.json", "src/components/r3-content-life/R3NodePassportPanel.tsx", "docs/10-development-history/r3-content-life/stage-02-report.md"]),
]

failIfErrors(errors)
console.log('R3 content life stage 02 check passed.')
