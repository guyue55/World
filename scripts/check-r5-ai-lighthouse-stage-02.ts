import { checkRequiredFiles, checkStage, failIfErrors } from './check-r5-ai-lighthouse-common'

failIfErrors([
  ...checkStage(2, [5, 6, 7, 8]),
  ...checkRequiredFiles([
    'data/r5-ai-lighthouse/capabilities.json',
    'data/r5-ai-lighthouse/path-recommendations.json',
    'src/components/r5-ai-lighthouse/R5PathRecommendations.tsx',
    'src/features/r5-ai-lighthouse/data.ts',
  ]),
])
console.log('check:r5-ai-lighthouse:stage-02 passed')
