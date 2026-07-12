import type { WorldTimeSnapshot } from './clock'

export type WorldSignalSnapshot = {
  time: WorldTimeSnapshot
  content: { recentNodeIds: string[]; updatedNodeIds: string[]; activePathIds: string[] }
  journey: { visitCount: number; returnGap: 'same-session' | 'same-day' | 'recent' | 'long-away'; currentPathId: string | null; recentNodeIds: string[] }
  runtime: { motion: 'full' | 'reduced' | 'off'; sensory: 'full' | 'quiet' | 'silent'; quality: 'auto' | 'low'; visibility: 'visible' | 'hidden' }
  lighthouse: { mode: 'live-provider' | 'low-light' | 'unavailable'; state: 'idle' | 'retrieving' | 'answering' | 'failed' }
}

type SignalInput = { time: WorldTimeSnapshot } & Partial<Omit<WorldSignalSnapshot, 'time'>>

export function buildWorldSignalSnapshot(input: SignalInput): WorldSignalSnapshot {
  return {
    time: input.time,
    content: input.content ?? { recentNodeIds: [], updatedNodeIds: [], activePathIds: [] },
    journey: input.journey ?? { visitCount: 0, returnGap: 'same-session', currentPathId: null, recentNodeIds: [] },
    runtime: input.runtime ?? { motion: 'full', sensory: 'full', quality: 'auto', visibility: 'visible' },
    lighthouse: input.lighthouse ?? { mode: 'low-light', state: 'idle' },
  }
}
