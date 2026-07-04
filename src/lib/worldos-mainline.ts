export const WORLDOS_MAINLINE_ROUTES = [
  '/',
  '/atlas',
  '/timeline',
  '/archive',
  '/paths',
  '/ask',
  '/about',
  '/manifesto',
  '/status',
  '/node/[slug]',
  '/paths/[id]',
] as const

export const WORLDOS_MAINLINE_APP_FILES = [
  'src/app/page.tsx',
  'src/app/atlas/page.tsx',
  'src/app/timeline/page.tsx',
  'src/app/archive/page.tsx',
  'src/app/paths/page.tsx',
  'src/app/paths/[id]/page.tsx',
  'src/app/ask/page.tsx',
  'src/app/about/page.tsx',
  'src/app/manifesto/page.tsx',
  'src/app/status/page.tsx',
  'src/app/node/[slug]/page.tsx',
] as const

export const WORLDOS_FORBIDDEN_MAINLINE_IMPORT_PREFIXES = [
  '@/components/r8-',
  '@/features/r8-',
  '@/components/private',
  '@/features/private',
  '@/components/v',
  '@/features/v',
] as const

export const WORLDOS_SCRIPT_ENTRYPOINTS = {
  mainline: 'check:mainline',
  content: 'check:content',
  publicExperience: 'check:experience:public',
  releaseCandidate: 'check:release:rc',
  legacyBoundary: 'check:legacy-boundary',
  apiBoundary: 'check:api-boundary',
  scriptsGovernance: 'check:scripts',
} as const

export const WORLDOS_RC3_QUALITY_TARGETS = {
  publicNodes: 50,
  contentBackedPublicNodes: 50,
  publicPaths: 12,
  relations: 80,
  worldEvents: 20,
  representedAreas: 8,
  featuredNodes: 14,
} as const
