import type { Area, LifeStage, Node, Path, Relation, Visibility, WorldEvent, WorldState } from './types'
import { getAllAreas } from './areas'
import { getAllNodes, getPublicNodes } from './nodes'
import { getAllPaths } from './paths'
import { getAllRelations } from './relations'
import { getAllWorldEvents, getWorldState } from './world-events'
import { WORLD_KERNEL_CANONICAL_SOURCES, getWorldKernelConsolidationStatus } from './world-kernel-registry'

export type WorldDepth = 'surface' | 'middle' | 'deep' | 'vault'

export type WorldLayer =
  | 'space'
  | 'content'
  | 'relation'
  | 'time'
  | 'projection'
  | 'governance'
  | 'interoperability'

export type WorldCore = {
  state: WorldState
  areas: Area[]
  nodes: Node[]
  publicNodes: Node[]
  relations: Relation[]
  paths: Path[]
  events: WorldEvent[]
  layers: WorldLayer[]
}

export const WORLD_LAYERS: Array<{
  id: WorldLayer
  title: string
  description: string
}> = [
  {
    id: 'space',
    title: '空间层',
    description: 'Area、Atlas、Path 与当前位置让内容被安放在世界中。',
  },
  {
    id: 'content',
    title: '内容层',
    description: 'Node 是世界的基本生命单位，不只是文章。',
  },
  {
    id: 'relation',
    title: '关系层',
    description: 'Relation、Backlinks 与 ForwardLinks 让节点之间出现星线。',
  },
  {
    id: 'time',
    title: '时间层',
    description: 'WorldEvent 与 LifeStage 让世界拥有历史和生长状态。',
  },
  {
    id: 'projection',
    title: '投影层',
    description: '同一节点可以投影到首页、地图、时间河、档案馆、路径和详情页。',
  },
  {
    id: 'governance',
    title: '治理层',
    description: 'Permission、Rule、AI 守则和构建检查让世界浪漫但不失控。',
  },
  {
    id: 'interoperability',
    title: '互操作层',
    description: 'Markdown、JSON、Git、manifest 和静态构建让世界可导出、可迁移、可重建。',
  },
]

export const VISIBILITY_DEPTH: Record<Visibility, WorldDepth> = {
  public: 'surface',
  unlisted: 'surface',
  semiPublic: 'surface',
  private: 'deep',
  family: 'deep',
  partner: 'deep',
  vault: 'vault',
  sealed: 'vault',
  silent: 'vault',
}

export const LIFE_STAGE_DESCRIPTIONS: Record<LifeStage, string> = {
  seed: '刚被安放的种子，需要后续浇水。',
  sprout: '已经开始发芽，有了初步方向。',
  growing: '仍在持续生长，可能继续扩写或重构。',
  bloom: '已经可以被旅人阅读和引用。',
  fruit: '沉淀为成熟结果，可以作为路径核心。',
  archive: '已进入档案馆，不再活跃但可以回望。',
  relic: '旧时代留下的遗迹，保留历史价值。',
  dormant: '处于低光沉睡，等待未来复活。',
  silent: '被允许保持沉默，不主动展示。',
}

export function getWorldCore(): WorldCore {
  return {
    state: getWorldState(),
    areas: getAllAreas(),
    nodes: getAllNodes(),
    publicNodes: getPublicNodes(),
    relations: getAllRelations(),
    paths: getAllPaths(),
    events: getAllWorldEvents(),
    layers: WORLD_LAYERS.map((layer) => layer.id),
  }
}

export function getNodeDepth(node: Node): WorldDepth {
  return VISIBILITY_DEPTH[node.visibility]
}

export function getAreaDepth(area: Area): WorldDepth {
  return VISIBILITY_DEPTH[area.defaultVisibility]
}

export function summarizeWorldCore(core = getWorldCore()) {
  return {
    areaCount: core.areas.length,
    nodeCount: core.nodes.length,
    publicNodeCount: core.publicNodes.length,
    relationCount: core.relations.length,
    pathCount: core.paths.length,
    eventCount: core.events.length,
    layerCount: core.layers.length,
    aiStatus: core.state.aiStatus,
    mode: core.state.mode,
  }
}


export function getWorldCoreSources() {
  return WORLD_KERNEL_CANONICAL_SOURCES
}

export function getWorldCoreConsolidationStatus() {
  return getWorldKernelConsolidationStatus()
}
