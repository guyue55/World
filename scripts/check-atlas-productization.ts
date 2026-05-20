import fs from 'node:fs'
import path from 'node:path'
import areas from '../data/areas.json'
import nodes from '../data/nodes.json'
import areaLinks from '../data/area-links.json'
import atlasQualityGate from '../data/atlas-quality-gate.json'
import atlasProductizationContract from '../data/atlas-productization-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const publicNodes = nodes.filter((node) => node.visibility === 'public' || node.visibility === 'semiPublic')
  const publicAreas = areas.filter((area) => area.defaultVisibility === 'public')
  const areaIds = new Set(areas.map((area) => area.id))

  const checks = {
    areas: areas.length,
    publicAreas: publicAreas.length,
    areasWithNodeStats: areas.length,
    areaLinks: areaLinks.links.length,
    publicNodesInAtlas: publicNodes.length,
    requiredComponents: atlasQualityGate.requiredComponents.length,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = atlasQualityGate.minimums[key as keyof typeof atlasQualityGate.minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  areaLinks.links.forEach((link) => {
    if (!areaIds.has(link.from)) errors.push(`area link from missing area: ${link.id}`)
    if (!areaIds.has(link.to)) errors.push(`area link to missing area: ${link.id}`)
  })

  atlasQualityGate.requiredComponents.forEach((component) => {
    const files = [
      `src/components/atlas/${component}.tsx`,
      `src/components/world/${component}.tsx`,
    ]

    if (!files.some((file) => fs.existsSync(path.join(process.cwd(), file)))) {
      errors.push(`missing atlas component: ${component}`)
    }
  })

  const page = read('src/app/atlas/page.tsx')
  ;['AtlasHero', 'AtlasStats', 'AtlasMap', 'AtlasStarLines', 'AtlasFallbackList'].forEach((token) => {
    if (!page.includes(token)) errors.push(`atlas page missing ${token}`)
  })

  if (atlasProductizationContract.pageParts.length < 6) errors.push('atlas productization contract too small')
  if (page.includes('WorldFoundationStack')) errors.push('atlas page must not load WorldFoundationStack')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Atlas productization check passed.')
}

main()
