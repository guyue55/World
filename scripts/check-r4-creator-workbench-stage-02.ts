import { checkRequiredFiles, checkStage, failIfErrors } from './check-r4-creator-workbench-common'

const errors = [
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles(["data/r4-creator-workbench/console-panels.json", "data/r4-creator-workbench/permission-risks.json", "data/r4-creator-workbench/maintenance-tasks.json", "src/components/r4-creator-workbench/R4PermissionGate.tsx", "docs/10-development-history/r4-creator-workbench/stage-02-report.md"]),
]

failIfErrors(errors)
console.log('R4 creator workbench stage 02 check passed.')
