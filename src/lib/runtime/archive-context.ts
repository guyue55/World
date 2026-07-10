import type { ArchiveSort } from '@/lib/archive'

export type StoredArchiveContext = {
  query: string
  areaId: string
  type: string
  lifeStage: string
  tag: string
  sort: ArchiveSort
  recordId: string | null
}

const archiveContextKey = 'guyue-world:archive-context'

export function readArchiveContext(fallback: StoredArchiveContext): StoredArchiveContext {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(archiveContextKey) ?? 'null') as Partial<StoredArchiveContext> | null
    if (!parsed || typeof parsed !== 'object') return fallback
    return {
      query: typeof parsed.query === 'string' ? parsed.query : fallback.query,
      areaId: typeof parsed.areaId === 'string' ? parsed.areaId : fallback.areaId,
      type: typeof parsed.type === 'string' ? parsed.type : fallback.type,
      lifeStage: typeof parsed.lifeStage === 'string' ? parsed.lifeStage : fallback.lifeStage,
      tag: typeof parsed.tag === 'string' ? parsed.tag : fallback.tag,
      sort: parsed.sort === 'oldest' || parsed.sort === 'title' || parsed.sort === 'newest' ? parsed.sort : fallback.sort,
      recordId: typeof parsed.recordId === 'string' ? parsed.recordId : null,
    }
  } catch {
    return fallback
  }
}

export function writeArchiveContext(context: StoredArchiveContext) {
  try { window.localStorage.setItem(archiveContextKey, JSON.stringify(context)) } catch { /* 存储失败不阻断公开检索。 */ }
}
