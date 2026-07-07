import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-v7-release-common'

const errors = [
  ...checkStage(4, [13,14,15,16]),
  ...checkRequiredFiles([
  'data/v7-release-ops/roadmap.json',
  'data/v7-release-ops/extension-registry.json',
  'src/features/v7-release-ops/index.ts',
  'src/app/v7-release/page.tsx',
  'docs/10-development-history/v7-release-ops/stage-04-report.md',
  'data/v7-release-ops/quality-budget.json',
  'data/v7-release-ops/v8-handoff.json',
  'docs/10-development-history/v7-release-ops/handoff-to-v8.md',
  ]),
  ...checkBoundary(),
]

failIfErrors(errors)
console.log('V7 release stage 04 check passed.')
