export type WorldMapLayer = 'entry' | 'content' | 'memory' | 'ai' | 'governance'
export type WorldMapStatus = 'ready' | 'guided' | 'legacy' | 'sealed'
export type WorldConnectionType = 'primary' | 'semantic' | 'legacy-replacement' | 'privacy-boundary'
export type WorldMapNode = { id: string; title: string; href: string; layer: WorldMapLayer; status: WorldMapStatus; description: string; signal: string; position: { x: number; y: number } }
export type WorldMapConnection = { id: string; source: string; target: string; type: WorldConnectionType; label: string }
export type LegacyWorldRoute = { from: string; replacement: string; reason: string }
