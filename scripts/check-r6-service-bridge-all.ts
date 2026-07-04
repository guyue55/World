import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-r6-service-bridge-common'

failIfErrors([
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkBoundary(),
  ...checkRequiredFiles([
    'data/r6-service-bridge/roadmap.json',
    'src/features/r6-service-bridge/index.ts',
    'src/components/r6-service-bridge/index.ts',
    'src/app/r6-service/page.tsx',
    'src/app/api/r6/service-health/route.ts',
    'docs/10-development-history/r6-service-bridge/r6-all-tasks-and-extension-plan.md',
  ]),
])
console.log('check:r6-service-bridge:all passed')
