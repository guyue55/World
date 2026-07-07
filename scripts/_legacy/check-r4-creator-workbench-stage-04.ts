import { checkRequiredFiles, checkStage, failIfErrors } from './check-r4-creator-workbench-common'

const errors = [
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles(["data/r4-creator-workbench/r5-handoff.json", "scripts/check-r4-creator-workbench-all.ts", "scripts/check-r4-creator-workbench-boundary.ts", "src/app/r4-creator/page.tsx", "docs/10-development-history/r4-creator-workbench/r4-to-r5-handoff.md"]),
]

failIfErrors(errors)
console.log('R4 creator workbench stage 04 check passed.')
