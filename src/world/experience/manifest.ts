import type { SceneId, WorldExperienceManifestEntry } from './types'

const allModes: WorldExperienceManifestEntry['requiredModes'] = ['desktop', 'mobile', 'reduced', 'static']
const normalize = (pathname: string) => pathname.split('?')[0]?.split('#')[0]?.replace(/\/$/, '') || '/'
const exact = (route: string) => (pathname: string) => normalize(pathname) === route
const nested = (route: string) => (pathname: string) => normalize(pathname) === route || normalize(pathname).startsWith(`${route}/`)

export const worldExperienceManifest = {
  gateway: { id: 'gateway', matchRoute: exact('/'), buildModelId: 'buildGatewayModel', sceneModuleId: 'gateway', staticFallbackId: 'gateway-static', acceptedSignals: ['time', 'content', 'journey', 'runtime'], activityLevel: 'high', soundscapeId: 'gateway', arrivalObjectIds: ['world-gate', 'atlas-route'], requiredModes: allModes },
  atlas: { id: 'atlas', matchRoute: exact('/atlas'), buildModelId: 'buildAtlasViewModel', sceneModuleId: 'atlas', staticFallbackId: 'atlas-static', acceptedSignals: ['time', 'content', 'journey', 'runtime'], activityLevel: 'high', soundscapeId: 'atlas', arrivalObjectIds: ['atlas-center', 'area-origin'], requiredModes: allModes },
  timeline: { id: 'timeline', matchRoute: exact('/timeline'), buildModelId: 'buildTimelineViewModel', sceneModuleId: 'timeline', staticFallbackId: 'timeline-static', acceptedSignals: ['time', 'content', 'runtime'], activityLevel: 'medium', soundscapeId: 'timeline', arrivalObjectIds: ['timeline-latest'], requiredModes: allModes },
  archive: { id: 'archive', matchRoute: exact('/archive'), buildModelId: 'buildArchiveViewModel', sceneModuleId: 'archive', staticFallbackId: 'archive-static', acceptedSignals: ['time', 'content', 'runtime'], activityLevel: 'low', soundscapeId: 'archive', arrivalObjectIds: ['archive-desk'], requiredModes: allModes },
  paths: { id: 'paths', matchRoute: nested('/paths'), buildModelId: 'buildPathsOverviewModel', sceneModuleId: 'paths', staticFallbackId: 'paths-static', acceptedSignals: ['time', 'content', 'journey', 'runtime'], activityLevel: 'medium', soundscapeId: 'paths', arrivalObjectIds: ['path-square'], requiredModes: allModes },
  node: { id: 'node', matchRoute: nested('/node'), buildModelId: 'buildNodePlaceModel', sceneModuleId: 'node', staticFallbackId: 'node-static', acceptedSignals: ['time', 'content', 'journey', 'runtime'], activityLevel: 'low', soundscapeId: 'node', arrivalObjectIds: ['reading-desk'], requiredModes: allModes },
  lighthouse: { id: 'lighthouse', matchRoute: exact('/ask'), buildModelId: 'buildLighthouseModel', sceneModuleId: 'lighthouse', staticFallbackId: 'lighthouse-static', acceptedSignals: ['time', 'journey', 'runtime', 'lighthouse'], activityLevel: 'medium', soundscapeId: 'lighthouse', arrivalObjectIds: ['lighthouse-door', 'question-console'], requiredModes: allModes },
} as const satisfies Record<SceneId, WorldExperienceManifestEntry>

export function getExperienceForPathname(pathname: string): WorldExperienceManifestEntry {
  return Object.values(worldExperienceManifest).find((entry) => entry.matchRoute(pathname)) ?? worldExperienceManifest.gateway
}
