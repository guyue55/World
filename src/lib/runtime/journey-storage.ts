import {
  getJourneyStorageKeys,
  isJourneyMemoryEntry,
  type JourneyMemoryEntry,
} from '@/lib/journey-memory'

const visitedKey = 'guyue-world:visited-count'
const keys = getJourneyStorageKeys()

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function readJourneyMemory(): JourneyMemoryEntry | null {
  const parsed = readJson(keys.primaryKey)
  return isJourneyMemoryEntry(parsed) ? parsed : null
}

export function writeJourneyMemory(entry: JourneyMemoryEntry) {
  try { window.localStorage.setItem(keys.primaryKey, JSON.stringify(entry)) } catch { /* 渐进增强：存储失败不阻断浏览。 */ }
}

export function readJourneyHistory(): JourneyMemoryEntry[] {
  const parsed = readJson(keys.historyKey)
  return Array.isArray(parsed) ? parsed.filter(isJourneyMemoryEntry) : []
}

export function writeJourneyHistory(history: JourneyMemoryEntry[]) {
  try { window.localStorage.setItem(keys.historyKey, JSON.stringify(history)) } catch { /* 渐进增强：存储失败不阻断浏览。 */ }
}

export function clearStoredJourneyMemory() {
  try {
    window.localStorage.removeItem(keys.primaryKey)
    window.localStorage.removeItem(keys.historyKey)
    window.localStorage.setItem(keys.clearedAtKey, new Date().toISOString())
  } catch { /* 清除失败时仍立即收敛当前内存状态。 */ }
}

export function readVisitedCount() {
  try { return Number(window.localStorage.getItem(visitedKey) ?? '0') } catch { return 0 }
}

export function writeVisitedCount(value: number) {
  try { window.localStorage.setItem(visitedKey, String(value)) } catch { /* 严格隐私模式可以禁用存储。 */ }
}
