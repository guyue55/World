import runtimeConfig from '../../data/generated/world-runtime-public.json'

const sensoryAudioRegistry = runtimeConfig.audio

export type SensoryAudioRegistry = typeof sensoryAudioRegistry
export type SensorySoundscape = SensoryAudioRegistry['sceneSoundscapes'][number]
export type SensoryAudioAsset = SensoryAudioRegistry['assetInventory'][number]

export type SensoryAudioSummary = {
  name: string
  version: string
  localOnly: boolean
  defaultSoundEnabled: boolean
  autoPlayAllowed: boolean
  usesExternalAudioAsset: boolean
  sessionArmPolicy: string
  sceneSwitchPolicy: string
  reducedSensoryPolicy: string
  soundscapeCount: number
  assetCount: number
  productionReadyAssetCount: number
  licensedSoundscapeCount: number
  totalAssetBytes: number
  storageKey: string
  volumeStorageKey: string
  defaultVolume: number
  maxVolume: number
  lazyLoadPolicy: string
  sceneLabels: string[]
}

export function getSensoryAudioRegistry(): SensoryAudioRegistry {
  return sensoryAudioRegistry
}

export function getSoundscapeForScene(sceneId: string): SensorySoundscape {
  return sensoryAudioRegistry.sceneSoundscapes.find((item) => item.sceneId === sceneId)
    ?? sensoryAudioRegistry.sceneSoundscapes[0]
}

export function clampSoundscapeVolume(value: number): number {
  if (!Number.isFinite(value)) return sensoryAudioRegistry.runtime.defaultVolume
  return Math.min(Math.max(value, 0), sensoryAudioRegistry.runtime.maxVolume)
}

export function getSensoryAudioSummary(): SensoryAudioSummary {
  const totalAssetBytes = sensoryAudioRegistry.assetInventory.reduce((sum, asset) => sum + asset.bytes, 0)
  const productionReadyAssetCount = sensoryAudioRegistry.assetInventory.filter((asset) => asset.productionReady).length
  const licensedSoundscapeCount = sensoryAudioRegistry.sceneSoundscapes.filter((item) => item.source && item.license).length

  return {
    name: sensoryAudioRegistry.name,
    version: sensoryAudioRegistry.version,
    localOnly: sensoryAudioRegistry.scope.localOnly,
    defaultSoundEnabled: sensoryAudioRegistry.scope.defaultSoundEnabled,
    autoPlayAllowed: sensoryAudioRegistry.runtime.autoPlayAllowed,
    usesExternalAudioAsset: sensoryAudioRegistry.runtime.usesExternalAudioAsset,
    sessionArmPolicy: sensoryAudioRegistry.runtime.sessionArmPolicy,
    sceneSwitchPolicy: sensoryAudioRegistry.runtime.sceneSwitchPolicy,
    reducedSensoryPolicy: sensoryAudioRegistry.runtime.reducedSensoryPolicy,
    soundscapeCount: sensoryAudioRegistry.sceneSoundscapes.length,
    assetCount: sensoryAudioRegistry.assetInventory.length,
    productionReadyAssetCount,
    licensedSoundscapeCount,
    totalAssetBytes,
    storageKey: sensoryAudioRegistry.runtime.storageKey,
    volumeStorageKey: sensoryAudioRegistry.runtime.volumeStorageKey,
    defaultVolume: sensoryAudioRegistry.runtime.defaultVolume,
    maxVolume: sensoryAudioRegistry.runtime.maxVolume,
    lazyLoadPolicy: sensoryAudioRegistry.runtime.lazyLoadPolicy,
    sceneLabels: sensoryAudioRegistry.sceneSoundscapes.map((item) => item.label),
  }
}
