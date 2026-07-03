import fs from 'node:fs'
import path from 'node:path'

type PackageJson = {
  scripts?: Record<string, string>
}

type FindingLevel = 'info' | 'warning' | 'error'

type Finding = {
  level: FindingLevel
  message: string
}

const root = process.cwd()

const requiredFiles = [
  'src/lib/types.ts',
  'src/lib/nodes.ts',
  'src/lib/paths.ts',
  'src/lib/visibility.ts',
  'data/domains/experience/nodes.json',
  'data/domains/experience/paths.json',
  'docs/03-engineering-architecture/world-kernel-consolidation.md',
  'data/world-kernel/consolidation-boundary.json',
]

const requiredTypeExports = [
  'Visibility',
  'LifeStage',
  'Node',
  'Area',
  'Relation',
  'Path',
  'WorldEvent',
  'WorldState',
]

const factualCoreTypes = ['Node', 'Area', 'Relation', 'Path', 'WorldEvent', 'WorldState']

function readText(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(root, relativePath))
}

function walkFiles(directory: string): string[] {
  const absolute = path.join(root, directory)
  if (!fs.existsSync(absolute)) return []

  const entries = fs.readdirSync(absolute, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const relative = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkFiles(relative))
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(relative)
    }
  }

  return files
}

function countLiteral(text: string, literal: string): number {
  return text.split(literal).length - 1
}

function pushFinding(findings: Finding[], level: FindingLevel, message: string) {
  findings.push({ level, message })
}

function main() {
  const findings: Finding[] = []

  for (const file of requiredFiles) {
    if (!exists(file)) pushFinding(findings, 'error', `Missing required kernel file: ${file}`)
  }

  if (!exists('src/lib/types.ts')) {
    throw new Error('World kernel consolidation check failed: src/lib/types.ts is missing')
  }

  const typesText = readText('src/lib/types.ts')

  for (const typeName of requiredTypeExports) {
    if (!typesText.includes(`export type ${typeName}`)) {
      pushFinding(findings, 'error', `src/lib/types.ts must export ${typeName}`)
    }
  }

  const srcFiles = walkFiles('src')
  for (const typeName of factualCoreTypes) {
    const definingFiles = srcFiles.filter((file) => readText(file).includes(`export type ${typeName}`))
    if (definingFiles.length !== 1 || definingFiles[0] !== 'src/lib/types.ts') {
      pushFinding(
        findings,
        'error',
        `${typeName} must have exactly one factual definition in src/lib/types.ts. Found: ${definingFiles.join(', ') || 'none'}`,
      )
    }
  }

  const visibilityText = exists('src/lib/visibility.ts') ? readText('src/lib/visibility.ts') : ''
  for (const sensitiveVisibility of ['private', 'family', 'partner', 'vault', 'sealed', 'silent']) {
    if (!visibilityText.includes(sensitiveVisibility)) {
      pushFinding(findings, 'error', `visibility gate must explicitly exclude ${sensitiveVisibility}`)
    }
  }

  const packageJson = JSON.parse(readText('package.json')) as PackageJson
  const worldCoreScript = packageJson.scripts?.['check:world-core'] ?? ''
  const worldCoreStepCount = countLiteral(worldCoreScript, 'npm run')

  if (worldCoreStepCount > 80) {
    pushFinding(
      findings,
      'warning',
      `check:world-core currently chains ${worldCoreStepCount} npm scripts. Split it into core / release / legacy gates before treating it as a production signal.`,
    )
  }

  const expansionScriptNames = Object.keys(packageJson.scripts ?? {}).filter((scriptName) => {
    return /^check:(v\d+|r\d+|phase-)/.test(scriptName)
  })

  if (expansionScriptNames.length > 120) {
    pushFinding(
      findings,
      'warning',
      `Detected ${expansionScriptNames.length} version/phase check scripts. Prefer consolidation work over new version-line expansion.`,
    )
  }

  const boundaryText = readText('data/world-kernel/consolidation-boundary.json')
  const requiredBoundaryPhrases = [
    'artifact verification',
    'clean next build exit',
    'preview URL smoke test',
    'Do not add V11, R9',
  ]

  for (const phrase of requiredBoundaryPhrases) {
    if (!boundaryText.includes(phrase)) {
      pushFinding(findings, 'error', `consolidation boundary must mention: ${phrase}`)
    }
  }

  const errors = findings.filter((finding) => finding.level === 'error')
  const warnings = findings.filter((finding) => finding.level === 'warning')

  for (const finding of findings) {
    console.log(`[${finding.level}] ${finding.message}`)
  }

  if (errors.length > 0) {
    throw new Error(`World kernel consolidation check failed with ${errors.length} error(s).`)
  }

  console.log(
    `World kernel consolidation check passed. ${requiredTypeExports.length} core exports, ${warnings.length} warning(s).`,
  )
}

main()
