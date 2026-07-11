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
export type MigrationSnapshot = { state: MigrationState; geometry: SourceGeometry | null; requestId: number; focusReturnId: string | null; startedAt: number | null; arrivedAt: number | null }

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

let snapshot: MigrationSnapshot = { state: { kind: 'idle' }, geometry: null, requestId: 0, focusReturnId: null, startedAt: null, arrivedAt: null }
const serverSnapshot: MigrationSnapshot = { state: { kind: 'idle' }, geometry: null, requestId: 0, focusReturnId: null, startedAt: null, arrivedAt: null }
const listeners = new Set<() => void>()
let transitTimer: number | null = null
let settleTimer: number | null = null

function emit() { listeners.forEach((listener) => listener()) }
function update(state: MigrationState, patch: Partial<Omit<MigrationSnapshot, 'state'>> = {}) { snapshot = { ...snapshot, ...patch, state }; emit() }
function clearTimers() { if (transitTimer !== null) window.clearTimeout(transitTimer); if (settleTimer !== null) window.clearTimeout(settleTimer); transitTimer = null; settleTimer = null }

export function getMigrationSnapshot() { return snapshot }
export function getMigrationServerSnapshot() { return serverSnapshot }
export function subscribeMigration(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener) }

export function beginSceneMigration({ source, target, element, focusReturnId, reduced }: { source: SceneContext; target: SceneDestination; element: HTMLElement; focusReturnId?: string; reduced: boolean }) {
  clearTimers()
  const rect = element.getBoundingClientRect()
  const color = getComputedStyle(element).borderColor || getComputedStyle(element).color || '#d8b875'
  const requestId = snapshot.requestId + 1
  const startedAt = Date.now()
  update(reduceMigrationState(snapshot.state, { type: 'START', source, target, reduced }), { requestId, focusReturnId: focusReturnId ?? element.id ?? null, geometry: { left: rect.left, top: rect.top, width: rect.width, height: rect.height, color }, startedAt, arrivedAt: reduced ? startedAt : null })
  if (!reduced) transitTimer = window.setTimeout(() => { if (snapshot.requestId === requestId) update(reduceMigrationState(snapshot.state, { type: 'TRANSIT' })) }, 45)
  return requestId
}

export function markSceneMigrationArriving() {
  if (snapshot.state.kind === 'leaving' || snapshot.state.kind === 'inTransit') update(reduceMigrationState(snapshot.state, { type: 'ARRIVE' }), { arrivedAt: Date.now() })
}

export function settleSceneMigration(current: SceneContext, reduced: boolean) {
  clearTimers()
  if (reduced) update({ kind: 'reduced', current })
  else settleTimer = window.setTimeout(() => update(reduceMigrationState(snapshot.state, { type: 'SETTLE', current })), SCENE_MIGRATION_TIMING.settleDelayMs)
}

export function cancelSceneMigration(reason: 'cancel' | 'route-error' | 'unmount' = 'cancel') {
  clearTimers()
  const type = reason === 'route-error' ? 'ROUTE_ERROR' : reason === 'unmount' ? 'UNMOUNT' : 'CANCEL'
  update(reduceMigrationState(snapshot.state, { type }))
}

export function restoreSceneMigrationFocus() {
  if (!snapshot.focusReturnId) return false
  const element = document.getElementById(snapshot.focusReturnId)
  if (!element) return false
  element.focus({ preventScroll: true })
  return true
}
