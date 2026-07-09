// 用途：Archive 页 + Path 详情 + Paths 目录 三个 surface 构建器（从 public-world-surfaces 拆出）。
import type { Area, Node, Path } from '../types'
import { describePathAudience, formatPathAudience } from '../path-guidance'
import { isPublicVisible } from '../visibility'
import type {
  ArchiveDynamicNodeSignal,
  ArchiveDynamicSurface,
  PathJourneySurface,
  PathsDirectorySurface,
} from '../public-world-surfaces'

function isPublicArea(area: Area) {
  return isPublicVisible(area.defaultVisibility)
}

function nodeUpdatedAt(node: Node) {
  return new Date(node.updatedAt ?? node.createdAt).getTime()
}

function archiveNodeSignal(node: Node, areaById: Map<string, Area>): ArchiveDynamicNodeSignal {
  const area = areaById.get(node.areaId)

  return {
    id: node.id,
    href: `/node/${node.slug}`,
    title: node.worldTitle ?? node.title,
    summary: node.summary,
    caption: `${area && isPublicArea(area) ? area.worldName : '公开节点'} · ${node.type}`,
  }
}

function buildStepReason(index: number, total: number, node: Node, area?: Area) {
  const areaLabel = area && isPublicArea(area) ? area.worldName : '公开区域'
  if (index === 0) return `先用「${node.worldTitle ?? node.title}」建立入口和坐标，知道自己为什么来到 ${areaLabel}。`
  if (index === total - 1) return `最后用这一步收束前面的线索，带着问题回到地图、档案馆或下一条路径。`
  if (node.lifeStage === 'fruit' || node.featured?.pathCore) return `这是路径里的核心节点，用来把前后两段内容连接成可理解的主线。`
  if (node.lifeStage === 'bloom') return `这一节点已经进入可公开阅读状态，适合在这里补足背景和判断。`
  return `这一节点把路径推进到 ${areaLabel}，让旅程不只停留在单个主题。`
}

export function buildArchiveDynamicSurface(nodes: Node[], areas: Area[], tagLimit = 10): ArchiveDynamicSurface {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const publicAreas = areas.filter((area) => area.level === 1 && isPublicArea(area))
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const tagCounts = new Map<string, number>()

  publicNodes.forEach((node) => {
    node.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1))
  })

  const tags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, tagLimit)
    .map(([tag, count]) => ({ tag, count }))

  return {
    eyebrow: '动态档案馆',
    title: '不想漫游时，直接检索公开世界',
    description: '档案馆把公开节点整理成可搜索、可筛选、可返回的现实入口。这里不展示私密层，也不把内部草稿带进公开索引。',
    boundaryLabel: '只读公开索引 · 不含私密层',
    searchPlaceholder: '搜索标题、摘要、标签或世界名',
    rediscoveryActions: [
      {
        href: '/paths',
        label: '按路径重新发现',
        description: '不确定关键词时，用精选路线继续走。',
      },
      {
        href: '/atlas',
        label: '回地图换区域',
        description: '从空间结构重新选择一片星域。',
      },
      {
        href: '/ask',
        label: '让灯塔推荐',
        description: '只基于公开内容给出下一步建议。',
      },
    ],
    featuredNodes: publicNodes
      .filter((node) => node.featured?.representative || node.featured?.home)
      .slice(0, 3)
      .map((node) => archiveNodeSignal(node, areaById)),
    recentNodes: [...publicNodes]
      .sort((a, b) => nodeUpdatedAt(b) - nodeUpdatedAt(a))
      .slice(0, 4)
      .map((node) => archiveNodeSignal(node, areaById)),
    tags,
    metrics: [
      { label: '公开节点', value: publicNodes.length, note: '可被检索和进入' },
      { label: '主区域', value: publicAreas.length, note: '用于空间筛选' },
      { label: '热门标签', value: tags.length, note: '用于快速缩小范围' },
      { label: '代表节点', value: publicNodes.filter((node) => node.featured?.representative).length, note: '适合第一次阅读' },
    ],
  }
}

export function buildPathJourneySurface(path: Path, nodes: Node[], nextPaths: Path[], areas: Area[]): PathJourneySurface {
  const areaById = new Map(areas.map((area) => [area.id, area]))
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const estimatedMinutes = path.estimatedMinutes ?? Math.max(8, publicNodes.length * 4)
  const areaCount = new Set(publicNodes.map((node) => node.areaId)).size
  const lifeStageCount = new Set(publicNodes.map((node) => node.lifeStage)).size
  const completionHint = nextPaths[0]
    ? `读完后建议继续「${nextPaths[0].title}」，也可以随时回到地图重新选择区域。`
    : '读完后可以回到地图重新选择区域，或进入档案馆按关键词继续检索。'

  return {
    eyebrow: '动态路径',
    title: '这条路径是一段可完成的旅程',
    description: '先按顺序走完公开节点，再决定要不要回到地图、进入档案馆，或继续下一条路径。路径只组织公开内容，不把私密层带进前台。',
    boundaryLabel: '只含公开节点 · 可随时返回',
    estimatedLabel: `约 ${estimatedMinutes} 分钟`,
    audienceLabel: formatPathAudience(path.audience),
    promise: `${path.title} 会帮你从「${publicNodes[0]?.worldTitle ?? publicNodes[0]?.title ?? '公开入口'}」进入，沿 ${publicNodes.length} 个公开节点形成一次完整抵达。`,
    rhythmLabel: `${publicNodes.length} 步 · ${areaCount} 个公开区域 · 约 ${estimatedMinutes} 分钟`,
    completionHint,
    steps: publicNodes.map((node, index) => {
      const area = areaById.get(node.areaId)

      return {
        id: node.id,
        href: `/node/${node.slug}`,
        title: node.worldTitle ?? node.title,
        summary: node.summary,
        caption: `${area && isPublicArea(area) ? area.worldName : '公开节点'} · ${node.type}`,
        orderLabel: `第 ${index + 1} 步`,
        progressLabel: `${index + 1}/${publicNodes.length}`,
        whyThisStep: buildStepReason(index, publicNodes.length, node, area),
      }
    }),
    nextPaths: nextPaths.map((item) => ({
      id: item.id,
      href: `/paths/${item.id}`,
      title: item.title,
      description: item.description,
    })),
    exitActions: [
      {
        href: '/atlas',
        label: '回到地图',
        description: '重新选择公开星域',
        tone: 'primary',
      },
      {
        href: '/archive',
        label: '进入档案馆',
        description: '按关键词继续检索',
        tone: 'quiet',
      },
      nextPaths[0]
        ? {
            href: `/paths/${nextPaths[0].id}`,
            label: '下一条路径',
            description: nextPaths[0].title,
            tone: 'quiet',
          }
        : {
            href: '/paths',
            label: '查看全部路径',
            description: '重新按兴趣选择路线',
            tone: 'quiet',
          },
    ],
    qualitySignals: [
      { label: '旅程步数', value: publicNodes.length, note: '公开节点按顺序组织' },
      { label: '区域覆盖', value: areaCount, note: '帮助访问者跨区域理解世界' },
      { label: '生命阶段', value: lifeStageCount, note: '能看到节点从生长到沉淀的状态' },
      { label: '出口保障', value: nextPaths.length > 0 ? '下一条路径' : '地图 / 档案馆', note: '读完之后仍有清晰去处' },
    ],
    metrics: [
      { label: '公开节点', value: publicNodes.length, note: '按顺序阅读' },
      { label: '预计时间', value: estimatedMinutes, note: '分钟左右' },
      { label: '适合人群', value: formatPathAudience(path.audience), note: '用于选择路径' },
      { label: '后续路径', value: nextPaths.length, note: '看完之后继续' },
    ],
  }
}

export function buildPathsDirectorySurface(paths: Path[], nodes: Node[]): PathsDirectorySurface {
  const publicNodes = nodes.filter((node) => isPublicVisible(node.visibility))
  const nodeMap = new Map(publicNodes.map((n) => [n.slug, n]))

  const audiences = Array.from(new Set(paths.map((p) => p.audience)))
  const audienceStats = audiences.map(audience => ({
    audience,
    label: formatPathAudience(audience),
    description: describePathAudience(audience),
    count: paths.filter(p => p.audience === audience).length
  }))

  return {
    eyebrow: '精选路径',
    title: '精选路径',
    description: '路径不是分类，而是为不同旅人准备的行走路线。它把星体排成可以理解、可以继续走下去的顺序。',
    metrics: [
      { label: '入口', value: '先走一条路', note: '第一次进入不需要理解全部宇宙，先沿一条公开路径走完即可。' },
      { label: '边界', value: '只含公开节点', note: '路径只读取已审查的公开内容，不把私密层、家庭层或保险箱内容带到前台。' },
      { label: '回路', value: '看完仍能继续', note: '每条路径都能回到地图、进入档案馆，或继续沿相关路径探索。' },
    ],
    audiences: audienceStats,
    paths: paths.map(path => {
      const pathNodes = path.nodeSlugs.map((slug) => nodeMap.get(slug)).filter((node): node is Node => Boolean(node))
      const entryNode = pathNodes[0]
      return {
        id: path.id,
        href: `/paths/${path.id}`,
        title: path.title,
        description: path.description,
        audience: path.audience,
        audienceLabel: formatPathAudience(path.audience),
        estimatedMinutes: path.estimatedMinutes ?? 8,
        nodeCount: pathNodes.length,
        entryNodeTitle: entryNode ? (entryNode.worldTitle ?? entryNode.title) : undefined
      }
    })
  }
}
