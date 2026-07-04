import aiProviders from '../data/v2/stage-04/13-v2-ai-provider-boundary.json'
import aiWorkflow from '../data/v2/stage-04/14-v2-ai-workflow-audit.json'
import finalReport from '../data/v2/stage-04/16-v2-stage-four-final.json'
import opsApi from '../data/v2/stage-04/15-v2-ops-api-orchestration.json'

const errors: string[] = []

if (!aiProviders.adapterRules.includes('no key in client')) errors.push('no-key-in-client rule missing')
if (!aiProviders.adapterRules.includes('redact private content')) errors.push('redaction rule missing')
if (!aiWorkflow.approvalStates.includes('rejected')) errors.push('AI rejection state missing')
if (!opsApi.apis.includes('/api/v2/audit')) errors.push('audit API missing')
if (!opsApi.taskTypes.includes('release-gate')) errors.push('release-gate task missing')
if (finalReport.decision !== 'v2-ai-ops-orchestration-structure-complete-stage-five-allowed') {
  errors.push('stage four final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V2 stage 04 check passed.')
