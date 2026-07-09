import { getSceneForPathname, type SceneDefinition } from './scene-runtime'

export type WorldSceneState = 'booting' | 'firstVisit' | 'sceneReady' | 'transitioning' | 'settled' | 'degraded' | 'error'
export type WorldTransitionState = 'source' | 'leaving' | 'preview' | 'arriving' | 'settled' | 'reduced'
export type WorldMotionMode = 'full' | 'reduced' | 'off'
export type WorldSensoryMode = 'full' | 'quiet' | 'silent'
export type WorldAiMode = 'disabled' | 'ready' | 'thinking' | 'fallback' | 'error'
export type WorldPermissionMode = 'public' | 'authorized' | 'denied'
export type WorldNetworkMode = 'local' | 'lan' | 'offline-like'

export type WorldRuntimeStateInput = {
  pathname: string
  previousPathname?: string | null
  visitedCount: number
  hydrated: boolean
  reducedMotion: boolean
  compactMotion: boolean
  motionOff?: boolean
  sensoryQuiet?: boolean
  sensorySilent?: boolean
  aiStatus: 'enabled' | 'low-light' | 'disabled'
  networkMode?: WorldNetworkMode
  transitionActive?: boolean
  runtimeError?: boolean
}

export type WorldRuntimeFallbackState = {
  motion: WorldMotionMode
  sensory: WorldSensoryMode
  sceneFallback: boolean
  reason: string
}

export type WorldSceneNavigationContract = {
  homeHref: '/'
  atlasHref: '/atlas'
  primaryHref: string
  primaryAction: string
  returnLabel: string
}

export type WorldRuntimeState = {
  scene: SceneDefinition
  previousScene: SceneDefinition | null
  sceneState: WorldSceneState
  transitionState: WorldTransitionState
  motionMode: WorldMotionMode
  sensoryMode: WorldSensoryMode
  aiMode: WorldAiMode
  permissionMode: WorldPermissionMode
  networkMode: WorldNetworkMode
  fallbackState: WorldRuntimeFallbackState
  navigation: WorldSceneNavigationContract
}

export type WorldRuntimeStateSummary = {
  stateCount: number
  transitionStateCount: number
  motionModes: WorldMotionMode[]
  sensoryModes: WorldSensoryMode[]
  permissionModes: WorldPermissionMode[]
  networkModes: WorldNetworkMode[]
  aiModes: WorldAiMode[]
  contracts: string[]
}

const motionModes: WorldMotionMode[] = ['full', 'reduced', 'off']
const sensoryModes: WorldSensoryMode[] = ['full', 'quiet', 'silent']
const permissionModes: WorldPermissionMode[] = ['public', 'authorized', 'denied']
const networkModes: WorldNetworkMode[] = ['local', 'lan', 'offline-like']
const aiModes: WorldAiMode[] = ['disabled', 'ready', 'thinking', 'fallback', 'error']

export function buildWorldRuntimeState(input: WorldRuntimeStateInput): WorldRuntimeState {
  const scene = getSceneForPathname(input.pathname)
  const previousScene = input.previousPathname ? getSceneForPathname(input.previousPathname) : null
  const motionMode = getMotionRuntimeMode(input)
  const sensoryMode = getSensoryRuntimeMode(input)
  const permissionMode = getPermissionRuntimeMode(scene)

  return {
    scene,
    previousScene,
    sceneState: getWorldSceneState(input, scene),
    transitionState: getWorldTransitionState(input, previousScene, scene, motionMode),
    motionMode,
    sensoryMode,
    aiMode: getAiRuntimeMode(input.aiStatus),
    permissionMode,
    networkMode: input.networkMode ?? 'local',
    fallbackState: getWorldRuntimeFallbackState(input, scene, motionMode, sensoryMode),
    navigation: getSceneNavigationContract(scene),
  }
}

export function getWorldRuntimeStateSummary(): WorldRuntimeStateSummary {
  return {
    stateCount: 7,
    transitionStateCount: 6,
    motionModes,
    sensoryModes,
    permissionModes,
    networkModes,
    aiModes,
    contracts: [
      'sceneId 由 Scene Registry 派生',
      '权限事实只来自公开场景契约',
      'full/reduced/off motion 可降级',
      'full/quiet/silent sensory 可静音',
      'Home/Atlas/primary exit 统一存在',
    ],
  }
}

export function getMotionRuntimeMode(input: Pick<WorldRuntimeStateInput, 'reducedMotion' | 'compactMotion' | 'motionOff'>): WorldMotionMode {
  if (input.motionOff) return 'off'
  if (input.reducedMotion) return 'reduced'
  if (input.compactMotion) return 'reduced'
  return 'full'
}

export function getSensoryRuntimeMode(input: Pick<WorldRuntimeStateInput, 'sensoryQuiet' | 'sensorySilent'>): WorldSensoryMode {
  if (input.sensorySilent) return 'silent'
  if (input.sensoryQuiet) return 'quiet'
  return 'full'
}

export function getAiRuntimeMode(aiStatus: WorldRuntimeStateInput['aiStatus']): WorldAiMode {
  if (aiStatus === 'enabled') return 'ready'
  if (aiStatus === 'disabled') return 'disabled'
  return 'fallback'
}

export function getPermissionRuntimeMode(scene: SceneDefinition): WorldPermissionMode {
  if (scene.publicOnly && !scene.requiresOwner) return 'public'
  return 'denied'
}

export function getSceneNavigationContract(scene: SceneDefinition): WorldSceneNavigationContract {
  return {
    homeHref: '/',
    atlasHref: '/atlas',
    primaryHref: scene.href,
    primaryAction: scene.primaryAction,
    returnLabel: scene.id === 'atlas' ? '回到入口' : '回到星图',
  }
}

function getWorldSceneState(input: WorldRuntimeStateInput, scene: SceneDefinition): WorldSceneState {
  if (input.runtimeError) return 'error'
  if (!input.hydrated) return 'booting'
  if (scene.id === 'unknown') return 'degraded'
  if (input.transitionActive) return 'transitioning'
  if (input.visitedCount <= 1 && scene.id === 'gateway') return 'firstVisit'
  if (!input.previousPathname) return 'sceneReady'
  return 'settled'
}

function getWorldTransitionState(
  input: WorldRuntimeStateInput,
  previousScene: SceneDefinition | null,
  scene: SceneDefinition,
  motionMode: WorldMotionMode
): WorldTransitionState {
  if (motionMode !== 'full') return 'reduced'
  if (!previousScene || previousScene.id === scene.id) return 'settled'
  return input.transitionActive ? 'arriving' : 'settled'
}

function getWorldRuntimeFallbackState(
  input: WorldRuntimeStateInput,
  scene: SceneDefinition,
  motionMode: WorldMotionMode,
  sensoryMode: WorldSensoryMode
): WorldRuntimeFallbackState {
  if (input.runtimeError) {
    return { motion: 'off', sensory: 'silent', sceneFallback: true, reason: '运行时异常时只保留静态公开内容。' }
  }

  if (scene.id === 'unknown') {
    return { motion: 'reduced', sensory: sensoryMode, sceneFallback: true, reason: '未知路径使用通用公开场景。' }
  }

  if (motionMode !== 'full' || sensoryMode !== 'full') {
    return { motion: motionMode, sensory: sensoryMode, sceneFallback: false, reason: '根据用户偏好或紧凑视口降低动态与感官强度。' }
  }

  return { motion: motionMode, sensory: sensoryMode, sceneFallback: false, reason: '完整本地运行态。' }
}
