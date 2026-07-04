import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-r4-creator-workbench-common'

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'data/r4-creator-workbench/roadmap.json',
    'data/r4-creator-workbench/inbox-items.json',
    'data/r4-creator-workbench/console-panels.json',
    'data/r4-creator-workbench/permission-risks.json',
    'data/r4-creator-workbench/r5-handoff.json',
    'src/features/r4-creator-workbench/index.ts',
    'src/components/r4-creator-workbench/index.ts',
    'src/app/r4-creator/page.tsx',
    'docs/10-development-history/r4-creator-workbench/r4-round-plan.md',
  ]),
  ...checkBoundary(),
]

failIfErrors(errors)
console.log('R4 creator workbench aggregate check passed.')
