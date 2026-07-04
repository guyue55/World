import { checkRequiredFiles, checkStage, failIfErrors } from './check-r8-public-operations-common'

const errors = [
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles([
    'data/r8-public-operations/roadmap.json',
    'src/features/r8-public-operations/index.ts',
    'src/components/r8-public-operations/index.ts',
    'src/app/r8-public/page.tsx',
  ]),
]

failIfErrors(errors)
console.log('check:r8-public-operations:stage-02 passed')
