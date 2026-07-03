import fs from 'node:fs'
import path from 'node:path'

type FindingLevel = 'error' | 'warning' | 'info'

type Finding = {
  level: FindingLevel
  message: string
}

const root = process.cwd()
const findings: Finding[] = []

function read(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(root, relativePath))
}

function add(level: FindingLevel, message: string) {
  findings.push({ level, message })
}

function assertFile(relativePath: string) {
  if (!exists(relativePath)) add('error', `缺少必要文件：${relativePath}`)
}

function count(text: string, needle: string): number {
  return text.split(needle).length - 1
}

const requiredFiles = [
  'src/lib/types.ts',
  'src/lib/visibility.ts',
  'src/components/world/WorldShell.tsx',
  'src/components/world/WorldRuntimeStack.tsx',
  'docs/03-engineering-architecture/world-kernel-mainline-audit.md',
  'data/world-kernel/mainline-boundary.json',
]

for (const file of requiredFiles) assertFile(file)

if (exists('src/lib/types.ts')) {
  const types = read('src/lib/types.ts')
  const exports = ['Visibility', 'LifeStage', 'Node', 'Area', 'Relation', 'Path', 'WorldEvent', 'WorldState']

  for (const name of exports) {
    if (!types.includes(`export type ${name}`)) {
      add('error', `src/lib/types.ts 必须继续导出核心类型：${name}`)
    }
  }
}

if (exists('src/lib/visibility.ts')) {
  const visibility = read('src/lib/visibility.ts')
  const forbiddenPublic = ['private', 'family', 'partner', 'vault', 'sealed', 'silent']

  for (const name of forbiddenPublic) {
    if (!visibility.includes(name)) {
      add('error', `权限守门必须明确排除：${name}`)
    }
  }

  if (!visibility.includes('mustExcludeFromPublicBuild')) {
    add('error', '权限守门必须保留 mustExcludeFromPublicBuild')
  }
}

if (exists('src/components/world/WorldShell.tsx')) {
  const shell = read('src/components/world/WorldShell.tsx')
  const shellImportCount = count(shell, "import ")

  if (!shell.includes('WorldRuntimeStack')) {
    add('error', 'WorldShell 必须通过 WorldRuntimeStack 装配表现层投影')
  }

  if (shellImportCount > 6) {
    add('warning', `WorldShell 当前 import 数为 ${shellImportCount}，建议继续降低 shell 耦合`)
  }

  const forbiddenProjectionImports = [
    'r8-deep-dynamic-world',
    'r8-full-dynamic-world',
    'r8-living-universe',
    'r8-complete-universe',
    'r8-sensory-universe',
    'r8-interactive-universe',
    'r8-scene-universe',
    'r8-civilization-universe',
  ]

  for (const importPath of forbiddenProjectionImports) {
    if (shell.includes(importPath)) {
      add('error', `WorldShell 不应直接依赖表现投影层：${importPath}`)
    }
  }
}

if (exists('src/components/world/WorldRuntimeStack.tsx')) {
  const stack = read('src/components/world/WorldRuntimeStack.tsx')
  const requiredRuntimeGroups = [
    'WorldMotionLayer',
    'UniverseStage',
    'FullUniverseOrchestrator',
    'LivingUniverseField',
    'CompleteUniverseEngine',
    'SensoryUniverseEngine',
    'InteractiveUniverseEngine',
    'SceneUniverseEngine',
    'CivilizationUniverseEngine',
  ]

  for (const name of requiredRuntimeGroups) {
    if (!stack.includes(name)) {
      add('warning', `WorldRuntimeStack 未检测到既有投影层：${name}`)
    }
  }

  if (!stack.includes('不能在这里重新定义 Node / Area / Relation / WorldState')) {
    add('warning', 'WorldRuntimeStack 建议保留事实模型边界注释')
  }
}

if (exists('data/world-kernel/mainline-boundary.json')) {
  const boundary = read('data/world-kernel/mainline-boundary.json')
  const requiredPhrases = [
    'zh-CN-first',
    'artifact verification',
    'clean next build exit',
    '后端与数据层控制权限',
    '不再新增 V11 / R9 / R8.10',
  ]

  for (const phrase of requiredPhrases) {
    if (!boundary.includes(phrase)) {
      add('error', `mainline-boundary.json 必须包含边界声明：${phrase}`)
    }
  }
}

if (exists('package.json')) {
  const packageJson = JSON.parse(read('package.json')) as { scripts?: Record<string, string> }
  const scripts = packageJson.scripts ?? {}
  const worldCore = scripts['check:world-core'] ?? ''
  const chainedRuns = count(worldCore, 'npm run')

  if (chainedRuns > 80) {
    add('warning', `check:world-core 串联 ${chainedRuns} 个 npm run，建议拆分为 check:core / check:release / check:legacy`)
  }

  const versionLineChecks = Object.keys(scripts).filter((name) => /^check:(v\d+|r\d+|phase-)/.test(name))
  if (versionLineChecks.length > 120) {
    add('warning', `检测到 ${versionLineChecks.length} 个版本/阶段检查脚本，后续应优先收敛而非扩张`)
  }
}

for (const finding of findings) {
  console.log(`[${finding.level}] ${finding.message}`)
}

const errors = findings.filter((finding) => finding.level === 'error')
if (errors.length > 0) {
  throw new Error(`World Kernel mainline check failed: ${errors.length} error(s).`)
}

console.log('World Kernel mainline check passed.')
