import { checkRequiredFiles, checkStage, failIfErrors } from './check-r7-world-evolution-common'

failIfErrors([
  ...checkStage(3, [9, 10, 11, 12]),
  ...checkRequiredFiles(["data/r7-world-evolution/world-health.json", "data/r7-world-evolution/world-log.json", "data/r7-world-evolution/reflection-cycles.json", "data/r7-world-evolution/area-explainers.json"]),
])
console.log('check:r7-world-evolution:stage-03 passed')
