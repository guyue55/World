// 用途：主页 + 状态页动态世界 surface 构建器（从 public-world-surfaces 拆出）。
// 与 public-world-surfaces.ts 保持相同的公开层语义：只读取公开可见的区域、节点、路径、事件。
import type { Area, Node, Path, Visibility, WorldEvent } from '../types'
import { isPublicVisible } from '../visibility'
import type { DynamicWorldStatusSurface, HomeDynamicWorldSurface } from '../public-world-surfaces'

function isPublicArea(area: Area) {
  return isPublicVisible(area.defaultVisibility)
}

function isEventPublic(visibility?: Visibility) {
  return !visibility || isPublicVisible(visibility)
}

export function buildHomeDynamicWorldSurface({
  areas,
  nodes,
  paths,
  events,
}: {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
  events: WorldEvent[]
}): HomeDynamicWorldSurface {
  const publicAreaCount = areas.filter((area) => area.level === 1 && isPublicArea(area)).length
  const publicNodeCount = nodes.filter((node) => isPublicVisible(node.visibility)).length
  const firstPath = paths.find((path) => path.id === 'eight-minute-world')
    ?? paths.find((path) => path.audience === 'first-time')
    ?? paths[0]
  const pathHref = firstPath ? `/paths/${firstPath.id}` : '/atlas'

  return {
    eyebrow: '公开世界入口',
    title: '先选一个入口，再慢慢进入宇宙',
    description: '不用一次理解所有层级。第一次来，先按目的选择入口：走短路径、看全貌、查档案，或者请灯塔指路。',
    entryTitle: '先选一个入口',
    entryDescription: '如果你是第一次来，从这里开始就够了。每个入口都能返回地图，不会把你带进私密层或内部阶段页。',
    primaryHref: pathHref,
    entryPoints: [
      {
        id: 'path',
        href: pathHref,
        label: '我第一次来',
        title: firstPath?.title ?? '8 分钟路径',
        description: firstPath?.description ?? '不需要理解全部宇宙，先走一条短路径。',
        note: firstPath ? `约 ${firstPath.estimatedMinutes ?? 8} 分钟 · 推荐起点` : '推荐先走',
        tone: 'primary',
      },
      {
        id: 'atlas',
        href: '/atlas',
        label: '我想看全貌',
        title: '展开世界地图',
        description: '从区域、节点和连接关系看清这个世界的空间结构。',
        note: `${publicAreaCount} 个公开主区域`,
        tone: 'quiet',
      },
      {
        id: 'archive',
        href: '/archive',
        label: '我想直接找内容',
        title: '进入公开档案馆',
        description: '按标题、标签和摘要检索已经公开的节点。',
        note: `${publicNodeCount} 个公开节点`,
        tone: 'quiet',
      },
      {
        id: 'ask',
        href: '/ask',
        label: '我不知道看什么',
        title: '询问世界灯塔',
        description: '用自然语言说明你的兴趣，让灯塔给你推荐公开路径。',
        note: '只读公开层 · 不读取私密内容',
        tone: 'quiet',
      },
    ],
    routes: [
      {
        id: 'home',
        href: '/',
        shortLabel: '入口',
        title: '世界入口',
        description: '回到公开前厅，重新选择方向。',
        caption: '适合迷路时返回',
        intent: '回到起点',
      },
      {
        id: 'atlas',
        href: '/atlas',
        shortLabel: '地图',
        title: '世界地图',
        description: '从区域和公开节点看全貌，再进入具体星域。',
        caption: `${publicAreaCount} 个公开主区域`,
        intent: '看空间结构',
      },
      {
        id: 'timeline',
        href: '/timeline',
        shortLabel: '时间',
        title: '时间流',
        description: '看世界最近如何生长，哪些事件推动了节点和区域。',
        caption: `${events.filter((event) => isEventPublic(event.visibility)).length} 条近期事件`,
        intent: '看变化',
      },
      {
        id: 'path',
        href: pathHref,
        shortLabel: '路径',
        title: firstPath?.title ?? '8 分钟路径',
        description: firstPath?.description ?? '第一次来不用理解全部宇宙，先走一条短路径。',
        caption: firstPath ? `约 ${firstPath.estimatedMinutes ?? 8} 分钟` : '推荐先走',
        intent: '降低门槛',
      },
      {
        id: 'ask',
        href: '/ask',
        shortLabel: '灯塔',
        title: 'AI 灯塔',
        description: '低光只读导览：回答我在哪、能去哪、下一步看什么。',
        caption: '不读取私密层',
        intent: '请求指路',
      },
      {
        id: 'archive',
        href: '/archive',
        shortLabel: '检索',
        title: '档案馆',
        description: '直接查找已公开、可阅读、可返回的节点。',
        caption: `${publicNodeCount} 个公开节点`,
        intent: '现实检索',
      },
    ],
  }
}

export function buildDynamicWorldStatusSurface({
  areas,
  nodes,
  paths,
  events,
}: {
  areas: Area[]
  nodes: Node[]
  paths: Path[]
  events: WorldEvent[]
}): DynamicWorldStatusSurface {
  const publicAreas = areas.filter((area) => area.level === 1 && isPublicArea(area))
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicEvents = events.filter((event) => isEventPublic(event.visibility))

  return {
    eyebrow: '动态世界状态',
    title: '动态世界已经点亮，但仍只运行在公开层',
    description: '这里汇总当前可见的动态能力。状态面板只展示公开构建后的结果，不暴露私密节点、内部队列或旧阶段实验页。',
    runtimeLabel: '公开运行态',
    boundaryLabel: '服务端守门，前端只体现',
    capabilities: [
      {
        id: 'home-guide',
        title: '首页动态导览',
        status: 'active',
        statusLabel: '已开启',
        description: '首页小地图、短路径入口和动态世界总览已经接入公开 surface。',
        href: '/',
      },
      {
        id: 'atlas-live',
        title: '动态星图',
        status: 'active',
        statusLabel: '已开启',
        description: '世界地图展示公开区域、公开节点数量和可见星线。',
        href: '/atlas',
      },
      {
        id: 'timeline-river',
        title: '时间河',
        status: 'active',
        statusLabel: '已开启',
        description: '时间流展示近期公开事件，并只链接到公开节点。',
        href: '/timeline',
      },
      {
        id: 'lighthouse',
        title: 'AI 灯塔',
        status: 'low-light',
        statusLabel: '低光只读',
        description: '灯塔只做公开导览和路径建议，不读取私密层，不写入世界。',
        href: '/ask',
      },
      {
        id: 'node-opening',
        title: '节点开场仪式',
        status: 'active',
        statusLabel: '已开启',
        description: '公开节点在正文前展示位置、生命阶段和阅读节奏。',
      },
      {
        id: 'external-release',
        title: '外部生产证据',
        status: 'blocked',
        statusLabel: '待补齐',
        description: '真实 Preview/Production URL、线上 smoke、HTTPS、人工签收仍需外部环境完成。',
      },
    ],
    metrics: [
      { label: '公开区域', value: publicAreas.length, note: '进入世界的主空间' },
      { label: '公开节点', value: publicNodes.length, note: '可被地图、档案和灯塔读取' },
      { label: '公开路径', value: paths.length, note: '降低探索门槛' },
      { label: '公开事件', value: publicEvents.length, note: '构成时间河水位' },
    ],
  }
}
