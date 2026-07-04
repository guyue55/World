import { checkRequiredFiles, checkStage, failIfErrors } from './check-r4-creator-workbench-common'

const errors = [
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkRequiredFiles(["data/r4-creator-workbench/audit-log.json", "data/r4-creator-workbench/export-plan.json", "data/r4-creator-workbench/world-health.json", "src/components/r4-creator-workbench/R4AuditExportPanel.tsx", "docs/10-development-history/r4-creator-workbench/stage-03-report.md"]),
]

failIfErrors(errors)
console.log('R4 creator workbench stage 03 check passed.')
