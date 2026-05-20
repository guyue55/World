import fs from 'node:fs'
import path from 'node:path'
import phaseFourContentSeeds from '../data/phase-four-content-seeds.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseFourContentSeeds.items.length < 5) {
    errors.push('content seeds too few')
  }

  if (phaseFourContentSeeds.items.some((seed) => seed.visibility !== 'public')) {
    errors.push('all phase four content seeds must be public')
  }

  for (const seed of phaseFourContentSeeds.items) {
    if (seed.targetSurface.length < 1) errors.push(`seed missing targetSurface: ${seed.id}`)
    if (!seed.nextAction) errors.push(`seed missing nextAction: ${seed.id}`)
  }

  ;[
    'src/app/phase-four/page.tsx',
    'src/lib/phase-four-content.ts',
    'src/components/phase-four/PhaseFourHero.tsx',
    'src/components/phase-four/ContentSeedGrid.tsx',
    'src/components/phase-four/ContentCadencePanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing phase four content file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-four-content']) errors.push('package missing check:phase-four-content')
  if (!pkg.scripts['phase-four-content:print']) errors.push('package missing phase-four-content:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase four content check passed.')
}

main()
