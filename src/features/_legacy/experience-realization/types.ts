export type ExperienceRealmKind =
  | 'world-gateway'
  | 'cosmic-map'
  | 'node-constellation'
  | 'time-river'
  | 'ai-lighthouse'
  | 'world-network'
  | 'memory-graph'
  | 'theme-system'

export type ExperienceNode = {
  id: string
  title: string
  eyebrow: string
  description: string
  href: string
  kind: ExperienceRealmKind
  signal: string
  status: 'ready' | 'guided' | 'sealed'
}

export type ExperienceThemeMode = 'nature' | 'cosmos' | 'library' | 'atelier'
