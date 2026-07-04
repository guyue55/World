import matrix from '../data/v3-concept/02-page-module-matrix.json'

const errors: string[] = []
const requiredRoutes = [
  '/v3-universe',
  '/v3-memory-graph',
  '/v3-spaces',
  '/v3-ai-companion',
  '/v3-life-archive',
  '/v3-legacy',
  '/v3-exhibitions',
  '/v3-worldbook',
  '/v3-governance',
  '/pre-v4-gate',
]

for (const route of requiredRoutes) {
  if (!matrix.routes.some((item) => item.path === route)) {
    errors.push(`missing route ${route}`)
  }
}

if (!matrix.moduleBoundaries.includes('v3 universe UI cannot import vault raw data')) {
  errors.push('vault raw data boundary missing')
}
if (!matrix.moduleBoundaries.includes('AI companion only consumes approved context')) {
  errors.push('AI approved context boundary missing')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 02 check passed.')
