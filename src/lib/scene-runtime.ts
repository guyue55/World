import runtimeConfig from '../../data/generated/world-runtime-public.json'

const sceneRegistry = runtimeConfig.scene

export type SceneRegistry = typeof sceneRegistry
export type SceneDefinition = SceneRegistry['scenes'][number] | SceneRegistry['fallback']
export type SceneTransitionDefinition = SceneRegistry['transitions'][number]

export type SceneRuntimeSummary = {
  name: string
  version: string
  localOnly: boolean
  publicSceneOnly: boolean
  sceneCount: number
  transitionCount: number
  requiredSceneCount: number
  requiredTransitionCount: number
  scenes: SceneDefinition[]
  transitions: SceneTransitionDefinition[]
  nextActions: string[]
}

export function getSceneRegistry(): SceneRegistry {
  return sceneRegistry
}

export function getAllScenes(): SceneDefinition[] {
  return sceneRegistry.scenes
}

export function getPublicSceneSummary(): SceneRuntimeSummary {
  return {
    name: sceneRegistry.name,
    version: sceneRegistry.version,
    localOnly: sceneRegistry.scope.localOnly,
    publicSceneOnly: sceneRegistry.scope.publicSceneOnly,
    sceneCount: sceneRegistry.scenes.length,
    transitionCount: sceneRegistry.transitions.length,
    requiredSceneCount: sceneRegistry.acceptance.requiredSceneMatches.length,
    requiredTransitionCount: sceneRegistry.acceptance.requiredTransitions.length,
    scenes: sceneRegistry.scenes,
    transitions: sceneRegistry.transitions,
    nextActions: sceneRegistry.nextActions,
  }
}

export function getSceneForPathname(pathname: string): SceneDefinition {
  const normalizedPathname = normalizePathname(pathname)
  const exactScene = sceneRegistry.scenes.find((scene) => scene.match === normalizedPathname)
  if (exactScene) return exactScene

  if (normalizedPathname.startsWith('/node/')) {
    return findSceneByMatch('/node/[slug]')
  }

  if (normalizedPathname.startsWith('/paths/') && normalizedPathname !== '/paths') {
    return findSceneByMatch('/paths/[id]')
  }

  return sceneRegistry.fallback
}

export function getSceneTransition(fromPathname: string, toPathname: string): SceneTransitionDefinition {
  const fromScene = getSceneForPathname(fromPathname)
  const toScene = getSceneForPathname(toPathname)
  const transition = sceneRegistry.transitions.find((item) => item.from === fromScene.sceneType && item.to === toScene.sceneType)
  return transition ?? findTransitionById('default-scene-shift')
}

function findSceneByMatch(match: string): SceneDefinition {
  return sceneRegistry.scenes.find((scene) => scene.match === match) ?? sceneRegistry.fallback
}

function findTransitionById(id: string): SceneTransitionDefinition {
  return sceneRegistry.transitions.find((transition) => transition.id === id) ?? sceneRegistry.transitions[0]
}

function normalizePathname(pathname: string): string {
  const withoutQuery = pathname.split('?')[0]?.split('#')[0] ?? '/'
  if (!withoutQuery || withoutQuery === '/') return '/'
  return withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery
}
