import runtimeProtocol from '../../data/core/world-runtime-protocol.json'

export type RuntimeState = {
  id: string
  description: string
}

export type RuntimeTransition = {
  from: string
  to: string
  requires: string[]
}

export function getRuntimeProtocol() {
  return runtimeProtocol
}

export function getRuntimeStates(): RuntimeState[] {
  return runtimeProtocol.states as RuntimeState[]
}

export function getRuntimeTransitions(): RuntimeTransition[] {
  return runtimeProtocol.transitions as RuntimeTransition[]
}

export function canTransitionRuntimeState(from: string, to: string): boolean {
  return getRuntimeTransitions().some((transition) => transition.from === from && transition.to === to)
}
