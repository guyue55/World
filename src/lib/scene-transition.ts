import sceneTransitionRegistry from '../../data/domains/experience/scene-transition-registry.json'
import {
  getSceneForPathname,
  getSceneTransition,
  type SceneDefinition,
  type SceneTransitionDefinition,
} from './scene-runtime'

export type SceneTransitionRegistry = typeof sceneTransitionRegistry
export type SceneTransitionMotion = SceneTransitionRegistry['motions'][number]
export type SceneTransitionRouteExample = SceneTransitionRegistry['routeExamples'][number]

export type SceneTransitionRuntime = {
  fromScene: SceneDefinition
  toScene: SceneDefinition
  transition: SceneTransitionDefinition
  motion: SceneTransitionMotion
  reducedMotionBehavior: string
}

export type SceneTransitionSummary = {
  name: string
  version: string
  localOnly: boolean
  publicSceneOnly: boolean
  shellComponent: string
  motionCount: number
  requiredMotionCount: number
  routeExampleCount: number
  motions: SceneTransitionMotion[]
  routeExamples: SceneTransitionRouteExample[]
  requiredSemanticRoutes: string[]
  nextActions: string[]
}

export function getSceneTransitionRegistry(): SceneTransitionRegistry {
  return sceneTransitionRegistry
}

export function getSceneTransitionMotions(): SceneTransitionMotion[] {
  return sceneTransitionRegistry.motions
}

export function getSceneTransitionMotion(motionId: string): SceneTransitionMotion {
  return sceneTransitionRegistry.motions.find((motion) => motion.id === motionId)
    ?? sceneTransitionRegistry.motions.find((motion) => motion.id === 'fade-rise')
    ?? sceneTransitionRegistry.motions[0]
}

export function getSceneTransitionForPathnames(fromPathname: string, toPathname: string): SceneTransitionRuntime {
  const fromScene = getSceneForPathname(fromPathname)
  const toScene = getSceneForPathname(toPathname)
  const transition = getSceneTransition(fromPathname, toPathname)

  return {
    fromScene,
    toScene,
    transition,
    motion: getSceneTransitionMotion(transition.motion),
    reducedMotionBehavior: sceneTransitionRegistry.shell.reducedMotionBehavior,
  }
}

export function getSceneTransitionSummary(): SceneTransitionSummary {
  return {
    name: sceneTransitionRegistry.name,
    version: sceneTransitionRegistry.version,
    localOnly: sceneTransitionRegistry.scope.localOnly,
    publicSceneOnly: sceneTransitionRegistry.scope.publicSceneOnly,
    shellComponent: sceneTransitionRegistry.shell.component,
    motionCount: sceneTransitionRegistry.motions.length,
    requiredMotionCount: sceneTransitionRegistry.acceptance.requiredMotions.length,
    routeExampleCount: sceneTransitionRegistry.routeExamples.length,
    motions: sceneTransitionRegistry.motions,
    routeExamples: sceneTransitionRegistry.routeExamples,
    requiredSemanticRoutes: sceneTransitionRegistry.acceptance.requiredSemanticRoutes,
    nextActions: sceneTransitionRegistry.nextActions,
  }
}
