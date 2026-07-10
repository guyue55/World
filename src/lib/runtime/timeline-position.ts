const timelineAnchorKey = 'guyue-world:timeline-anchor'

export function readTimelineAnchor(allowedIds: string[], fallback: string) {
  try {
    const stored = window.localStorage.getItem(timelineAnchorKey)
    return stored && allowedIds.includes(stored) ? stored : fallback
  } catch {
    return fallback
  }
}

export function writeTimelineAnchor(anchorId: string) {
  try { window.localStorage.setItem(timelineAnchorKey, anchorId) } catch { /* 存储失败不阻断时间河浏览。 */ }
}
