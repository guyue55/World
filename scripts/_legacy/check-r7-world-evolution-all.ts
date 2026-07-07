import { checkBoundary, checkRequiredFiles, checkStage, failIfErrors } from './check-r7-world-evolution-common'
import { getR7Summary } from '../src/features/r7-world-evolution'

const summary = getR7Summary()
const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'data/r7-world-evolution/roadmap.json',
    'src/app/r7-evolution/page.tsx',
    'src/app/api/r7/world-state/route.ts',
    'src/components/r7-world-evolution/R7WorldEvolutionHero.tsx',
    'docs/10-development-history/r7-world-evolution/r7-all-tasks-and-extension-plan.md',
  ]),
  ...checkBoundary(),
]

if (summary.stages !== 4) errors.push('R7 must have 4 stages')
if (summary.batches !== 16) errors.push('R7 must have 16 batches')
if (summary.lifecycleStates < 8) errors.push('R7 lifecycle states are insufficient')
if (summary.maintenanceItems < 6) errors.push('R7 maintenance queue is insufficient')

failIfErrors(errors)
console.log('check:r7-world-evolution:all passed')
