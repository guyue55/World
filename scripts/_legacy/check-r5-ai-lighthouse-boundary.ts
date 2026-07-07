import { checkBoundary, failIfErrors, readJson } from './check-r5-ai-lighthouse-common'

const capabilities = readJson('data/r5-ai-lighthouse/capabilities.json')
const publicContext = readJson('data/r5-ai-lighthouse/public-context.json')
const errors = checkBoundary()

for (const item of publicContext.items) {
  if (item.visibility !== 'public') errors.push(`public context cannot include non-public item: ${item.id}`)
}

if (!capabilities.forbiddenActions.includes('bypass-review')) errors.push('forbidden actions must explicitly include bypass-review')

failIfErrors(errors)
console.log('check:r5-ai-lighthouse:boundary passed')
