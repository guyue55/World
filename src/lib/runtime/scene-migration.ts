import type { SceneContext } from '@/lib/scenes/scene-context'
import type { SceneDestination } from '@/lib/scenes/scene-destination'

export type MigrationState =
  | { kind: 'idle' }
  | { kind: 'leaving'; source: SceneContext; target: SceneDestination }
  | { kind: 'inTransit'; source: SceneContext; target: SceneDestination }
  | { kind: 'arriving'; source: SceneContext; target: SceneDestination }
  | { kind: 'settled'; current: SceneContext }
  | { kind: 'reduced'; current: SceneContext }

export type MigrationEvent =
  | { type: 'START'; source: SceneContext; target: SceneDestination; reduced?: boolean }
  | { type: 'TRANSIT' }
  | { type: 'ARRIVE' }
  | { type: 'SETTLE'; current: SceneContext }
  | { type: 'CANCEL' | 'ROUTE_ERROR' | 'UNMOUNT' }

export type SourceGeometry = { left: number; top: number; width: number; height: number; color: string }
export type MigrationReturnContext = { schemaVersion: 1; path: string; scrollX: number; scrollY: number; focusId: string | null }
export type MigrationSnapshot = { state: MigrationState; geometry: SourceGeometry | null; requestId: number; focusReturnId: string | null; arrivalObjectId: string | null; startedAt: number | null; arrivedAt: number | null }

export const SCENE_MIGRATION_TIMING = {
  navigationDelayMs: 220,
  settleDelayMs: 260,
  reducedNavigationDelayMs: 60,
} as const

export function reduceMigrationState(state: MigrationState, event: MigrationEvent): MigrationState {
  if (event.type === 'START') return event.reduced ? { kind: 'reduced', current: event.source } : { kind: 'leaving', source: event.source, target: event.target }
  if (event.type === 'TRANSIT' && state.kind === 'leaving') return { ...state, kind: 'inTransit' }
  if (event.type === 'ARRIVE' && (state.kind === 'leaving' || state.kind === 'inTransit')) return { ...state, kind: 'arriving' }
  if (event.type === 'SETTLE') return { kind: 'settled', current: event.current }
  if (event.type === 'CANCEL' || event.type === 'ROUTE_ERROR' || event.type === 'UNMOUNT') return { kind: 'idle' }
  return state
}

let snapshot: MigrationSnapshot = { state: { kind: 'idle' }, geometry: null, requestId: 0, focusReturnId: null, arrivalObjectId: null, startedAt: null, arrivedAt: null }
const serverSnapshot: MigrationSnapshot = { state: { kind: 'idle' }, geometry: null, requestId: 0, focusReturnId: null, arrivalObjectId: null, startedAt: null, arrivedAt: null }
const listeners = new Set<() => void>()
let transitTimer: number | null = null
let settleTimer: number | null = null

function emit() { listeners.forEach((listener) => listener()) }
function update(state: MigrationState, patch: Partial<Omit<MigrationSnapshot, 'state'>> = {}) { snapshot = { ...snapshot, ...patch, state }; emit() }
function clearTimers() { if (transitTimer !== null) window.clearTimeout(transitTimer); if (settleTimer !== null) window.clearTimeout(settleTimer); transitTimer = null; settleTimer = null }

export function getMigrationSnapshot() { return snapshot }
export function getMigrationServerSnapshot() { return serverSnapshot }
export function subscribeMigration(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener) }

export function buildArrivalSceneContext(current: SceneContext, state: MigrationState): SceneContext {
  if (state.kind !== 'leaving' && state.kind !== 'inTransit' && state.kind !== 'arriving') return current
  return { ...current, focusedObjectId: state.target.objectId ?? current.focusedObjectId }
}

export function isMigrationReturnContextForPath(value: unknown, pathname: string): value is MigrationReturnContext {
  if (!value || typeof value !== 'object') return false
  const context = value as Partial<MigrationReturnContext>
  return context.schemaVersion === 1
    && context.path === pathname
    && Number.isFinite(context.scrollX) && Number(context.scrollX) >= 0
    && Number.isFinite(context.scrollY) && Number(context.scrollY) >= 0
    && (context.focusId === null || typeof context.focusId === 'string')
}

export function beginSceneMigration({ source, target, element, focusReturnId, reduced }: { source: SceneContext; target: SceneDestination; element: HTMLElement; focusReturnId?: string; reduced: boolean }) {
  clearTimers()
  const rect = element.getBoundingClientRect()
  const color = getComputedStyle(element).borderColor || getComputedStyle(element).color || '#d8b875'
  const requestId = snapshot.requestId + 1
  const startedAt = Date.now()
  const resolvedFocusId = focusReturnId ?? element.id ?? null
  const returnContext: MigrationReturnContext = { schemaVersion: 1, path: window.location.pathname, scrollX: Math.max(0, window.scrollX), scrollY: Math.max(0, window.scrollY), focusId: resolvedFocusId }
  window.history.replaceState({ ...(window.history.state ?? {}), __worldosMigrationReturn: returnContext }, '', window.location.href)
  update(reduceMigrationState(snapshot.state, { type: 'START', source, target, reduced }), { requestId, focusReturnId: resolvedFocusId, arrivalObjectId: target.objectId ?? null, geometry: { left: rect.left, top: rect.top, width: rect.width, height: rect.height, color }, startedAt, arrivedAt: reduced ? startedAt : null })
  if (!reduced) transitTimer = window.setTimeout(() => { if (snapshot.requestId === requestId) update(reduceMigrationState(snapshot.state, { type: 'TRANSIT' })) }, 45)
  return requestId
}

export function markSceneMigrationArriving() {
  if (snapshot.state.kind === 'leaving' || snapshot.state.kind === 'inTransit') update(reduceMigrationState(snapshot.state, { type: 'ARRIVE' }), { arrivedAt: Date.now() })
}

export function settleSceneMigration(current: SceneContext, reduced: boolean) {
  clearTimers()
  const arrival = buildArrivalSceneContext(current, snapshot.state)
  if (reduced) update({ kind: 'reduced', current: arrival })
  else settleTimer = window.setTimeout(() => update(reduceMigrationState(snapshot.state, { type: 'SETTLE', current: arrival })), SCENE_MIGRATION_TIMING.settleDelayMs)
}

export function cancelSceneMigration(reason: 'cancel' | 'route-error' | 'unmount' = 'cancel') {
  clearTimers()
  const type = reason === 'route-error' ? 'ROUTE_ERROR' : reason === 'unmount' ? 'UNMOUNT' : 'CANCEL'
  update(reduceMigrationState(snapshot.state, { type }))
}

function focusElement(element: HTMLElement | null) {
  if (!element) return false
  if (!element.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(element.tagName)) element.tabIndex = -1
  element.focus({ preventScroll: true })
  return true
}

export function restoreSceneMigrationArrivalFocus(sceneId: string) {
  const escape = (value: string) => globalThis.CSS?.escape ? globalThis.CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, '\\$&')
  const object = snapshot.arrivalObjectId ? document.querySelector<HTMLElement>(`[data-arrival-object="${escape(snapshot.arrivalObjectId)}"]`) : null
  return focusElement(object ?? document.querySelector<HTMLElement>(`[data-arrival-scene="${escape(sceneId)}"]`))
}

export function restoreSceneMigrationReturnContext(pathname: string) {
  const value = window.history.state?.__worldosMigrationReturn
  if (!isMigrationReturnContextForPath(value, pathname)) return false
  window.scrollTo({ left: value.scrollX, top: value.scrollY, behavior: 'instant' })
  return value.focusId ? focusElement(document.getElementById(value.focusId)) : true
}
