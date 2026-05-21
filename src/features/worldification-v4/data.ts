import type { WorldJourney, WorldMetric, WorldZone } from './model'

export const worldZones: WorldZone[] = [
  { id: 'world-gateway', title: '世界入口', kind: 'gateway', layer: 'surface', description: '进入古月浮屿的第一道门，不再只是博客首页。', route: '/', visualCue: '云层、星门、浮岛入口', priority: 10 },
  { id: 'atlas-map', title: 'Atlas 世界地图', kind: 'atlas', layer: 'surface', description: '以星图和浮岛组织全部世界区域。', route: '/world', visualCue: '星轨、岛屿、地图环', priority: 9 },
  { id: 'content-node-field', title: '内容节点场', kind: 'node-field', layer: 'creation', description: '文章、项目、照片和规则转成可探索节点。', route: '/content-studio', visualCue: '节点、光点、内容星座', priority: 8 },
  { id: 'journey-pathway', title: '路径旅程', kind: 'pathway', layer: 'surface', description: '把阅读路径从链接列表重构为旅程。', route: '/atlas', visualCue: '航线、路径、桥', priority: 7 },
  { id: 'memory-river', title: '时间河', kind: 'river', layer: 'memory', description: '时间线转为空间化记忆河流。', route: '/time-river', visualCue: '河流、年轮、漂浮记忆', priority: 6 },
  { id: 'exhibition-garden', title: '主题展览花园', kind: 'garden', layer: 'creation', description: '分类转为展览馆、花园和星域。', route: '/theme-system', visualCue: '花园、展柜、季节', priority: 5 },
  { id: 'ai-lighthouse', title: 'AI 灯塔观测站', kind: 'observatory', layer: 'ai-boundary', description: 'AI 是世界中的灯塔，不是普通工具页。', route: '/lighthouse', visualCue: '灯塔、观测环、审计光束', priority: 4 },
  { id: 'world-state-orbit', title: '世界状态轨道', kind: 'orbit', layer: 'private-redacted', description: '以轨道呈现 pending、边界和下一版本入口。', route: '/production-readiness', visualCue: '状态行星、证据轨道', priority: 3 },
]

export const worldJourneys: WorldJourney[] = [
  { id: 'first-visitor', title: '第一次进入古月浮屿', description: '从世界入口出发，经过 Atlas、内容节点和 AI 灯塔。', stops: ['world-gateway', 'atlas-map', 'content-node-field', 'ai-lighthouse'], mood: 'cosmic' },
  { id: 'memory-walk', title: '记忆漫游', description: '沿时间河进入记忆层，再回到主题展览。', stops: ['world-gateway', 'memory-river', 'exhibition-garden'], mood: 'calm' },
  { id: 'creator-route', title: '创作者路径', description: '从内容节点场进入素材、展览和发布准备。', stops: ['content-node-field', 'exhibition-garden', 'world-state-orbit'], mood: 'garden' },
]

export const worldMetrics: WorldMetric[] = [
  { id: 'worldification-ready', title: '世界化壳层', value: 'ready', status: 'ready' },
  { id: 'real-content', title: '真实内容填充', value: 'V5 pending', status: 'pending-real-content' },
  { id: 'preview-deploy', title: '真实预览部署', value: 'pending', status: 'pending-real-run' },
  { id: 'privacy-signoff', title: '人工隐私签收', value: 'pending', status: 'pending-real-run' },
]

export function getWorldZoneById(id: string) {
  return worldZones.find((zone) => zone.id === id)
}

export function getWorldZonesByLayer(layer: WorldZone['layer']) {
  return worldZones.filter((zone) => zone.layer === layer)
}

export function getJourneyStops(journey: WorldJourney) {
  return journey.stops.map(getWorldZoneById).filter((zone): zone is WorldZone => Boolean(zone))
}
