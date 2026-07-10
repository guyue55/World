// 用途：构建公开 JSON 产物
import fs from 'node:fs'
import path from 'node:path'
import manifest from '../data/core/world-manifest.json'
import sceneRegistry from '../data/domains/experience/scene-registry.json'
import transitionRegistry from '../data/domains/experience/scene-transition-registry.json'
import ambientRegistry from '../data/domains/experience/ambient-environment-registry.json'
import journeyPolicy from '../data/domains/experience/journey-memory-policy.json'
import audioRegistry from '../data/domains/experience/sensory-audio-registry.json'
import { createPublicWorldIndex } from '../src/lib/public-index'

function writeJson(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

writeJson('public/world-index.json', createPublicWorldIndex())
writeJson('public/world-manifest.json', manifest)
writeJson('data/generated/world-runtime-public.json', {
  scene: {
    name: sceneRegistry.name, version: sceneRegistry.version, scope: sceneRegistry.scope,
    scenes: sceneRegistry.scenes, transitions: sceneRegistry.transitions, fallback: sceneRegistry.fallback,
    acceptance: { requiredSceneMatches: sceneRegistry.acceptance.requiredSceneMatches, requiredTransitions: sceneRegistry.acceptance.requiredTransitions },
    nextActions: sceneRegistry.nextActions,
  },
  transition: {
    name: transitionRegistry.name, version: transitionRegistry.version, scope: transitionRegistry.scope,
    shell: transitionRegistry.shell, motions: transitionRegistry.motions, routeExamples: transitionRegistry.routeExamples,
    acceptance: { requiredMotions: transitionRegistry.acceptance.requiredMotions, requiredSemanticRoutes: transitionRegistry.acceptance.requiredSemanticRoutes },
    nextActions: transitionRegistry.nextActions,
  },
  ambient: {
    name: ambientRegistry.name, version: ambientRegistry.version, scope: ambientRegistry.scope,
    display: ambientRegistry.display, dayPeriods: ambientRegistry.dayPeriods, seasons: ambientRegistry.seasons,
    aiStatuses: ambientRegistry.aiStatuses, sceneEnvironments: ambientRegistry.sceneEnvironments,
    fallback: ambientRegistry.fallback, nextActions: ambientRegistry.nextActions,
  },
  journey: {
    name: journeyPolicy.name, version: journeyPolicy.version, scope: journeyPolicy.scope,
    storage: journeyPolicy.storage, routeRules: journeyPolicy.routeRules, returningVisitor: journeyPolicy.returningVisitor,
    clearMemory: journeyPolicy.clearMemory, fallback: journeyPolicy.fallback, nextActions: journeyPolicy.nextActions,
  },
  audio: {
    name: audioRegistry.name, version: audioRegistry.version, scope: audioRegistry.scope,
    runtime: audioRegistry.runtime, sceneSoundscapes: audioRegistry.sceneSoundscapes,
    motifs: audioRegistry.motifs, assetInventory: audioRegistry.assetInventory,
  },
})
console.log('Public JSON files generated.')
