import journeyMemoryPolicy from '../../data/domains/experience/journey-memory-policy.json'
import { getSceneForPathname } from './scene-runtime'

export type JourneyMemoryPolicy = typeof journeyMemoryPolicy
export type JourneyRouteKind = JourneyMemoryPolicy['routeRules'][number]['kind'] | 'gateway'

export type JourneyMemoryEntry = {
  path: string
  label: string
  sceneId: string
  sceneTitle: string
  recentNodeSlug?: string
  recentPathId?: string
  visitedAt: string
}

export type JourneyMemorySummary = {
  name: string
  version: string
  localOnly: boolean
  publicSceneOnly: boolean
  primaryKey: string
  historyKey: string
  clearedAtKey: string
  maxHistory: number
  allowedFieldCount: number
  forbiddenFieldCount: number
  returningVisitorEnabled: boolean
  clearMemoryEnabled: boolean
  clearMemoryRemovesKeys: string[]
  postClearBehavior: string
  nextActions: string[]
}

export function getJourneyMemoryPolicy(): JourneyMemoryPolicy {
  return journeyMemoryPolicy
}

export function getJourneyStorageKeys() {
  return {
    primaryKey: journeyMemoryPolicy.storage.primaryKey,
    historyKey: journeyMemoryPolicy.storage.historyKey,
    clearedAtKey: journeyMemoryPolicy.storage.clearedAtKey,
  }
}

export function getJourneyMemorySummary(): JourneyMemorySummary {
  return {
    name: journeyMemoryPolicy.name,
    version: journeyMemoryPolicy.version,
    localOnly: journeyMemoryPolicy.scope.localOnly,
    publicSceneOnly: journeyMemoryPolicy.scope.publicSceneOnly,
    primaryKey: journeyMemoryPolicy.storage.primaryKey,
    historyKey: journeyMemoryPolicy.storage.historyKey,
    clearedAtKey: journeyMemoryPolicy.storage.clearedAtKey,
    maxHistory: journeyMemoryPolicy.storage.maxHistory,
    allowedFieldCount: journeyMemoryPolicy.storage.allowedFields.length,
    forbiddenFieldCount: journeyMemoryPolicy.storage.forbiddenFields.length,
    returningVisitorEnabled: journeyMemoryPolicy.returningVisitor.enabled,
    clearMemoryEnabled: journeyMemoryPolicy.clearMemory.enabled,
    clearMemoryRemovesKeys: journeyMemoryPolicy.clearMemory.removesKeys,
    postClearBehavior: journeyMemoryPolicy.clearMemory.postClearBehavior,
    nextActions: journeyMemoryPolicy.nextActions,
  }
}

export function buildJourneyMemoryEntry(pathname: string, visitedAt: string): JourneyMemoryEntry {
  const path = normalizeJourneyPath(pathname)
  const scene = getSceneForPathname(path)
  const rule = journeyMemoryPolicy.routeRules.find((item) => path === item.prefix || path.startsWith(item.prefix))
  const recentNodeSlug = getRecentNodeSlug(path)
  const recentPathId = getRecentPathId(path)

  return {
    path,
    label: rule?.label ?? (path === '/' ? journeyMemoryPolicy.fallback.label : scene.title),
    sceneId: scene.id,
    sceneTitle: scene.title,
    recentNodeSlug,
    recentPathId,
    visitedAt,
  }
}

export function mergeJourneyHistory(history: JourneyMemoryEntry[], entry: JourneyMemoryEntry): JourneyMemoryEntry[] {
  const filtered = history.filter((item) => item.path !== entry.path)
  return [entry, ...filtered].slice(0, journeyMemoryPolicy.storage.maxHistory)
}

export function getReturningJourney(history: JourneyMemoryEntry[], currentPath: string): JourneyMemoryEntry | null {
  return history.find((entry) => entry.path !== normalizeJourneyPath(currentPath)) ?? null
}

export function getClearedJourneyMemoryState(clearedAt: string) {
  return {
    lastJourney: null,
    journeyHistory: [] as JourneyMemoryEntry[],
    clearedAt,
    message: journeyMemoryPolicy.returningVisitor.clearedState,
  }
}

export function isJourneyMemoryEntry(value: unknown): value is JourneyMemoryEntry {
  if (!value || typeof value !== 'object') return false
  const entry = value as Partial<JourneyMemoryEntry>
  return Boolean(entry.path && entry.label && entry.sceneId && entry.sceneTitle && entry.visitedAt)
}

export function normalizeJourneyPath(pathname: string): string {
  const withoutQuery = pathname.split('?')[0]?.split('#')[0] ?? '/'
  if (!withoutQuery || withoutQuery === '/') return '/'
  return withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery
}

function getRecentNodeSlug(pathname: string): string | undefined {
  if (!pathname.startsWith('/node/')) return undefined
  return pathname.split('/')[2] || undefined
}

function getRecentPathId(pathname: string): string | undefined {
  if (!pathname.startsWith('/paths/') || pathname === '/paths') return undefined
  return pathname.split('/')[2] || undefined
}
