import { checkRequiredFiles, checkStage, failIfErrors } from './check-r4-creator-workbench-common'

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles(["data/r4-creator-workbench/roadmap.json", "data/r4-creator-workbench/inbox-items.json", "data/r4-creator-workbench/node-operations.json", "src/features/r4-creator-workbench/data.ts", "docs/10-development-history/r4-creator-workbench/stage-01-report.md"]),
]

failIfErrors(errors)
console.log('R4 creator workbench stage 01 check passed.')
