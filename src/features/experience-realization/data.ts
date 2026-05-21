import type { ExperienceNode, ExperienceThemeMode } from './types'

export const experienceNodes: ExperienceNode[] = [
  {
    id: 'gateway',
    title: '世界入口',
    eyebrow: 'WORLD GATEWAY',
    description: '从普通博客首页升级为进入古月浮屿的第一道世界门。',
    href: '/',
    kind: 'world-gateway',
    signal: '进入世界',
    status: 'ready',
  },
  {
    id: 'cosmic-map',
    title: '宇宙导航',
    eyebrow: 'COSMIC MAP',
    description: '用星图式导航连接 Atlas、时间河、AI 灯塔、V6 多世界网络。',
    href: '/world-map',
    kind: 'cosmic-map',
    signal: '查看星图',
    status: 'ready',
  },
  {
    id: 'constellation',
    title: '节点星图',
    eyebrow: 'NODE CONSTELLATION',
    description: '把内容节点从列表升级为可阅读、可连接的星群入口。',
    href: '/constellation',
    kind: 'node-constellation',
    signal: '浏览节点',
    status: 'ready',
  },
  {
    id: 'time-river',
    title: '时间河',
    eyebrow: 'TIME RIVER',
    description: '让事件、阶段、版本和记忆沿时间流动，而不是静态堆叠。',
    href: '/time-river',
    kind: 'time-river',
    signal: '进入时间河',
    status: 'ready',
  },
  {
    id: 'ai-lighthouse',
    title: 'AI 灯塔',
    eyebrow: 'AI LIGHTHOUSE',
    description: 'AI 负责照亮、解释、建议，所有高风险动作仍需人工确认。',
    href: '/lighthouse',
    kind: 'ai-lighthouse',
    signal: '查看建议流',
    status: 'guided',
  },
  {
    id: 'v6-world-network',
    title: '多世界网络',
    eyebrow: 'V6 WORLD NETWORK',
    description: '展示世界连接、跨世界事件、开放协议和 V7 入口门禁。',
    href: '/v6-world-network',
    kind: 'world-network',
    signal: '连接世界',
    status: 'ready',
  },
  {
    id: 'memory-graph',
    title: '记忆图谱',
    eyebrow: 'MEMORY GRAPH',
    description: '把文章、事件、关系、时间与权重组织成长期记忆结构。',
    href: '/memory-graph',
    kind: 'memory-graph',
    signal: '查看图谱',
    status: 'ready',
  },
  {
    id: 'theme-system',
    title: '主题系统',
    eyebrow: 'THEME SYSTEM',
    description: '主题不只是换色，而是布局、组件、动效、语义整体切换。',
    href: '/theme-system',
    kind: 'theme-system',
    signal: '切换主题',
    status: 'guided',
  },
]

export const constellationNodes = [
  { title: '世界宣言', href: '/node/world-manifesto', signal: '世界观原点', group: 'world' },
  { title: 'AI 灯塔边界', href: '/node/ai-lighthouse-boundary', signal: 'AI 不越权', group: 'ai' },
  { title: '个人数字宇宙定义', href: '/node/personal-digital-universe-definition', signal: '项目核心定义', group: 'world' },
  { title: 'Atlas 空间', href: '/atlas', signal: '世界地图入口', group: 'map' },
  { title: '路径导览', href: '/paths', signal: '阅读路径', group: 'path' },
  { title: '归档馆', href: '/archive', signal: '长期内容沉淀', group: 'archive' },
]

export const timeRiverEvents = [
  { version: 'V1', title: '建世界', description: '世界观、信息架构、内容协议与基础页面。' },
  { version: 'V2', title: '建服务', description: 'API、权限、审计、私密档案服务与多端协作骨架。' },
  { version: 'V3', title: '建智能', description: 'AI 工作台、内容生长、年度世界册与宇宙地图。' },
  { version: 'V4', title: '建协作与生态', description: '多人协作、插件生态、发布网络与平台治理。' },
  { version: 'V5', title: '建联邦与运行态', description: '多世界连接、多 Agent 编排、观测与迁移。' },
  { version: 'V6', title: '建个人文明 OS', description: '多世界网络、Agent Society、记忆图谱和开放协议。' },
]

export const lighthouseSuggestions = [
  { title: '内容策展', description: '把近期内容整理为主题展览。', status: '需要人工确认', risk: 'medium' },
  { title: '路径推荐', description: '为新访客生成 3 条阅读路径。', status: '可预览', risk: 'low' },
  { title: '风险提示', description: '检查公开内容是否误含私密信号。', status: '必须审计', risk: 'high' },
  { title: '世界维护', description: '提示过期节点和缺少摘要的内容。', status: '可执行建议', risk: 'medium' },
] as const

export const memoryGraphNodes = [
  { title: '世界观', visibility: '公开', weight: 8 },
  { title: 'AI 边界', visibility: '公开', weight: 9 },
  { title: '家庭档案', visibility: '私密', weight: 10 },
  { title: 'V6 多世界网络', visibility: '公开', weight: 7 },
  { title: '年度世界册', visibility: '家庭', weight: 6 },
]

export const worldNetworkNodes = [
  { name: '公开世界', kind: 'public', description: '文章、展览、路径、时间河。' },
  { name: '项目世界', kind: 'project', description: '工程、版本、证据、交接。' },
  { name: '家庭世界', kind: 'family', description: '家庭、孩子、年度世界册。' },
  { name: '私密世界', kind: 'private', description: 'vault、sealed、silent，只允许脱敏信号。' },
]

export const experienceThemeModes: Array<{
  id: ExperienceThemeMode
  title: string
  description: string
  layout: string
}> = [
  {
    id: 'nature',
    title: '自然浮屿',
    description: '以森林、花园、云雾、季节变化表达生活与内容生长。',
    layout: 'soft island cards + breathing whitespace',
  },
  {
    id: 'cosmos',
    title: '星海宇宙',
    description: '以星图、轨道、星门、深空层次表达世界网络。',
    layout: 'constellation map + radial navigation',
  },
  {
    id: 'library',
    title: '空中图书馆',
    description: '以知识殿堂、书页、档案、索引表达长期沉淀。',
    layout: 'archive shelves + semantic reading paths',
  },
  {
    id: 'atelier',
    title: '云上工坊',
    description: '以创作台、工具、手稿、AI 建议流表达工作台属性。',
    layout: 'workspace panels + review queue',
  },
]
