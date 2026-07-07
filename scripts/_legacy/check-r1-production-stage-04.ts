import { checkRequiredFiles, checkStage, failIfErrors } from './check-r1-production-common'

const errors = [
  ...checkStage(4, [13, 14, 15, 16]),
  ...checkRequiredFiles([
    'data/r1-production-stabilization/roadmap.json',
    'data/r1-production-stabilization/extension-registry.json',
    'docs/10-development-history/r1-production-stabilization/r1-all-tasks-and-extension-plan.md',
    'docs/10-development-history/r1-production-stabilization/r1-execution-report.md',
  ]),
]

failIfErrors(errors)
console.log('R1 production stage 04 check passed.')
