import { clampSoundscapeVolume } from '@/lib/sensory-audio'

export type StoredSoundMode = 'muted' | 'enabled'

export function readSoundMode(key: string): StoredSoundMode {
  try { return window.localStorage.getItem(key) === 'enabled' ? 'enabled' : 'muted' } catch { return 'muted' }
}

export function writeSoundMode(key: string, value: StoredSoundMode) {
  try { window.localStorage.setItem(key, value) } catch { /* 默认静音仍成立。 */ }
}

export function readSoundVolume(key: string, fallback: number) {
  try {
    const raw = window.localStorage.getItem(key)
    return clampSoundscapeVolume(raw ? Number(raw) : fallback)
  } catch {
    return fallback
  }
}

export function writeSoundVolume(key: string, value: number) {
  try { window.localStorage.setItem(key, String(clampSoundscapeVolume(value))) } catch { /* 音量存储失败不影响静音边界。 */ }
}
