// 公开层 surface 门面模块：仅做类型与构建器的重导出，具体实现分布在 public-surfaces/*.
// 页面与组件继续使用 `@/lib/public-world-surfaces` 作为唯一进入点，避免深度耦合子模块。

export type * from './public-surfaces/types'
import type {
  AboutDynamicSurface,
  ManifestoDynamicSurface,
} from './public-surfaces/types'

// Atlas + Timeline + Lighthouse + Node 探索类 surface：具体实现拆至 public-surfaces/exploration.ts。
export {
  buildAtlasConstellationSurface,
  buildTimelineRiverSurface,
  buildLighthouseConsoleSurface,
  buildNodeOpeningSurface,
  buildNodeNextStepSurface,
} from './public-surfaces/exploration'

// 主页 + 状态页动态世界 surface：具体实现拆至 public-surfaces/home-and-status.ts，此处仅重导出以保持公开 API 稳定。
export { buildHomeDynamicWorldSurface, buildDynamicWorldStatusSurface } from './public-surfaces/home-and-status'

// Archive + Path 详情 + Paths 目录 surface：具体实现拆至 public-surfaces/archive-and-paths.ts。
export {
  buildArchiveDynamicSurface,
  buildPathJourneySurface,
  buildPathsDirectorySurface,
} from './public-surfaces/archive-and-paths'

export function buildAboutDynamicSurface(): AboutDynamicSurface {
  return {
    eyebrow: '关于古月浮屿',
    title: '造物主不是简历，而是世界的原点。',
    description: '古月浮屿是一座持续生长的个人数字世界。它对外是可探索的公开前厅，对内是创世台，对未来是档案，对 AI 是可读、可审计、可边界化协作的世界协议。',
    identityCards: [
      {
        title: '这里不是简历页',
        body: '它解释古月浮屿为什么存在：把技术、产品、灵感、生活与记忆安放到一个可长期维护的个人数字世界。',
      },
      {
        title: 'AI 是灯塔，不是太阳',
        body: 'AI 可以导览、整理和提出建议，但不替造物主决定公开、删除、权限或意义。',
      },
      {
        title: '公开层不是完整世界',
        body: '访客看到的是精选世界。私密、家庭、保险箱和沉默内容不会进入公开索引。',
      },
    ],
    actions: [
      { href: '/atlas', label: '进入地图', style: 'primary' },
      { href: '/paths', label: '查看路径', style: 'secondary' },
      { href: '/manifesto', label: '阅读宪章', style: 'tertiary' },
    ]
  }
}

export function buildManifestoDynamicSurface(): ManifestoDynamicSurface {
  return {
    eyebrow: '世界宣言',
    title: '世界宣言',
    description: '古月浮屿不是公共多人 3D 元宇宙，也不是虚拟经济空间。它是一个以内容为节点、以时间为河流、以权限为边界、以 AI 为灯塔的个人数字世界。',
    rules: [
      {
        title: 'AI 是灯塔，不是太阳',
        description: 'AI 只照亮路径、整理线索、提出建议；不自动发布、不删除、不越权读取私密内容。',
      },
      {
        title: '公开层不是完整世界',
        description: '访客看到的是精选前厅。私密、家庭、保险箱和沉默内容不会进入公开索引。',
      },
      {
        title: '入口清澈，深处浩瀚',
        description: '首页只给少数清晰路径，复杂性放在可探索的深处，而不是压到第一屏。',
      },
      {
        title: '前台浪漫，后台清醒，档案可靠',
        description: '世界语言负责体验，现实解释负责理解，稳定数据协议负责长期保存和迁移。',
      },
      {
        title: '世界为生活服务',
        description: '它允许低光、静默、修复和复活，不用更新压力反过来支配生活。',
      },
    ],
    summaryLabel: '一句话',
    summaryQuote: '以内容为星体，以区域为空间，以关系为星线，以时间为河流，以权限为边界，以规则为自然法则。',
    actions: [
      { href: '/about', label: '了解古月', style: 'primary' },
      { href: '/paths', label: '沿路径进入', style: 'secondary' },
      { href: '/ask', label: '点亮灯塔', style: 'tertiary' },
    ]
  }
}
