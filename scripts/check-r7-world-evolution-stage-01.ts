import { checkRequiredFiles, checkStage, failIfErrors } from './check-r7-world-evolution-common'

failIfErrors([
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles(["data/r7-world-evolution/world-state.json", "data/r7-world-evolution/lifecycle-rules.json", "data/r7-world-evolution/low-light-mode.json", "src/features/r7-world-evolution/index.ts"]),
])
console.log('check:r7-world-evolution:stage-01 passed')
