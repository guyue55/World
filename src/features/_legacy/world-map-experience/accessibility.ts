import { legacyWorldRoutes, worldMapNodes } from './data'

export const worldMapAccessibility = {
  keyboard: 'All world nodes are links.',
  mobileFallback: 'Mobile uses vertical compass list.',
  legacyRoutes: legacyWorldRoutes,
  requiredAriaSignals: ['aria-label'],
} as const

export function getWorldMapA11ySummary() {
  return {
    nodeCount: worldMapNodes.length,
    keyboardReachable: true,
    mobileFallback: true,
    legacyRouteCount: legacyWorldRoutes.length,
  }
}
