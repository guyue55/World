import { checkRequiredFiles, checkStage, failIfErrors } from './check-r7-world-evolution-common'

failIfErrors([
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles(["data/r7-world-evolution/daily-world.json", "data/r7-world-evolution/maintenance-rituals.json", "data/r7-world-evolution/maintenance-queue.json", "src/components/r7-world-evolution/R7WorldStatePanels.tsx"]),
])
console.log('check:r7-world-evolution:stage-02 passed')
