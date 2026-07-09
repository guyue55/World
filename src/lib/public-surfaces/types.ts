// 用途：公开层 surface 类型集合（从 public-world-surfaces 拆出）。
// 只包含结构描述，不引用运行时依赖，可被页面、组件与 builders 复用。
// 探索类（atlas/timeline/lighthouse/node）类型另见 ./types-exploration。
export type * from './types-exploration'

export type DynamicWorldRouteSignal = {
  id: 'home' | 'path' | 'atlas' | 'timeline' | 'ask' | 'archive'
  href: string
  shortLabel: string
  title: string
  description: string
  caption: string
  intent: string
}

export type HomeEntrySignal = {
  id: 'path' | 'atlas' | 'archive' | 'ask'
  href: string
  label: string
  title: string
  description: string
  note: string
  tone: 'primary' | 'quiet'
}

export type HomeDynamicWorldSurface = {
  eyebrow: string
  title: string
  description: string
  entryTitle: string
  entryDescription: string
  entryPoints: HomeEntrySignal[]
  routes: DynamicWorldRouteSignal[]
  primaryHref: string
}

export type DynamicWorldCapabilitySignal = {
  id: string
  title: string
  status: 'active' | 'low-light' | 'guarded' | 'blocked'
  statusLabel: string
  description: string
  href?: string
}

export type DynamicWorldStatusSurface = {
  eyebrow: string
  title: string
  description: string
  runtimeLabel: string
  boundaryLabel: string
  capabilities: DynamicWorldCapabilitySignal[]
  metrics: Array<{
    label: string
    value: number
    note: string
  }>
}

export type ArchiveDynamicNodeSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
}

export type ArchiveDynamicTagSignal = {
  tag: string
  count: number
}

export type ArchiveDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  boundaryLabel: string
  searchPlaceholder: string
  rediscoveryActions: Array<{
    href: string
    label: string
    description: string
  }>
  featuredNodes: ArchiveDynamicNodeSignal[]
  recentNodes: ArchiveDynamicNodeSignal[]
  tags: ArchiveDynamicTagSignal[]
  metrics: Array<{
    label: string
    value: number
    note: string
  }>
}

export type PathsDirectoryAudienceSignal = {
  audience: string
  label: string
  description: string
  count: number
}

export type PathsDirectoryPathSignal = {
  id: string
  href: string
  title: string
  description: string
  audience: string
  audienceLabel: string
  estimatedMinutes: number
  nodeCount: number
  entryNodeTitle?: string
}

export type PathsDirectorySurface = {
  eyebrow: string
  title: string
  description: string
  metrics: Array<{
    label: string
    value: string
    note: string
  }>
  audiences: PathsDirectoryAudienceSignal[]
  paths: PathsDirectoryPathSignal[]
}

export type AboutIdentityCardSignal = {
  title: string
  body: string
}

export type AboutDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  identityCards: AboutIdentityCardSignal[]
  actions: Array<{
    href: string
    label: string
    style: 'primary' | 'secondary' | 'tertiary'
  }>
}

export type ManifestoRuleSignal = {
  title: string
  description: string
}

export type ManifestoDynamicSurface = {
  eyebrow: string
  title: string
  description: string
  rules: ManifestoRuleSignal[]
  summaryLabel: string
  summaryQuote: string
  actions: Array<{
    href: string
    label: string
    style: 'primary' | 'secondary' | 'tertiary'
  }>
}

export type PathJourneyStepSignal = {
  id: string
  href: string
  title: string
  summary?: string
  caption: string
  orderLabel: string
  progressLabel: string
  whyThisStep: string
}

export type PathJourneySurface = {
  eyebrow: string
  title: string
  description: string
  boundaryLabel: string
  estimatedLabel: string
  audienceLabel: string
  promise: string
  rhythmLabel: string
  completionHint: string
  steps: PathJourneyStepSignal[]
  nextPaths: Array<{
    id: string
    href: string
    title: string
    description: string
  }>
  exitActions: Array<{
    href: string
    label: string
    description: string
    tone: 'primary' | 'quiet'
  }>
  qualitySignals: Array<{
    label: string
    value: number | string
    note: string
  }>
  metrics: Array<{
    label: string
    value: number | string
    note: string
  }>
}
