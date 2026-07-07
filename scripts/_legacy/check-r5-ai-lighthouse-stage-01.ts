import { checkRequiredFiles, checkStage, failIfErrors } from './check-r5-ai-lighthouse-common'

failIfErrors([
  ...checkStage(1, [1, 2, 3, 4]),
  ...checkRequiredFiles([
    'data/r5-ai-lighthouse/public-context.json',
    'data/r5-ai-lighthouse/guided-questions.json',
    'src/app/r5-lighthouse/page.tsx',
    'src/components/r5-ai-lighthouse/R5LighthouseHero.tsx',
  ]),
])
console.log('check:r5-ai-lighthouse:stage-01 passed')
