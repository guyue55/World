import fs from 'node:fs'
import {
  getContentProductizationBaseline,
  getProjectionDensityStrategy,
  getSeedContentQualityGate,
  validateContentProductization,
} from '../src/lib/content-productization'

function main() {
  const issues = validateContentProductization()
  const errors = issues.filter((issue) => issue.severity === 'error').map((issue) => `${issue.id}: ${issue.message}`)
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => `${issue.id}: ${issue.message}`)

  const homeSections = new Set(getContentProductizationBaseline().homeSections.map((item) => item.id))
  ;['world-entrance', 'representative-nodes', 'active-paths', 'world-rhythm', 'low-light-ai'].forEach((id) => {
    if (!homeSections.has(id)) errors.push(`missing home section baseline: ${id}`)
  })

  const densityRoutes = new Set(getProjectionDensityStrategy().routes.map((item) => item.route))
  ;['/', '/archive', '/atlas', '/node/[slug]', '/paths'].forEach((route) => {
    if (!densityRoutes.has(route)) errors.push(`missing projection density route: ${route}`)
  })

  const qualityTargets = getSeedContentQualityGate().minimumTargets
  if (!qualityTargets.some((item) => item.type === 'path')) {
    warnings.push('seed content quality gate missing path target')
  }

  const source = fs.readFileSync('src/lib/content-productization.ts', 'utf-8')
  ;[
    'featured-node-incomplete',
    'path-core-node-incomplete',
    'public-path-incomplete',
    'public-event-links-private-node',
  ].forEach((token) => {
    if (!source.includes(token)) errors.push(`content productization validator missing lifecycle rule: ${token}`)
  })

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  console.log(`Content productization check passed. warnings=${warnings.length}`)
}

main()
