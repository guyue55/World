// 用途：确保 evidence 与终局 verifier 消费同一份冻结生命世界验收契约。
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

const contractPath = 'data/domains/experience/living-world-acceptance.json'
const evidencePath = 'scripts/evidence-worldos-reality-first.mjs'
const verifierPath = 'scripts/verify-worldos-living-world-final.mjs'
const failures = []
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'))
const evidenceSource = fs.readFileSync(evidencePath, 'utf8')

function assert(condition, message) {
  if (!condition) failures.push(message)
}

assert(contract.schemaVersion === '1.2.0', 'acceptance schema must be 1.2.0')
assert(contract.status === 'FROZEN_PRE_GOAL', 'acceptance status must remain frozen')
assert(contract.scenes?.length === 7, 'acceptance scene count must be 7')
assert(contract.views?.length === 9, 'acceptance view count must be 9')
assert(contract.flows?.length === 14, 'acceptance flow count must be 14')
assert(JSON.stringify(contract.targets) === JSON.stringify({
  currentGoalFinal: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING',
  automaticWithoutHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER_HUMAN_AUDIO_PENDING',
  fallbackWithoutHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK_HUMAN_AUDIO_PENDING',
  fallbackWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_FALLBACK',
  providerWithHumanAudioSignoff: 'LOCAL_LIVING_WORLD_CANDIDATE_AI_PROVIDER',
  promotionOutsideGoalRequired: true,
}), 'candidate status ladder drift')
assert(evidenceSource.includes('data/domains/experience/living-world-acceptance.json'), 'evidence does not consume living-world acceptance')
assert(!evidenceSource.includes('data/domains/experience/reality-first-route-contract.json'), 'evidence still consumes legacy route contract')

if (failures.length === 0) {
  for (const [name, script] of [['evidence', evidencePath], ['final-verifier', verifierPath]]) {
    const result = spawnSync(process.execPath, [script, '--contract-only'], { encoding: 'utf8' })
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
    if (result.status !== 0) failures.push(`${name} contract-only failed: ${output}`)
    if (!output.includes(name === 'evidence' ? 'EVIDENCE_ACCEPTANCE_CONTRACT_PASS' : 'ACCEPTANCE_CONTRACT_PASS')) {
      failures.push(`${name} contract-only output is not authoritative`)
    }
  }
}

if (failures.length) {
  console.error(`LIVING_WORLD_ACCEPTANCE_CONSUMERS_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`LIVING_WORLD_ACCEPTANCE_CONSUMERS_PASS scenes=${contract.scenes.length} views=${contract.views.length} flows=${contract.flows.length} target=${contract.targets.currentGoalFinal}`)
