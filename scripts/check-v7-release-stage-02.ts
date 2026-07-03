import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-v7-release-common'

const errors = [
  ...checkStage(2, [5,6,7,8]),
  ...checkRequiredFiles([
  'data/v7-release-ops/roadmap.json',
  'data/v7-release-ops/extension-registry.json',
  'src/features/v7-release-ops/index.ts',
  'src/app/v7-release/page.tsx',
  'docs/10-development-history/v7-release-ops/stage-02-report.md',
  'src/components/v7-release/V7OperationsCockpit.tsx',
  'src/components/v7-release/V7EvidenceMatrix.tsx',
  ]),
  ...checkBoundary(),
]

failIfErrors(errors)
console.log('V7 release stage 02 check passed.')
