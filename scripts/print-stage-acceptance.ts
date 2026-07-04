import {
  getFinalAcceptanceChecklist,
  getReleasePreviewChecklist,
  getStageCompletionGate,
} from '../src/lib/stage-acceptance'

function main() {
  const gate = getStageCompletionGate()
  const preview = getReleasePreviewChecklist()
  const acceptance = getFinalAcceptanceChecklist()

  console.log(`${gate.name}`)
  console.log(`currentStatus=${gate.currentStatus}`)
  console.log(`completionGates=${gate.completionGates.length}`)
  console.log(`externalRequired=${gate.completionGates.filter((item) => item.status === 'external-required').length}`)
  console.log(`previewChecks=${preview.requiredChecks.length}`)
  console.log(`acceptanceAreas=${acceptance.acceptanceAreas.length}`)
}

main()
