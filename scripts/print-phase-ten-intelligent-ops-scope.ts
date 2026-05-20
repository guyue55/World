import aiOperationsAssistantPlan from '../data/ai-operations-assistant-plan.json'
import phaseTenIntelligentOpsScopeContract from '../data/phase-ten-intelligent-ops-scope-contract.json'

function main() {
  console.log(`${phaseTenIntelligentOpsScopeContract.name}`)
  console.log(`stageProgress=${phaseTenIntelligentOpsScopeContract.stageProgress}`)
  console.log(`focus=${phaseTenIntelligentOpsScopeContract.focus.length}`)
  console.log(`assistantReady=${aiOperationsAssistantPlan.assistantReady}`)
  console.log(`capabilities=${aiOperationsAssistantPlan.capabilities.length}`)
  console.log(`forbiddenActions=${aiOperationsAssistantPlan.forbiddenActions.length}`)
}

main()
