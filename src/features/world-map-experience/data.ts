import type { LegacyWorldRoute, WorldMapConnection, WorldMapNode } from './model'
export const worldMapNodes: WorldMapNode[] = [
  { id:'gateway', title:'世界入口', href:'/', layer:'entry', status:'ready', description:'进入古月浮屿的第一道星门。', signal:'入口', position:{x:50,y:10}},
  { id:'world-map', title:'世界地图', href:'/world-map', layer:'entry', status:'ready', description:'所有核心世界入口的导航中枢。', signal:'导航', position:{x:50,y:28}},
  { id:'constellation', title:'节点星图', href:'/constellation', layer:'content', status:'ready', description:'文章、路径、主题岛屿的内容星系。', signal:'内容', position:{x:22,y:48}},
  { id:'time-river', title:'时间河', href:'/time-river', layer:'memory', status:'ready', description:'版本、事件、阶段的长期时间流。', signal:'时间', position:{x:42,y:58}},
  { id:'memory-graph', title:'记忆图谱', href:'/memory-graph', layer:'memory', status:'guided', description:'公开与脱敏记忆节点的语义图谱。', signal:'记忆', position:{x:66,y:58}},
  { id:'lighthouse', title:'AI 灯塔', href:'/lighthouse', layer:'ai', status:'guided', description:'建议、解释、审计与风险边界工作台。', signal:'AI', position:{x:78,y:42}},
  { id:'theme-system', title:'主题系统', href:'/theme-system', layer:'governance', status:'guided', description:'自然、宇宙、图书馆、工坊的体验切换。', signal:'主题', position:{x:30,y:78}},
  { id:'v6-world-network', title:'多世界网络', href:'/v6-world-network', layer:'governance', status:'ready', description:'公开、项目、家庭、私密世界的网络协议。', signal:'网络', position:{x:58,y:82}},
]
export const worldMapConnections: WorldMapConnection[] = [
  { id:'gateway-map', source:'gateway', target:'world-map', type:'primary', label:'进入地图' },
  { id:'map-constellation', source:'world-map', target:'constellation', type:'primary', label:'内容探索' },
  { id:'map-time', source:'world-map', target:'time-river', type:'primary', label:'时间流' },
  { id:'time-memory', source:'time-river', target:'memory-graph', type:'semantic', label:'记忆沉淀' },
  { id:'lighthouse-memory', source:'lighthouse', target:'memory-graph', type:'privacy-boundary', label:'只读脱敏信号' },
  { id:'network-theme', source:'v6-world-network', target:'theme-system', type:'semantic', label:'体验协议' },
  { id:'map-lighthouse', source:'world-map', target:'lighthouse', type:'primary', label:'AI 建议' },
  { id:'map-network', source:'world-map', target:'v6-world-network', type:'primary', label:'多世界' },
]
export const legacyWorldRoutes: LegacyWorldRoute[] = [
  { from:'/atlas', replacement:'/world-map', reason:'Atlas 旧入口并入世界地图。' },
  { from:'/timeline', replacement:'/time-river', reason:'旧时间线并入时间河。' },
  { from:'/ask', replacement:'/lighthouse', reason:'旧问答入口并入 AI 灯塔。' },
  { from:'/archive', replacement:'/memory-graph', reason:'旧归档馆并入记忆图谱。' },
  { from:'/paths', replacement:'/constellation', reason:'路径导览并入节点星图。' },
]
