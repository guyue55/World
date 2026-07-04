import fs from 'node:fs'

const required = [
  'docs/10-development-history/round-01/final-baseline.md',
  'docs/10-development-history/round-02/README.md',
  'docs/10-development-history/round-02/stage-01-visual-foundation/README.md',
  'data/round-01/final-baseline.json',
  'data/round-02/round-02-plan.json',
  'data/round-02/stage-01/00-stage-plan.json',
  'scripts/check-round2-00.ts',
  'scripts/check-round2-stage-01.ts',
  'scripts/check-round2-all.ts',
]

const requiredDirs = [
  'src/features/visual-foundation',
  'src/components/visual',
  'src/features/world-map-experience',
  'src/components/world-map',
  'src/features/content-constellation',
  'src/components/constellation',
  'src/features/time-river',
  'src/components/time-river',
  'src/features/memory-graph',
  'src/components/memory-graph',
  'src/features/ai-lighthouse-workbench',
  'src/components/lighthouse',
  'src/features/theme-system',
  'src/components/theme',
]

const errors: string[] = []

for (const item of required) {
  if (!fs.existsSync(item)) errors.push(`missing ${item}`)
}

for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) errors.push(`missing ${dir}`)
}

const baseline = JSON.parse(fs.readFileSync('data/round-01/final-baseline.json', 'utf8'))
if (baseline.status !== 'frozen') errors.push('round 01 baseline must be frozen')
if (baseline.productionLive !== false) errors.push('round 01 baseline must not claim productionLive')

const round2 = JSON.parse(fs.readFileSync('data/round-02/round-02-plan.json', 'utf8'))
if (round2.status !== 'planned') errors.push('round 02 status must be planned at batch 00')
if (round2.totalStages !== 6) errors.push('round 02 totalStages must be 6')
if (round2.totalBatches !== 24) errors.push('round 02 totalBatches must be 24')
if (round2.productionLive !== false) errors.push('round 02 plan must not claim productionLive')

const stage01 = JSON.parse(fs.readFileSync('data/round-02/stage-01/00-stage-plan.json', 'utf8'))
if (stage01.stage !== 1) errors.push('stage 01 plan must be stage 1')
if (!Array.isArray(stage01.batches) || stage01.batches.length !== 4) {
  errors.push('stage 01 must define 4 planned batches')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('Round 02 batch 00 checks passed.')
