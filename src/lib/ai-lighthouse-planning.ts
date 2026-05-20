import phaseThreeAiLighthouseRoadmap from '../../data/phase-three-ai-lighthouse-roadmap.json'
import aiSuggestionProtocol from '../../data/ai-suggestion-protocol.json'
import phaseThreeAiSafetyGate from '../../data/phase-three-ai-safety-gate.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getPhaseThreeAiLighthouseRoadmap() {
  return phaseThreeAiLighthouseRoadmap
}

export function getAiSuggestionProtocol() {
  return aiSuggestionProtocol
}

export function getPhaseThreeAiSafetyGate() {
  return phaseThreeAiSafetyGate
}

export function getAiLighthousePlanningSummary() {
  return {
    stageProgress: phaseThreeAiLighthouseRoadmap.stageProgress,
    allowedCapabilities: phaseThreeAiLighthouseRoadmap.allowedCapabilities.length,
    forbiddenCapabilities: phaseThreeAiLighthouseRoadmap.forbiddenCapabilities.length,
    requiredUserActions: phaseThreeAiLighthouseRoadmap.requiredUserActions.length,
    safetyChecks: phaseThreeAiSafetyGate.checks.length,
    suggestionStatuses: aiSuggestionProtocol.allowedStatuses.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
