import { checkRequiredFiles, checkStage, failIfErrors } from './check-r2-world-experience-common'

const errors = [
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles([
    'data/r2-world-experience/roadmap.json',
    'src/features/r2-world-experience/data.ts',
    'src/components/r2-world-entry/WorldEntryHero.tsx',
    'docs/10-development-history/r2-world-experience/stage-01-report.md',
  ]),
]

failIfErrors(errors)
console.log('R2 world experience stage 01 check passed.')
