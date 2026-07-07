import {
  getDeveloperOnboarding,
  getFoundationBaseline,
  getFoundationHandoffManifest,
  getFutureExpansionGuardrails,
} from '../src/lib/foundation-baseline'

function main() {
  const baseline = getFoundationBaseline()
  const handoff = getFoundationHandoffManifest()
  const guardrails = getFutureExpansionGuardrails()
  const onboarding = getDeveloperOnboarding()

  console.log(`${baseline.name}`)
  console.log(baseline.principle)
  baseline.baselineItems.forEach((item) => console.log(`- ${item.id}: ${item.status}`))

  console.log(`Handoff: ${handoff.fromStage} -> ${handoff.toStage}`)
  handoff.handoffItems.forEach((item) => console.log(`- ${item.id}: ${item.title}`))

  console.log(`Guardrails: ${guardrails.guardrails.length}`)
  console.log(`Onboarding steps: ${onboarding.steps.length}`)
}

main()
