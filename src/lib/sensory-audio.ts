import sensoryAudioRegistry from '../../data/domains/experience/sensory-audio-registry.json'

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
  soundscapeCount: number
  assetCount: number
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
  return {
    name: sensoryAudioRegistry.name,
    version: sensoryAudioRegistry.version,
    localOnly: sensoryAudioRegistry.scope.localOnly,
    defaultSoundEnabled: sensoryAudioRegistry.scope.defaultSoundEnabled,
    autoPlayAllowed: sensoryAudioRegistry.runtime.autoPlayAllowed,
    usesExternalAudioAsset: sensoryAudioRegistry.runtime.usesExternalAudioAsset,
    soundscapeCount: sensoryAudioRegistry.sceneSoundscapes.length,
    assetCount: sensoryAudioRegistry.assetInventory.length,
    storageKey: sensoryAudioRegistry.runtime.storageKey,
    volumeStorageKey: sensoryAudioRegistry.runtime.volumeStorageKey,
    defaultVolume: sensoryAudioRegistry.runtime.defaultVolume,
    maxVolume: sensoryAudioRegistry.runtime.maxVolume,
    lazyLoadPolicy: sensoryAudioRegistry.runtime.lazyLoadPolicy,
    sceneLabels: sensoryAudioRegistry.sceneSoundscapes.map((item) => item.label),
  }
}
