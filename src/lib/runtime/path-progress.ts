export type StoredPathProgress = {
  currentIndex: number
  completed: boolean
  updatedAt: string
}

const progressKey = 'guyue-world:path-progress'

function readAll(): Record<string, StoredPathProgress> {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(progressKey) ?? '{}') as Record<string, StoredPathProgress>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function readPathProgress(pathId: string, stepCount: number): StoredPathProgress {
  const stored = readAll()[pathId]
  if (!stored) return { currentIndex: 0, completed: false, updatedAt: '' }
  const currentIndex = Math.max(0, Math.min(stepCount, Number(stored.currentIndex) || 0))
  return { currentIndex, completed: Boolean(stored.completed || currentIndex >= stepCount), updatedAt: stored.updatedAt || '' }
}

export function writePathProgress(pathId: string, progress: StoredPathProgress) {
  try {
    window.localStorage.setItem(progressKey, JSON.stringify({ ...readAll(), [pathId]: progress }))
  } catch { /* 本地存储失败不阻断公开路线。 */ }
}

export function completePathStep(pathId: string, stepIndex: number, stepCount: number) {
  const current = readPathProgress(pathId, stepCount)
  const currentIndex = Math.max(current.currentIndex, Math.min(stepCount, stepIndex + 1))
  const next = { currentIndex, completed: currentIndex >= stepCount, updatedAt: new Date().toISOString() }
  writePathProgress(pathId, next)
  return next
}

export function resetPathProgress(pathId: string) {
  try {
    const all = readAll()
    delete all[pathId]
    window.localStorage.setItem(progressKey, JSON.stringify(all))
  } catch { /* 清除失败时由当前页面状态继续提供重置反馈。 */ }
}
