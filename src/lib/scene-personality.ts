import scenePersonalityRegistry from '../../data/domains/experience/scene-personality-registry.json'
import { getSceneForPathname } from './scene-runtime'

export type ScenePersonalityRegistry = typeof scenePersonalityRegistry
export type ScenePersonalityDefinition = ScenePersonalityRegistry['personalities'][number] | ScenePersonalityRegistry['fallback']

export type ScenePersonalitySummary = {
  name: string
  version: string
  localOnly: boolean
  publicSceneOnly: boolean
  personalityCount: number
  requiredPersonalityCount: number
  personalities: ScenePersonalityDefinition[]
  nextActions: string[]
}

export function getScenePersonalityRegistry(): ScenePersonalityRegistry {
  return scenePersonalityRegistry
}

export function getScenePersonalities(): ScenePersonalityDefinition[] {
  return scenePersonalityRegistry.personalities
}

export function getScenePersonalityForSceneId(sceneId: string): ScenePersonalityDefinition {
  return scenePersonalityRegistry.personalities.find((personality) => personality.sceneId === sceneId) ?? scenePersonalityRegistry.fallback
}

export function getScenePersonalityForPathname(pathname: string): ScenePersonalityDefinition {
  const scene = getSceneForPathname(pathname)
  return getScenePersonalityForSceneId(scene.id)
}

export function getScenePersonalitySummary(): ScenePersonalitySummary {
  return {
    name: scenePersonalityRegistry.name,
    version: scenePersonalityRegistry.version,
    localOnly: scenePersonalityRegistry.scope.localOnly,
    publicSceneOnly: scenePersonalityRegistry.scope.publicSceneOnly,
    personalityCount: scenePersonalityRegistry.personalities.length,
    requiredPersonalityCount: scenePersonalityRegistry.acceptance.requiredSceneIds.length,
    personalities: scenePersonalityRegistry.personalities,
    nextActions: scenePersonalityRegistry.nextActions,
  }
}
