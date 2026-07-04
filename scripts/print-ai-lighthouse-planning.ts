import phaseThreeAiLighthouseRoadmap from '../data/domains/ai/phase-three-ai-lighthouse-roadmap.json'
import aiSuggestionProtocol from '../data/domains/ai/ai-suggestion-protocol.json'
import phaseThreeAiSafetyGate from '../data/domains/ai/phase-three-ai-safety-gate.json'

function main() {
  console.log(`${phaseThreeAiLighthouseRoadmap.name}`)
  console.log(`stageProgress=${phaseThreeAiLighthouseRoadmap.stageProgress}`)
  console.log(`allowedCapabilities=${phaseThreeAiLighthouseRoadmap.allowedCapabilities.length}`)
  console.log(`forbiddenCapabilities=${phaseThreeAiLighthouseRoadmap.forbiddenCapabilities.length}`)
  console.log(`suggestionStatuses=${aiSuggestionProtocol.allowedStatuses.length}`)
  console.log(`safetyChecks=${phaseThreeAiSafetyGate.checks.length}`)
}

main()
