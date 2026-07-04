import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors, readJson } from './check-r8-public-operations-common'

const roadmap = readJson('data/r8-public-operations/roadmap.json')
const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'data/r8-public-operations/release-channels.json',
    'data/r8-public-operations/content-calendar.json',
    'data/r8-public-operations/privacy-release-guard.json',
    'data/r8-public-operations/public-smoke-tests.json',
    'data/r8-public-operations/feedback-loop.json',
    'src/app/api/r8/public-status/route.ts',
    'src/app/api/r8/public-log/route.ts',
    'src/app/api/r8/feedback/route.ts',
    'docs/10-development-history/r8-public-operations/r8-all-tasks-and-extension-plan.md',
    'docs/10-development-history/r8-public-operations/r8-execution-report.md',
  ]),
  ...checkBoundary(),
]

if (roadmap.batches.length !== 16) errors.push('R8 roadmap must include 16 batches')
if (roadmap.stages.length !== 4) errors.push('R8 roadmap must include 4 stages')

failIfErrors(errors)
console.log('check:r8-public-operations:all passed')
