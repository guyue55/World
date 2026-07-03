import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-v7-release-common'

const errors = [
  ...checkStage(1, [1,2,3,4]),
  ...checkRequiredFiles([
  'data/v7-release-ops/roadmap.json',
  'data/v7-release-ops/extension-registry.json',
  'src/features/v7-release-ops/index.ts',
  'src/app/v7-release/page.tsx',
  'docs/10-development-history/v7-release-ops/stage-01-report.md',
  ]),
  ...checkBoundary(),
]

failIfErrors(errors)
console.log('V7 release stage 01 check passed.')
