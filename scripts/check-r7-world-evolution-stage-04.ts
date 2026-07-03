import { checkRequiredFiles, checkStage, failIfErrors } from './check-r7-world-evolution-common'

failIfErrors([
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles(["data/r7-world-evolution/evolution-boundary.json", "data/r7-world-evolution/r8-handoff.json", "src/app/r7-evolution/page.tsx", "scripts/run-r7-world-evolution-build.mjs"]),
])
console.log('check:r7-world-evolution:stage-04 passed')
