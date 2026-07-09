// 用途：公开层 surface 类型集合（从 public-world-surfaces 拆出）。
// 只包含结构描述，不引用运行时依赖，可被页面、组件与 builders 复用。

export type AtlasAreaSignal = {
  id: string
  href: string
  icon?: string
  title: string
  subtitle: string
  description: string
  publicNodeCount: number
  accessLabel: string
}

export type AtlasAreaLineSignal = {
  id: string
  fromId: string
  toId: string
  label: string
  type: string
}

export type AtlasConstellationSurface = {
  areas: AtlasAreaSignal[]
  links: AtlasAreaLineSignal[]
  guideTitle: string
  guideDescription: string
  actions: Array<{
    href: string
    label: string
    title: string
    description: string
    tone: 'primary' | 'quiet'
  }>
}

export type TimelineRiverSignal = {
  id: string
  date: string
  dateLabel: string
  title: string
  description: string
  actorLabel: string
  areaLabel: string
  href?: string
}

export type TimelineRiverSurface = {
  items: TimelineRiverSignal[]
  totalCount: number
}

export type LighthouseQuestionSignal = {
  title: string
  answer: string
}

export type LighthousePathSignal = {
  id: string
  href: string
  title: string
  description: string
  caption: string
}

export type LighthouseNodeSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
}

export type LighthouseConsoleSurface = {
  boundaryNotice: string
  fallbackActions: Array<{
    href: string
    label: string
    description: string
  }>
  questions: LighthouseQuestionSignal[]
  paths: LighthousePathSignal[]
  nodes: LighthouseNodeSignal[]
}

export type NodeOpeningSurface = {
  title: string
  description: string
  placeLabel: string
  boundaryLabel: string
  areaLabel: string
  lifeStageLabel: string
  lifeStatusLabel: string
  readingLabel: string
  signals: Array<{
    label: string
    value: string
    note: string
  }>
}

export type NodeNextStepSurface = {
  title: string
  description: string
  actions: Array<{
    href: string
    label: string
    description: string
    tone: 'primary' | 'quiet'
  }>
}
